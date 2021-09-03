import { parseInt } from 'lodash'

const getChainId = () => {
  const chainIdStr = window.localStorage.getItem("chainId")
  const chainId = (!chainIdStr || chainIdStr === 'undefined' || chainIdStr === 'NaN')
    ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
    : parseInt(chainIdStr, 10)
  return chainId
}

export default getChainId
