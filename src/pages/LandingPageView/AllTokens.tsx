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

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  margin-right: 10px;
`

const Image = styled.img`
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const AllTokens = () => {
  const { t } = useTranslation()
  const [tokens, setTokens] = useState([])

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

  const tokenTableRow = () => {
    const resultRow = []
    tokens.forEach((token) => {
      //   console.log(token)
      if (token.symbol !== 'TAL') {
        const symbol = token.symbol === 'WETH' ? 'ETH' : token.symbol

        const price = token.price

        const liquidity = parseFloat(token.liquidity)

        // 토큰 icon address
        let path
        const tokenIcon = token.address.toLowerCase()
        if (
          tokenIcon === '0x90a4a420732907b3c38b11058f9aa02b3f4121df' ||
          tokenIcon === '0x086b00cf35e8873636384cd2b424c39ae875a8a9'
        ) {
          path = `https://taalswap.info/images/coins/${token.address.toLowerCase()}.png`
        } else {
          path = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
            token.address,
          )}/logo.png`
        }

        const address = token.symbol === 'WETH' ? 'ETH' : token.address

        const prices = `${process.env.REACT_APP_INTERFACE}/#/swap/0x00/${address}`
        const deposit = `${process.env.REACT_APP_INTERFACE}/#/add/0x00/${address}`

        const temp = {
          path,
          symbol,
          price,
          liquidity,
          prices,
          deposit,
        }

        resultRow.push(temp)
      }
    })
    return resultRow
  }

  useEffect(() => {
    async function fetchData() {
      const data = []

      await fetch('https://taalswap-info-api-black.vercel.app/api/tokens', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const toeknsArray = Object.entries(response.data)
          const array = toeknsArray.map((pair) => JSON.parse(JSON.stringify(pair[1])))
          setTokens(array)

          Object.keys(response.data).forEach((key) => {
            data.push(response.data[key])
          })
          setTokens(data)
        })
    }

    fetchData()
  }, [])

  return (
    <div className="farms_wrap user_section" style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          borderBottom: '3px solid #00ab55',
        }}
      >
        <Txtcolor className="section_tit" style={{ fontSize: '16px' }}>
          All Tokens
        </Txtcolor>
      </div>

      <TableWrap>
        <tbody>
          <tr key="allTokens">
            <TitleStyle>{t('Name')} </TitleStyle>
            <TitleStyle>{t('Liquidity')}</TitleStyle>
            <TitleStyle>{t('Price ($)')}</TitleStyle>
            <TitleIconStyle>{t('Swap')}</TitleIconStyle>
            <TitleIconStyle>{t('LP')}</TitleIconStyle>
          </tr>
          {tokenTableRow().map((token) => (
            <tr key={token.address}>
              <TextStyle style={{ verticalAlign: 'middle' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Inline>
                    <Image alt={token.name} src={token.path} width="24px" height="24px" />
                  </Inline>
                  {token.symbol}
                </div>
              </TextStyle>
              <TextStyle style={{ verticalAlign: 'middle' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '5px' }}>$</span>
                  <CardValue value={token.liquidity} decimals={0} fontSize="14px" />
                </div>
              </TextStyle>
              <TextStyle style={{ verticalAlign: 'middle' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* <span style={{ marginRight: '5px' }}>$</span> */}
                  {/* <CardValue value={parseFloat(formattedNum(token.price))} decimals={2} fontSize="14px" /> */}
                  {token.price >= 1 ? (
                    <CardValue value={token.price} decimals={2} fontSize="14px" />
                  ) : (
                    <CardValue value={token.price} decimals={4} fontSize="14px" />
                  )}
                </div>
              </TextStyle>

              <TextIconStyle style={{ verticalAlign: 'middle' }}>
                <IconButton onClick={() => linkToURL(token.prices)} variant="text" scale="sm" ml="4px">
                  <SyncAltIcon width="18px" />
                </IconButton>
              </TextIconStyle>
              <TextIconStyle style={{ verticalAlign: 'middle' }}>
                <IconButton onClick={() => linkToURL(token.deposit)} variant="text" scale="sm" ml="4px">
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

export default AllTokens
