import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import {
  farmsConfig,
  farmsConfigKlaytn,
  farmsConfigBinance,
  farmsConfigPolygon,
  farmsConfigAurora
} from 'config/constants'
import { ChainId } from "taalswap-sdk";
import useRefresh from './useRefresh'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account, chainId } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    let calls
    const fetchAllBalances = async () => {
      if (chainId === ChainId.POLYGON || chainId === ChainId.MUMBAI) {
        calls = farmsConfigPolygon.map((farm) => ({
          address: getMasterChefAddress(),
          name: 'pendingTaal',
          params: [farm.pid, account],
        }))
      } else if (chainId === ChainId.KLAYTN || chainId === ChainId.BAOBAB) {
        calls = farmsConfigKlaytn.map((farm) => ({
          address: getMasterChefAddress(),
          name: 'pendingTaal',
          params: [farm.pid, account],
        }))
      } else if (chainId === ChainId.BSCMAIN || chainId === ChainId.BSCTEST) {
        calls = farmsConfigBinance.map((farm) => ({
          address: getMasterChefAddress(),
          name: 'pendingTaal',
          params: [farm.pid, account],
        }))
      } else if (chainId === ChainId.AURORAMAIN || chainId === ChainId.AURORATEST) {
        calls = farmsConfigAurora.map((farm) => ({
          address: getMasterChefAddress(),
          name: 'pendingTaal',
          params: [farm.pid, account],
        }))
      } else {
        calls = farmsConfig.map((farm) => ({
          address: getMasterChefAddress(),
          name: 'pendingTaal',
          params: [farm.pid, account],
        }))
      }

      const res = await multicall(masterChefABI, calls)

      setBalance(res)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh, chainId])

  return balances
}

export default useAllEarnings
