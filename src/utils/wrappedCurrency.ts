import { ChainId, Currency, CurrencyAmount, ETHER, KLAYTN, BINANCE, Token, TokenAmount, WETH } from 'taalswap-sdk'

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  // eslint-disable-next-line no-nested-ternary
  return chainId && (currency === ETHER || currency === KLAYTN || currency === BINANCE) ? WETH[chainId] : currency instanceof Token ? currency : undefined
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
    if (token.chainId > 1000) return KLAYTN;
    if (token.chainId > 55 && token.chainId < 1000) return BINANCE;
    return ETHER;
  }
  return token
}
