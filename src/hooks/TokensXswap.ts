import { parseBytes32String } from '@ethersproject/strings'
import { Currency, ETHER, Token, currencyEquals, KLAYTN, BINANCE, POLYGON, AURORA, ChainId } from 'taalswap-sdk'
import { useMemo } from 'react'
import { useSelectedTokenList } from '../state/lists/hooks'
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'
// eslint-disable-next-line import/no-cycle
import { useUserAddedTokens } from '../state/user/hooks'
import { isAddress } from '../utils'

import { useActiveWeb3React } from './index'
import { useBytes32TokenContract, useTokenContract } from './useContract2'

export function useAllTokensXswap(selectedChainId?: ChainId): { [address: string]: Token } {
  let { chainId } = useActiveWeb3React()
  if (selectedChainId) {
    chainId = selectedChainId
  }
  const userAddedTokens = useUserAddedTokens()
  const allTokens = useSelectedTokenList()

  return useMemo(() => {
    if (!chainId) return {}
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: Token }>(
          (tokenMap, token) => {
            tokenMap[token.address] = token
            return tokenMap
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          { ...allTokens[chainId] },
        )
    )
  }, [chainId, userAddedTokens, allTokens])
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedTokenXswap(currency: Currency): boolean {
  const userAddedTokens = useUserAddedTokens()
  return !!userAddedTokens.find((token) => currencyEquals(currency, token))
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/
function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : bytes32 && BYTES32_REGEX.test(bytes32)
    ? parseBytes32String(bytes32)
    : defaultValue
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useTokenXswap(tokenAddress?: string): Token | undefined | null {
  // const { chainId } = useActiveWeb3React
  const crossChain = window.localStorage.getItem('crossChain') ?? ChainId.BAOBAB.toString()
  const chainId = parseInt(crossChain) as ChainId

  const tokens = useAllTokensXswap(chainId)
  const address = isAddress(tokenAddress)

  const tokenContract = useTokenContract(address || undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address || undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD,
  )
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)

  return useMemo(() => {
    if (token) return token
    if (!chainId || !address) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token'),
      )
    }
    return undefined
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ])
}

export function useCurrencyXswap(currencyId: string | undefined): Currency | null | undefined {
  // TODO : 일반화 할 수 있을 지... 테스트 필요함.
  const chainId = parseInt(window.localStorage.getItem("crossChain") ?? "1")

  const isBNB = currencyId?.toUpperCase() === 'ETH' || currencyId?.toUpperCase() === 'KLAY' || currencyId?.toUpperCase() === 'BNB' || currencyId?.toUpperCase() === 'MATIC'
  const token = useTokenXswap(isBNB ? undefined : currencyId)
  // return isBNB ? currencyId?.toUpperCase() === 'ETH' ? (chainId === ChainId.AURORAMAIN || chainId === ChainId.AURORATEST) ? AURORA: ETHER : currencyId?.toUpperCase() === 'KLAY' ? KLAYTN : currencyId?.toUpperCase() === 'BNB' ? BINANCE : POLYGON : token
  return isBNB ? currencyId?.toUpperCase() === 'ETH' ? ETHER : currencyId?.toUpperCase() === 'KLAY' ? KLAYTN : currencyId?.toUpperCase() === 'BNB' ? BINANCE : POLYGON : token
}
