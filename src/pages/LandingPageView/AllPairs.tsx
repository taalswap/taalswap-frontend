import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Text, Link, Button } from 'taalswap-uikit'
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

const LinkStyle = styled(Link)`
  color: ${({ theme }) => theme.colors.logoColor};
  text-decoration: underline;
  font-size: 14px;
`

const BTextStyle = styled.td`
  font-size: 12px;
  width: 100%;
`

const AllPairs = () => {
  const { t } = useTranslation()
  const [pairs, setPairs] = useState([])
  const [pairsArray, setPairsArray] = useState([])
  const [ethPrice, setEthPrice] = useState(0)

  const linkToURL = (url: string) => {
    window.location.href = url
  }

  const pairTableRow = () => {
    const resultRow = []
    pairs.forEach((pair) => {
      if (pair.base_symbol !== 'TAL' && pair.quote_symbol !== 'TAL') {
        const base_symbol = pair.base_symbol === 'WETH' ? 'ETH' : pair.base_symbol
        const quote_symbol = pair.quote_symbol === 'WETH' ? 'ETH' : pair.quote_symbol

        const name = `${base_symbol}-${quote_symbol}`

        // const liquidity = parseFloat(pair.liquidity) + parseFloat(pair.liquidity_ETH) * ethPrice
        const liquidity = parseFloat(pair.liquidity)

        const baseDeposit = pair.base_symbol === 'WETH' ? 'ETH' : pair.base_address
        const quoteDeposit = pair.quote_symbol === 'WETH' ? 'ETH' : pair.quote_address

        const deposit =
          quoteDeposit === 'ETH'
            ? `${process.env.REACT_APP_INTERFACE}/#/add/${quoteDeposit}/${baseDeposit}`
            : `${process.env.REACT_APP_INTERFACE}/#/add/${baseDeposit}/${quoteDeposit}`

        const prices =
          baseDeposit === 'ETH'
            ? `${process.env.REACT_APP_INTERFACE}/#/swap/ETH/${pair.quote_address}`
            : `${process.env.REACT_APP_INTERFACE}/#/swap/ETH/${pair.base_address}`

        const temp = {
          name,
          liquidity,
          prices,
          base_symbol,
          deposit,
        }

        resultRow.push(temp)
      }
    })

    return resultRow
  }

  useEffect(() => {
    async function fetchETHPrice() {
      await fetch('https://taalswap-info-api.vercel.app/api/ethprice', {
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

      await fetch('https://taalswap-info-api.vercel.app/api/pairs', {
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

    fetchETHPrice()
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
        <Txtcolor className="section_tit">All Pairs</Txtcolor>
      </div>

      <TableWrap>
        <tbody>
          <tr>
            <TitleStyle>{t('Pair')}</TitleStyle>
            <TitleStyle>{t('Liquidity')}</TitleStyle>
            <TitleStyle>{t('Swap')}</TitleStyle>
            <TitleStyle>{t('Deposit')}</TitleStyle>
          </tr>
          {pairTableRow().map((pair) => (
            <>
              <tr key={pair.name}>
                <TextStyle style={{ verticalAlign: 'middle' }}>{pair.name}</TextStyle>
                <TextStyle style={{ verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '5px' }}>$</span>
                    <CardValue value={pair.liquidity} decimals={0} fontSize="14px" />
                  </div>
                </TextStyle>
                <TextStyle style={{ verticalAlign: 'middle' }}>
                  <Button
                    onClick={() => linkToURL(pair.prices)}
                    scale="sm"
                    maxWidth="100px"
                    width="100%"
                    style={{ fontSize: '11px', padding: '0 7px', lineHeight: '1.1' }}
                  >
                    {t('Buy: %symbol%', { symbol: pair.base_symbol })}
                  </Button>
                </TextStyle>
                <TextStyle style={{ verticalAlign: 'middle' }}>
                  <Button
                    onClick={() => linkToURL(pair.deposit)}
                    scale="sm"
                    style={{ fontSize: '11px', padding: '0 7px', maxWidth: '100px', width: '100%' }}
                  >
                    {t('Deposit')}
                  </Button>
                </TextStyle>
              </tr>
            </>
          ))}
        </tbody>
      </TableWrap>
    </div>
  )
}

export default AllPairs
