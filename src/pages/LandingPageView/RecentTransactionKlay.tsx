import React from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { useTranslation } from '../../contexts/Localization'

const Txtcolor = styled.p`
  color: ${({ theme }) => theme.colors.logoColor};
  text-align: center;
`
const TableWrap = styled.table`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
`

const TitleStyle = styled.th`
  color: ${({ theme }) => theme.colors.textSubtle};
  background: ${({ theme }) => theme.colors.tertiary};
  border-bottom: 2px solid rgba(133, 133, 133, 0.1);
  padding: 24px 6px 24px 6px;
  text-align: left;
  font-size: 12px;

  &:nth-child(1) {
    width: 15% !important;
    text-align: center;
  }
  &:nth-child(2) {
    width: 22% !important;
    text-align: center;
  }
  &:nth-child(3) {
    width: 22% !important;
    text-align: center;
  }
  &:nth-child(4) {
    width: 22% !important;
    text-align: center;
  }
  &:nth-child(5) {
    width: 19% !important;
    text-align: center;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px 8px 24px 20px;
    font-size: 14px;
    &:nth-child(1) {
      width: 15% !important;
      text-align: center;
    }
    &:nth-child(2) {
      width: 22% !important;
      text-align: center;
    }
    &:nth-child(3) {
      width: 22% !important;
      text-align: center;
    }
    &:nth-child(4) {
      width: 22% !important;
      text-align: center;
    }
    &:nth-child(5) {
      width: 19% !important;
      text-align: center;
    }
  }
`

const TextStyle = styled.td`
  color: ${({ theme }) => theme.colors.logoColor};
  padding: 24px 6px 24px 6px;
  text-align: left;
  border-bottom: 2px solid rgba(133, 133, 133, 0.1);
  font-size: 11px;

  &:nth-child(2) {
    text-align: right;
    > div {
      justify-content: flex-end;
    }
  }
  &:nth-child(3) {
    text-align: right;
    > div {
      justify-content: flex-end;
    }
  }
  &:nth-child(4) {
    text-align: right;
    > div {
      justify-content: flex-end;
    }
  }

  > a {
    font-size: initial;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 24px 6px 24px 6px;
    font-size: 13px;
  }
  > a {
    font-size: 12px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
  }
`

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  margin-right: 10px;
`

const Image = styled.img`
  min-width: 1.5rem;
  max-width: 1.5rem;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const RecentTransactionKlay = () => {
  const { t } = useTranslation()
  const { data, error } = useSWR(`https://api.taalswap.info/cypress/api/transactions`, fetcher)
  const splitAddress = (str = '') => {
    return str !== null ? `${str.substr(0, 4)}...${str.substr(str.length - 4, str.length)}` : '-'
  }

  return (
    <div className="farms_wrap user_section" style={{ maxWidth: '1280px', padding: '50px 10px 0px 20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          borderBottom: '3px solid #00ab55',
          alignItems: 'center',
        }}
      >
        <Inline className="section_tit">
          <Image
            alt="eth"
            src={`${process.env.REACT_APP_FRONTEND}/images/coins/wklay.svg`}
            width="24px"
            height="24px"
            style={{ marginRight: '10px' }}
          />
          <Txtcolor style={{ fontSize: '16px' }}>{t('Recent Transactions on Klaytn')}</Txtcolor>
        </Inline>
      </div>

      <TableWrap>
        <tbody>
          <tr>
            <TitleStyle style={{ textAlign: 'center', maxWidth: '80px' }}>{t('Type')} </TitleStyle>
            <TitleStyle style={{ textAlign: 'center' }}>{t('Sender')}</TitleStyle>
            <TitleStyle style={{ textAlign: 'center' }}>{t('From')}</TitleStyle>
            <TitleStyle style={{ textAlign: 'center' }}>{t('To')}</TitleStyle>
            <TitleStyle style={{ textAlign: 'center' }}>{t('Amount USD')}</TitleStyle>
          </tr>
          {!error &&
            data &&
            data.data.transactions &&
            data.data.transactions.map((transaction) => (
              <tr key={transaction.id}>
                <TextStyle style={{ textAlign: 'center', verticalAlign: 'middle', maxWidth: '80px' }}>Swap</TextStyle>
                <TextStyle style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  {splitAddress(transaction.sender)}
                </TextStyle>
                <TextStyle style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  {splitAddress(transaction.from)}
                </TextStyle>
                <TextStyle style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  {splitAddress(transaction.to)}
                </TextStyle>
                <TextStyle style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  {parseFloat(transaction.amountUSD).toFixed(5)}
                </TextStyle>
              </tr>
            ))}
        </tbody>
      </TableWrap>
    </div>
  )
}

export default RecentTransactionKlay
