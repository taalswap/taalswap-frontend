import { isUndefined, parseInt } from 'lodash'
import { BASE_BSC_SCAN_URL, SCAN_URL } from 'config'

const chainIdStr = window.localStorage.getItem("chainId")
const chainId = chainIdStr === 'undefined'
  ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
  : parseInt(chainIdStr, 10)

export const getBscScanAddressUrl = (address: string) => {
  // return `${BASE_BSC_SCAN_URL}/address/${address}`
  return `${SCAN_URL[chainId]}/address/${address}`
}

export const getBscScanTransactionUrl = (transactionHash: string) => {
  // return `${BASE_BSC_SCAN_URL}/tx/${transactionHash}`
  return `${SCAN_URL[chainId]}/tx/${transactionHash}`
}

export const getBscScanBlockNumberUrl = (block: string | number) => {
  // return `${BASE_BSC_SCAN_URL}/block/${block}`
  return `${SCAN_URL[chainId]}/block/${block}`
}

export const getBscScanBlockCountdownUrl = (block: string | number) => {
  // return `${BASE_BSC_SCAN_URL}/block/countdown/${block}`
  return `${SCAN_URL[chainId]}/block/countdown/${block}`
}
