import { ethers } from 'ethers'
import getRpcUrl, { getSelectedNodeUrl } from 'utils/getRpcUrl'
import { ChainId } from "taalswap-sdk";
import getChainId from './getChainId'

const RPC_URL = getRpcUrl()

export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)

const ETH_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_CHAIN_ID)
const KLAY_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_KLAYTN_ID)
const BNB_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_BINANCE_ID)
const MATIC_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_POLYGON_ID)

const ethHttpProvider = new ethers.providers.StaticJsonRpcProvider(ETH_RPC_URL)
const klayHttpProvider = new ethers.providers.StaticJsonRpcProvider(KLAY_RPC_URL)
const bnbHttpProvider = new ethers.providers.StaticJsonRpcProvider(BNB_RPC_URL)
const maticHttpProvider = new ethers.providers.StaticJsonRpcProvider(MATIC_RPC_URL)

export const getSimpleRpcProvider = () => {
  if ( getChainId() === ChainId.POLYGON || getChainId() === ChainId.MUMBAI ) return maticHttpProvider
  if ( getChainId() === ChainId.KLAYTN || getChainId() === ChainId.BAOBAB ) return klayHttpProvider
  if ( getChainId() === ChainId.BSCMAIN || getChainId() === ChainId.BSCTEST ) return bnbHttpProvider
  return ethHttpProvider
}

export default null
