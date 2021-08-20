// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
import { isUndefined, parseInt } from 'lodash'
import { getWethAddress } from './addressHelpers'

const getLiquidityUrlPathParts = ({ quoteTokenAddress, tokenAddress }) => {
  // const chainId = process.env.REACT_APP_CHAIN_ID
  const chainIdStr = window.localStorage.getItem("chainId")
  const chainId = chainIdStr === 'undefined'
    ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
    : parseInt(chainIdStr, 10)

  const wBNBAddressString = getWethAddress()
  const quoteTokenAddressString: string = quoteTokenAddress ? quoteTokenAddress[chainId] : null
  const tokenAddressString: string = tokenAddress ? tokenAddress[chainId] : null
  const firstPart =
    !quoteTokenAddressString || quoteTokenAddressString === wBNBAddressString ? 'ETH' : quoteTokenAddressString
  const secondPart = !tokenAddressString || tokenAddressString === wBNBAddressString ? 'ETH' : tokenAddressString
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
