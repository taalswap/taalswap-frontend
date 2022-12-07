import {CurrencyAmount, ETHER, KLAYTN, BINANCE, POLYGON, JSBI, ChainId} from 'taalswap-sdk'
import { MIN_ETH } from '../constants'
import getChainId from "./getChainId";
import Chart from "../views/Predictions/Chart";

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount): CurrencyAmount | undefined {
  const chainId = getChainId()
  if (!currencyAmount) return undefined
  if (currencyAmount.currency === ETHER || currencyAmount.currency === KLAYTN || currencyAmount.currency === BINANCE || currencyAmount.currency === POLYGON) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_ETH)) {
      if (chainId === ChainId.POLYGON || chainId === ChainId.MUMBAI) return CurrencyAmount.polygon(JSBI.subtract(currencyAmount.raw, MIN_ETH))
      if (chainId === ChainId.KLAYTN || chainId === ChainId.BAOBAB) return CurrencyAmount.klaytn(JSBI.subtract(currencyAmount.raw, MIN_ETH))
      if (chainId === ChainId.BSCMAIN || chainId === ChainId.BSCTEST) return CurrencyAmount.binance(JSBI.subtract(currencyAmount.raw, MIN_ETH))
      return CurrencyAmount.ether(JSBI.subtract(currencyAmount.raw, MIN_ETH))
    }
    if (chainId === ChainId.POLYGON || chainId === ChainId.MUMBAI) return CurrencyAmount.polygon(JSBI.BigInt(0))
    if (chainId === ChainId.KLAYTN || chainId === ChainId.BAOBAB) return CurrencyAmount.klaytn(JSBI.BigInt(0))
    if (chainId === ChainId.BSCMAIN || chainId === ChainId.BSCTEST) return CurrencyAmount.binance(JSBI.BigInt(0))
    return CurrencyAmount.ether(JSBI.BigInt(0))
  }
  return currencyAmount
}

export default maxAmountSpend
