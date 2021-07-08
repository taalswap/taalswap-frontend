import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Text, Link } from 'taalswap-uikit'
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
  margin: 16px 0px;
  overflow: hidden;
`

const TitleStyle = styled.th`
  color: ${({ theme }) => theme.colors.textSubtle};
  background: ${({ theme }) => theme.colors.tertiary};
  border-bottom: 2px solid rgba(133, 133, 133, 0.1);
  padding: 24px 8px 24px 20px;
  text-align: left;
  font-size: 14px;
`

const TextStyle = styled.td`
  color: ${({ theme }) => theme.colors.logoColor};
  padding: 24px 8px 24px 20px;
  text-align: left;
  border-bottom: 2px solid rgba(133, 133, 133, 0.1);
  font-size: 14px;
`

const LinkStyle = styled(Link)`
  color: ${({ theme }) => theme.colors.logoColor};
  text-decoration: underline;
  font-size: 14px;
`

const AllPairs = () => {
  const { t } = useTranslation()
  const [pairs, setPairs] = useState([])
  const [pairsArray, setPairsArray] = useState([])
  const [ethPrice, setEthPrice] = useState(0)

  const pairTableRow = () => {
    const resultRow = []
    pairs.forEach((pair) => {
      const base_symbol = pair.base_symbol === 'WETH' ? 'ETH' : pair.base_symbol
      const quote_symbol = pair.quote_symbol === 'WETH' ? 'ETH' : pair.quote_symbol

      const name = `${base_symbol}-${quote_symbol}`
      // const liquidity = parseFloat(pair.liquidity) + parseFloat(pair.liquidity_ETH) * ethPrice
      const liquidity = parseFloat(pair.liquidity)

      const temp = {
        name,
        liquidity,
        prices: `${process.env.REACT_APP_INTERFACE}/#/swap/ETH/${pair.base_address}`,
        base_symbol,
      }

      resultRow.push(temp)
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
    <div className="farms_wrap" style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <Txtcolor className="section_tit">All Pairs</Txtcolor>
      <TableWrap>
        <tbody>
          {/* {pairsArray && pairsArray.forEach((pair) => ()  :(null))} */}
          <tr>
            <TitleStyle>{t('Pair')}</TitleStyle>
            <TitleStyle>{t('Liquidity')}</TitleStyle>
            <TitleStyle>{t('Swap')}</TitleStyle>
          </tr>
          {pairTableRow().map((pair) => (
            <>
              <tr>
                <TextStyle>{pair.name}</TextStyle>
                <TextStyle>
                  <div style={{ display: 'flex' }}>
                    <span style={{ marginRight: '5px' }}>$</span>
                    <CardValue value={pair.liquidity} fontSize="14px" />
                  </div>
                </TextStyle>

                <TextStyle>
                  <LinkStyle href={pair.prices}>{t('Buy: %symbol%', { symbol: pair.base_symbol })}</LinkStyle>
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
