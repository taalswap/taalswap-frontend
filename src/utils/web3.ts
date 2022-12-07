import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { getSelectedNodeUrl } from 'utils/getRpcUrl'
import { ChainId } from "taalswap-sdk";
import getChainId from './getChainId'

// const RPC_URL = getRpcUrl()
const ETH_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_CHAIN_ID)
const KLAY_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_KLAYTN_ID)
const BNB_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_BINANCE_ID)
const MATIC_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_POLYGON_ID)

const ethHttpProvider = new Web3.providers.HttpProvider(ETH_RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const klayHttpProvider = new Web3.providers.HttpProvider(KLAY_RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const bnbHttpProvider = new Web3.providers.HttpProvider(BNB_RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const maticHttpProvider = new Web3.providers.HttpProvider(MATIC_RPC_URL, { timeout: 10000 } as HttpProviderOptions)

const web3ETHNoAccount = new Web3(ethHttpProvider)
const web3KLAYNoAccount = new Web3(klayHttpProvider)
const web3BNBNoAccount = new Web3(bnbHttpProvider)
const web3MATICNoAccount = new Web3(maticHttpProvider)

const getWeb3NoAccount = () => {
  if (getChainId() === ChainId.POLYGON || getChainId() === ChainId.MUMBAI)
    return web3MATICNoAccount
  if (getChainId() === ChainId.KLAYTN || getChainId() === ChainId.BAOBAB)
    return web3KLAYNoAccount
  if (getChainId() === ChainId.BSCMAIN || getChainId() === ChainId.BSCTEST)
    return web3BNBNoAccount
  return web3ETHNoAccount
}

export { getWeb3NoAccount }
export default web3ETHNoAccount
