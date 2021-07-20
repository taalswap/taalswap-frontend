import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { Text, Link, Button, IconButton, SyncAltIcon, AddIcon } from 'taalswap-uikit'
import { useTranslation } from 'contexts/Localization'
import CardValue from 'views/Home/components/CardValue'

const Txtcolor = styled.p`
  color: ${({ theme }) => theme.colors.logoColor};
  text-align: center;
`
const TableWrap = styled.table`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  // margin: 16px 0px;
  // overflow: hidden;
`

const TitleStyle = styled.th`
  color: ${({ theme }) => theme.colors.textSubtle};
  background: ${({ theme }) => theme.colors.tertiary};
  border-bottom: 2px solid rgba(133, 133, 133, 0.1);
  padding: 24px 8px 24px 8px;
  text-align: left;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 24px 8px 24px 20px;
    font-size: 14px;
  }
`

const TitleIconStyle = styled.th`
  color: ${({ theme }) => theme.colors.textSubtle};
  background: ${({ theme }) => theme.colors.tertiary};
  border-bottom: 2px solid rgba(133, 133, 133, 0.1);
  // padding: 28px 5px 28px 26px;
  text-align: center;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.lg} {
    // padding: 28x 8px 28px 20px;
    font-size: 14px;
  }
`

const TextStyle = styled.td`
  color: ${({ theme }) => theme.colors.logoColor};
  padding: 24px 8px 24px 8px;
  text-align: left;
  border-bottom: 2px solid rgba(133, 133, 133, 0.1);
  font-size: 12px;

  > a {
    font-size: 14px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 24px 8px 24px 20px;
    font-size: 14px;
  }
  > a {
    font-size: 12px;
  }
`

const TextIconStyle = styled.td`
  color: ${({ theme }) => theme.colors.logoColor};
  text-align: center;
  border-bottom: 2px solid rgba(133, 133, 133, 0.1);
  font-size: 12px;

  > a {
    font-size: 14px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
  > a {
    font-size: 12px;
  }
`

const LinkStyle = styled(Link)`
  color: ${({ theme }) => theme.colors.logoColor};
  text-decoration: underline;
  font-size: 14px;
`

const BTextStyle = styled.td`
  font-size: 12px;
  width: 100%;
  //
`
const HigherLogo = styled.img`
  z-index: 2;
  background-color: white;
  border-radius: 50%;

  border: 1px solid #e3e1e1;
`

const CoveredLogo = styled.img`
  z-index: 1;
  position: absolute;
  background-color: white;
  border-radius: 50%;
  border: 1px solid #e3e1e1;
  margin-left: 15px;
`

const TokenWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`

function DoubleTokenLogo({ a0, a1, size = 24, margin = false }) {
  return (
    <TokenWrapper>
      <HigherLogo src={a0} alt="test" />
      <CoveredLogo src={a1} alt="test" />
    </TokenWrapper>
  )
}

const AllPairs = () => {
  const { t } = useTranslation()
  const [pairs, setPairs] = useState([])
  const [pairsArray, setPairsArray] = useState([])
  const [ethPrice, setEthPrice] = useState(0)

  const linkToURL = (url: string) => {
    window.location.href = url
  }

  const isAddress = (value) => {
    try {
      return ethers.utils.getAddress(value.toLowerCase())
    } catch {
      return false
    }
  }

  const getTokenIconPath = (address) => {
    // 토큰 icon address
    let path
    const tokenIcon = address.toLowerCase()
    if (
      tokenIcon === '0x90a4a420732907b3c38b11058f9aa02b3f4121df' ||
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

  const pairTableRow = () => {
    const resultRow = []
    pairs.forEach((pair) => {
      if (pair.base_symbol !== 'TAL' && pair.quote_symbol !== 'TAL') {
        const base_symbol = pair.base_symbol === 'WETH' ? 'ETH' : pair.base_symbol
        const quote_symbol = pair.quote_symbol === 'WETH' ? 'ETH' : pair.quote_symbol

        const name = `${base_symbol}-${quote_symbol}`

        const price = pair.price
        // if (parseFloat(pair.price) > 1) {
        //   price = parseFloat(pair.price).toFixed(2)
        // } else {
        //   price = parseFloat(pair.price).toFixed(8)
        // }

        const liquidity = parseFloat(pair.liquidity)

        const baseDeposit = pair.base_symbol === 'WETH' ? 'ETH' : pair.base_address
        const quoteDeposit = pair.quote_symbol === 'WETH' ? 'ETH' : pair.quote_address

        const deposit =
          quoteDeposit === 'ETH'
            ? `${process.env.REACT_APP_INTERFACE}/#/add/${quoteDeposit}/${baseDeposit}`
            : `${process.env.REACT_APP_INTERFACE}/#/add/${baseDeposit}/${quoteDeposit}`

        const volumn24h = pair.previous24hVolumeUSD

        const baseSymbolPath = getTokenIconPath(pair.base_address)
        const quoteSymbolPath = getTokenIconPath(pair.quote_address)

        // let prices = ''
        // if (pair.base_symbol === 'TSHP') {
        //   prices = `${process.env.REACT_APP_INTERFACE}/#/swap/${pair.quote_address}/${pair.base_address}`
        // } else {
        //   prices =
        //     baseDeposit === 'ETH'
        //       ? `${process.env.REACT_APP_INTERFACE}/#/swap/${pair.quote_address}/ETH`
        //       : `${process.env.REACT_APP_INTERFACE}/#/swap/ETH/${pair.base_address}`
        // }

        const prices = `${process.env.REACT_APP_INTERFACE}/#/swap/${quoteDeposit}/${baseDeposit}`

        const temp = {
          name,
          price,
          volumn24h,
          prices,
          base_symbol,
          liquidity,
          deposit,
          baseSymbolPath,
          quoteSymbolPath,
        }

        resultRow.push(temp)
      }
    })
    return resultRow
  }

  useEffect(() => {
    async function fetchETHPrice() {
      await fetch('https://taalswap-info-api-black.vercel.app/api/ethprice', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setEthPrice(parseFloat(response.data.ethPrice))
        })
    }

    async function fetchData() {
      const data = []

      await fetch('https://taalswap-info-api-black.vercel.app/api/pairs', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const pairArray = Object.entries(response.data)
          const array = pairArray.map((pair) => JSON.parse(JSON.stringify(pair[1])))
          setPairs(array)

          Object.keys(response.data).forEach((key) => {
            data.push(response.data[key])
          })
          setPairs(data)
        })
    }

    // fetchETHPrice()
    fetchData()
  }, [])

  return (
    <div className="farms_wrap user_section" style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '50px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          borderBottom: '3px solid #00ab55',
          // border: '1px solid red',
          // marginBottom: '0px',
          // paddingBottom: '0px',
        }}
      >
        <Txtcolor className="section_tit" style={{ fontSize: '16px' }}>
          All Pairs
        </Txtcolor>
      </div>

      <TableWrap>
        <tbody>
          <tr>
            <TitleStyle style={{ width: '30%' }}>{t('Pair')}</TitleStyle>
            <TitleStyle>{t('Liquigity ($)')}</TitleStyle>
            <TitleStyle>{t('Volume (24H)')}</TitleStyle>
            <TitleIconStyle>{t('Swap')}</TitleIconStyle>
            <TitleIconStyle>{t('LP')}</TitleIconStyle>
          </tr>
          {pairTableRow()
            .sort((pairA, pairB) => pairB.volumn24h - pairA.volumn24h)
            .map((pair) => (
              <tr key={pair.name}>
                <TextStyle style={{ verticalAlign: 'middle' }}>
                  {/* <DoubleTokenLogo a0={pair.baseSymbolPath} a1={pair.quoteSymbolPath} size={16} /> */}
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <TokenWrapper>
                      <HigherLogo src={pair.baseSymbolPath} alt="test" width="24px" height="24px" />
                      <CoveredLogo src={pair.quoteSymbolPath} alt="test" width="24px" height="24px" />
                    </TokenWrapper>
                    <div style={{ marginLeft: '20px' }}>{pair.name}</div>
                  </div>
                </TextStyle>
                <TextStyle style={{ verticalAlign: 'middle' }}>
                  <CardValue value={pair.liquidity} decimals={2} fontSize="14px" />
                  {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                    {pair.price >= 1 ? (
                      <CardValue value={pair.liquidity} decimals={2} fontSize="14px" />
                    ) : (
                      <CardValue value={pair.price} decimals={8} fontSize="14px" />
                    )}
                  </div> */}
                </TextStyle>
                <TextStyle style={{ verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '5px' }}>$</span>
                    <CardValue value={pair.volumn24h} decimals={0} fontSize="14px" />
                  </div>
                </TextStyle>
                <TextIconStyle style={{ verticalAlign: 'middle' }}>
                  <IconButton onClick={() => linkToURL(pair.prices)} variant="text" scale="sm" ml="4px">
                    <SyncAltIcon width="18px" />
                  </IconButton>
                </TextIconStyle>
                <TextIconStyle style={{ verticalAlign: 'middle' }}>
                  <IconButton onClick={() => linkToURL(pair.deposit)} variant="text" scale="sm" ml="4px">
                    <AddIcon width="18px" />
                  </IconButton>
                </TextIconStyle>
              </tr>
            ))}
        </tbody>
      </TableWrap>
    </div>
  )
}

export default AllPairs
