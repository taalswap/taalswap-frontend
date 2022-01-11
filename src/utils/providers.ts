import { ethers } from 'ethers'
import getRpcUrl, { getSelectedNodeUrl } from 'utils/getRpcUrl'
import getChainId from './getChainId'

const RPC_URL = getRpcUrl()

export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)

const ETH_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_CHAIN_ID)
const KLAY_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_KLAYTN_ID)
const ethHttpProvider = new ethers.providers.StaticJsonRpcProvider(ETH_RPC_URL)
const klayHttpProvider = new ethers.providers.StaticJsonRpcProvider(KLAY_RPC_URL)

export const getSimpleRpcProvider = () => {
  if ( getChainId() > 1000 ) {
    return klayHttpProvider
  }
  return ethHttpProvider
}

export default null
