import {
  BINANCE,
  ChainId,
  Currency,
  CurrencyAmount,
  ETHER,
  KLAYTN,
  POLYGON,
  AURORA,
  Token,
  TokenAmount,
  WETH
} from 'taalswap-sdk'

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  // eslint-disable-next-line no-nested-ternary
  return chainId && (currency === ETHER || currency === KLAYTN || currency === BINANCE || currency === POLYGON || currency === AURORA) ? WETH[chainId] : currency instanceof Token ? currency : undefined
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined
): TokenAmount | undefined {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
}

export function unwrappedToken(token: Token): Currency {
  if (token.equals(WETH[token.chainId])) {
    if (token.chainId === ChainId.POLYGON || token.chainId === ChainId.MUMBAI) return POLYGON;
    if (token.chainId === ChainId.KLAYTN || token.chainId === ChainId.BAOBAB) return KLAYTN;
    if (token.chainId === ChainId.BSCMAIN || token.chainId === ChainId.BSCTEST) return BINANCE;
    if (token.chainId === ChainId.AURORAMAIN || token.chainId === ChainId.AURORATEST) return AURORA;
    return ETHER;
  }
  return token
}
