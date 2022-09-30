import { Currency, ETHER, KLAYTN, BINANCE, Token } from 'taalswap-sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'ETH'
  if (currency === KLAYTN) return 'KLAY'
  if (currency === BINANCE) return 'BNB'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
