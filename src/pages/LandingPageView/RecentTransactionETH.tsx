import React from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { ChainId } from 'taalswap-sdk'
import { ethers } from 'ethers'
import { Box } from 'taalswap-uikit'
import { useTranslation } from '../../contexts/Localization'
import TAL_ADDRESS from '../../config/constants/taal'

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
      width: 19% !important;
      text-align: center;
    }
    &:nth-child(3) {
      width: 19% !important;
      text-align: center;
    }
    &:nth-child(4) {
      width: 20% !important;
      text-align: center;
    }
    &:nth-child(5) {
      width: 27% !important;
      text-align: center;
    }
  }
`

const TextStyle = styled.td`
  color: ${({ theme }) => theme.colors.logoColor};
  padding: 12px 6px 12px 6px;
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
    padding: 12px 8px 12px 20px;
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
const LogoIcon = styled.img`
  width: 19px;
  height: 19px;
  max-width: none;
  background-color: white;
  border-radius: 50%;
  border: 1px solid #e3e1e1;
  z-index: 2;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 24px;
    height: 24px;
  }
`

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const RecentTransactionETH = () => {
  const { t } = useTranslation()
  const { data, error } = useSWR('https://taalswap-info-api-black.vercel.app/api/transactions', fetcher)

  const isAddress = (value: string) => {
    try {
      return ethers.utils.getAddress(value.toLowerCase())
    } catch {
      return false
    }
  }

  const getTokenIconPath = (address: string) => {
    let path
    const tokenIcon = address.toLowerCase()
    if (
      tokenIcon === TAL_ADDRESS[ChainId.MAINNET] ||
      tokenIcon === TAL_ADDRESS[ChainId.ROPSTEN] ||
      tokenIcon === TAL_ADDRESS[ChainId.RINKEBY] ||
      tokenIcon === '0x086b00cf35e8873636384cd2b424c39ae875a8a9'
    ) {
      path = `https://taalswap.info/images/coins/${address.toLowerCase()}.png`
    } else {
      path = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
        address,
      )}/logo.png`
    }

    return path
  }

  const convertTimestamp = (time_stamp: string) => {
    const a = new Date(parseInt(time_stamp) * 1000)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const year = a.getFullYear()
    const month = months[a.getMonth()]
    const date = a.getDate()
    const hour = a.getHours()
    const min = a.getMinutes()
    const sec = a.getSeconds()
    return `${date} ${month} ${year} ${hour}:${min}:${sec}`
  }

  const linkToURL = (tx_hash: string) => {
    // window.location.href = `https://etherscan.io/tx/${tx_hash}`
    window.open(`https://etherscan.io/tx/${tx_hash}`)
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
            src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
            width="24px"
            height="24px"
            style={{ marginRight: '10px' }}
          />
          <Txtcolor style={{ fontSize: '16px' }}>{t('Recent Transactions on Ethereum')}</Txtcolor>
        </Inline>
      </div>

      <TableWrap>
        <tbody>
          <tr>
            <TitleStyle style={{ textAlign: 'center', maxWidth: '80px' }}>{t('Type')} </TitleStyle>
            <TitleStyle style={{ textAlign: 'center' }}>{t('From')}</TitleStyle>
            <TitleStyle style={{ textAlign: 'center' }}>{t('To')}</TitleStyle>
            <TitleStyle style={{ textAlign: 'center' }}>{t('Amount USD')}</TitleStyle>
            <TitleStyle style={{ textAlign: 'center' }}>{t('Date & Time')}</TitleStyle>
          </tr>
          {!error &&
            data &&
            data.data.transactions &&
            data.data.transactions.map((transaction) => (
              <tr key={transaction.id}>
                <TextStyle style={{ textAlign: 'center', verticalAlign: 'middle', maxWidth: '80px' }}>
                  {transaction.__typename}
                </TextStyle>
                <TextStyle
                  style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }}
                  onClick={() => linkToURL(transaction.transaction.id)}
                >
                  <Box
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                  >
                    <LogoIcon src={getTokenIconPath(transaction.pair.token0.id)} alt={transaction.pair.token0.symbol} />
                    <span style={{ fontSize: '8px', marginTop: '5px' }}>
                      {transaction.pair.token0.symbol === 'WETH' ? 'ETH' : transaction.pair.token0.symbol}
                    </span>
                  </Box>
                </TextStyle>
                <TextStyle
                  style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }}
                  onClick={() => linkToURL(transaction.transaction.id)}
                >
                  <Box
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                  >
                    <LogoIcon src={getTokenIconPath(transaction.pair.token1.id)} alt={transaction.pair.token1.symbol} />
                    <span style={{ fontSize: '8px', marginTop: '5px' }}>
                      {transaction.pair.token1.symbol === 'WETH' ? 'ETH' : transaction.pair.token1.symbol}
                    </span>
                  </Box>
                </TextStyle>
                <TextStyle style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  {parseFloat(transaction.amountUSD).toFixed(2)}
                </TextStyle>
                <TextStyle style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  {convertTimestamp(transaction.transaction.timestamp)}
                </TextStyle>
              </tr>
            ))}
        </tbody>
      </TableWrap>
    </div>
  )
}

export default RecentTransactionETH
