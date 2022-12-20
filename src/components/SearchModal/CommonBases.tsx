import React from 'react'
import {Text} from 'taalswap-uikit'
import {BINANCE, ChainId, Currency, currencyEquals, ETHER, KLAYTN, POLYGON, AURORA, Token} from 'taalswap-sdk'
import styled from 'styled-components'

import {SUGGESTED_BASES} from '../../constants'
import {AutoColumn} from '../Column'
import QuestionHelper from '../QuestionHelper'
import {AutoRow} from '../Row'
import CurrencyLogo from '../CurrencyLogo'
import {useTranslation} from '../../contexts/Localization'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.colors.tertiary)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.colors.invertedContrast};
  }

  background-color: ${({ theme, disable }) => disable && theme.colors.tertiary};
  opacity: ${({ disable }) => disable && '0.4'};
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const { t } = useTranslation()
  let CURRENCY = ETHER
  if (chainId && (chainId === ChainId.POLYGON || chainId === ChainId.MUMBAI)) CURRENCY = POLYGON
  else if (chainId && (chainId === ChainId.KLAYTN || chainId === ChainId.BAOBAB)) CURRENCY = KLAYTN
  else if (chainId && (chainId === ChainId.BSCMAIN || chainId === ChainId.BSCTEST)) CURRENCY = BINANCE
  else if (chainId && (chainId === ChainId.AURORAMAIN || chainId === ChainId.AURORATEST)) CURRENCY = AURORA

  return (
    <AutoColumn gap="md">
      <AutoRow>
        <Text fontSize="14px">Common bases</Text>
        <QuestionHelper text={t('These tokens are commonly paired with other tokens.')} />
      </AutoRow>
      <AutoRow gap="4px">
        <BaseWrapper
          onClick={() => {
            if (
              !selectedCurrency ||
              !currencyEquals(selectedCurrency, ETHER) ||
              !currencyEquals(selectedCurrency, KLAYTN) ||
              !currencyEquals(selectedCurrency, BINANCE) ||
              !currencyEquals(selectedCurrency, POLYGON) ||
              !currencyEquals(selectedCurrency, AURORA)
            ) {
              switch (chainId) {
                case ChainId.MAINNET:
                case ChainId.ROPSTEN:
                case ChainId.RINKEBY:
                  onSelect(ETHER)
                  break
                case ChainId.KLAYTN:
                case ChainId.BAOBAB:
                  onSelect(KLAYTN)
                  break
                case ChainId.BSCMAIN:
                case ChainId.BSCTEST:
                  onSelect(BINANCE)
                  break
                case ChainId.POLYGON:
                case ChainId.MUMBAI:
                  onSelect(POLYGON)
                  break
                case ChainId.AURORAMAIN:
                case ChainId.AURORATEST:
                  onSelect(AURORA)
                  break
                default:
                  onSelect(ETHER)
                  break
              }
            }
          }}
          disable={selectedCurrency === ETHER || selectedCurrency === KLAYTN || selectedCurrency === BINANCE || selectedCurrency === POLYGON || selectedCurrency === AURORA}
        >
          <CurrencyLogo currency={CURRENCY} style={{ marginRight: 8 }} />
          <Text>ETH</Text>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
          return (
            <BaseWrapper onClick={() => !selected && onSelect(token)} disable={selected} key={token.address}>
              <CurrencyLogo currency={token} style={{ marginRight: 8 }} />
              <Text>{token.symbol}</Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  )
}
