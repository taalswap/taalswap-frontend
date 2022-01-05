import { parseInt } from 'lodash'
import { ChainId } from 'taalswap-sdk'

const getChainId = () => {
  const chainIdStr = window.localStorage.getItem("chainId")
  if (chainIdStr === 'null' || ChainId[chainIdStr] === undefined) {
      window.localStorage.setItem('chainId', process.env.REACT_APP_CHAIN_ID)
  }
  const chainId = (!chainIdStr || chainIdStr === 'undefined' || chainIdStr === 'NaN' || chainIdStr === 'null')
    ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
    : parseInt(chainIdStr, 10)
  return chainId
}

export default getChainId
