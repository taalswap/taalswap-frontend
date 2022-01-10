import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { getSelectedNodeUrl } from 'utils/getRpcUrl'
import getChainId from './getChainId'

// const RPC_URL = getRpcUrl()
const ETH_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_CHAIN_ID)
const KLAY_RPC_URL = getSelectedNodeUrl(process.env.REACT_APP_KLAYTN_ID)

const ethHttpProvider = new Web3.providers.HttpProvider(ETH_RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const klayHttpProvider = new Web3.providers.HttpProvider(KLAY_RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const web3ETHNoAccount = new Web3(ethHttpProvider)
const web3klayNoAccount = new Web3(klayHttpProvider)

const getWeb3NoAccount = () => {
  if (getChainId() > 1000)
    return web3klayNoAccount

  return web3ETHNoAccount
}

export { getWeb3NoAccount }
export default web3ETHNoAccount
