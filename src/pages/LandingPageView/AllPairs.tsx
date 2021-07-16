import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
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
        let price
        if (parseFloat(pair.price) > 1) {
          price = parseFloat(pair.price).toFixed(2)
        } else {
          price = parseFloat(pair.price).toFixed(8)
        }
        console.log(price)

        // const liquidity = parseFloat(pair.liquidity) + parseFloat(pair.liquidity_ETH) * ethPrice
        const liquidity = parseFloat(pair.liquidity)

        const baseDeposit = pair.base_symbol === 'WETH' ? 'ETH' : pair.base_address
        const quoteDeposit = pair.quote_symbol === 'WETH' ? 'ETH' : pair.quote_address

        const deposit =
          quoteDeposit === 'ETH'
            ? `${process.env.REACT_APP_INTERFACE}/#/add/${quoteDeposit}/${baseDeposit}`
            : `${process.env.REACT_APP_INTERFACE}/#/add/${baseDeposit}/${quoteDeposit}`

        const prices = `${process.env.REACT_APP_INTERFACE}/#/swap/${quoteDeposit}/${baseDeposit}`

        const temp = {
          name,
          price,
          liquidity,
          prices,
          base_symbol,
          deposit,
        }

        resultRow.push(temp)
      }
    })
    // "http://localhost:3000/#/swap/0xdAC17F958D2ee523a2206206994597C13D831ec7/ETH"
    // "http://localhost:3000/#/swap/0xdAC17F958D2ee523a2206206994597C13D831ec7/0x525794473F7ab5715C81d06d10f52d11cC052804"
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
        <Txtcolor className="section_tit">All Pairs</Txtcolor>
      </div>

      <TableWrap>
        <tbody>
          <tr>
            <TitleStyle>{t('Pair')}</TitleStyle>
            <TitleStyle>{t('Price')}</TitleStyle>
            <TitleStyle>{t('Liquidity')}</TitleStyle>
            <TitleStyle>{t('Swap')}</TitleStyle>
            <TitleStyle>{t('Deposit')}</TitleStyle>
          </tr>
          {pairTableRow().map((pair) => (
            <tr key={pair.name}>
              <TextStyle style={{ verticalAlign: 'middle' }}>{pair.name}</TextStyle>
              <TextStyle style={{ verticalAlign: 'middle' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {
                    pair.price > 1 ?
                      <CardValue value={pair.price} decimals={2} fontSize="14px" />
                      :
                      <CardValue value={pair.price} decimals={8} fontSize="14px" />
                  }
                </div>
              </TextStyle>
              <TextStyle style={{ verticalAlign: 'middle' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '5px' }}>$</span>
                  <CardValue value={pair.liquidity} decimals={0} fontSize="14px" />
                </div>
              </TextStyle>
              <TextStyle style={{ verticalAlign: 'middle' }}>
                <IconButton onClick={() => linkToURL(pair.prices)} variant="text" scale="sm" ml="4px">
                  <SyncAltIcon width="18px" />
                </IconButton>
              </TextStyle>
              <TextStyle style={{ verticalAlign: 'middle' }}>
                <IconButton onClick={() => linkToURL(pair.deposit)} variant="text" scale="sm" ml="4px">
                  <AddIcon width="18px" />
                </IconButton>
              </TextStyle>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </div>
  )
}

export default AllPairs
