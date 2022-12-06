import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { ChainId } from 'taalswap-sdk';
import { ethers } from 'ethers';
import { useActiveWeb3React } from '../../hooks';
import useDebounce from '../../hooks/useDebounce';
import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import { updateBlockNumber } from './actions';
import {getWeb3NoAccount} from "../../utils/web3";

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React()
  // const crossChain = parseInt(window.localStorage.getItem('crossChain') ?? '', 10) as ChainId
  const ethChainId = process.env.REACT_APP_CHAIN_ID ?? '1';
  const klayChainId = process.env.REACT_APP_KLAYTN_ID ?? '8217';
  const bnbChainId = process.env.REACT_APP_BINANCE_ID ?? '56';
  const xSwapCurrency = window.localStorage.getItem('xSwapCurrency')
  const dispatch = useDispatch()

  const windowVisible = useIsWindowVisible()

  const [state, setState] = useState<{ chainId: number | undefined; blockNumber: number | null }>({
    chainId,
    blockNumber: null,
  })

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((s) => {
        if (chainId === s.chainId) {
          if (typeof s.blockNumber !== 'number') return { chainId, blockNumber }
          return { chainId, blockNumber: Math.max(blockNumber, s.blockNumber) }
        }
        return s
      })
    },
    [chainId, setState]
  )

  const blockNumberCallbackKlaytn = useCallback(
    (blockNumber: number) => {
      // let xChainId = ChainId.BAOBAB
      let xChainId = parseInt(klayChainId);
      // if (chainId === ChainId.BAOBAB) {
      if (chainId !== undefined && chainId.toString() === klayChainId) {
        xChainId = parseInt(ethChainId);
      }
      dispatch(updateBlockNumber({ chainId: xChainId, blockNumber }))
    },
    [dispatch, chainId, ethChainId, klayChainId]
  )

  const blockNumberCallbackBinance = useCallback(
      (blockNumber: number) => {
        // let xChainId = ChainId.BAOBAB
        let xChainId = parseInt(bnbChainId);
        // if (chainId === ChainId.BAOBAB) {
        if (chainId !== undefined && chainId.toString() === bnbChainId) {
          xChainId = parseInt(ethChainId);
        }
        dispatch(updateBlockNumber({ chainId: xChainId, blockNumber }))
      },
      [dispatch, chainId, ethChainId, bnbChainId]
  )

  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId || !windowVisible) return undefined

    setState({ chainId, blockNumber: null })

    const web3 = getWeb3NoAccount()
    web3.eth.getBlockNumber()
        .then(blockNumberCallback)
        .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error))

    // library
    //   .getBlockNumber()
    //   .then(blockNumberCallback)
    //   .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error))

    if (chainId > 1000) {
      let crossChainProvider
      if (ethChainId === '1') {
        crossChainProvider = new ethers.providers.InfuraProvider('mainnet', 'adb9c847d7114ee7bf83995e8f22e098')
      }
      if (ethChainId === '3') {
        crossChainProvider = new ethers.providers.InfuraProvider('ropsten', 'adb9c847d7114ee7bf83995e8f22e098')
      }
      crossChainProvider.getBlockNumber()
        .then(blockNumberCallback)
        .catch((error) => console.error(`Failed to get block number for chainId: ${ethChainId}`, error))
    } else if (chainId < 1000 && chainId > 55) {
      let crossChainProvider
      if (bnbChainId === '56') {
        // crossChainProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org');
        crossChainProvider = new ethers.providers.InfuraProvider('mainnet', 'adb9c847d7114ee7bf83995e8f22e098')
      }
      if (bnbChainId === '97') {
        // crossChainProvider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
        crossChainProvider = new ethers.providers.InfuraProvider('ropsten', 'adb9c847d7114ee7bf83995e8f22e098')
      }
      crossChainProvider.getBlockNumber()
          .then(blockNumberCallbackBinance)
          .catch((error) => console.error(`Failed to get block number for chainId: ${bnbChainId}`, error))
    } else {
      let crossChainProvider
      if (klayChainId === '8217') {
        crossChainProvider = new ethers.providers.JsonRpcProvider('https://public-en.kaikas.io/v1/cypress');
      }
      if (klayChainId === '1001') {
        crossChainProvider = new ethers.providers.JsonRpcProvider('https://api.baobab.klaytn.net:8651');
      }
      crossChainProvider.getBlockNumber()
        .then(blockNumberCallbackKlaytn)
        .catch((error) => console.error(`Failed to get block number for chainId: ${klayChainId}`, error))
    }

    library.on('block', blockNumberCallback)
    return () => {
      library.removeListener('block', blockNumberCallback)
    }
  }, [dispatch, chainId, library, blockNumberCallback, blockNumberCallbackKlaytn, blockNumberCallbackBinance, windowVisible, ethChainId, klayChainId, bnbChainId, xSwapCurrency])

  const debouncedState = useDebounce(state, 100)

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return
    dispatch(updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber }))
  }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId])

  return null
}
