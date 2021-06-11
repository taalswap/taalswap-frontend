import React from 'react'
// import { Link } from 'taalswap-uikit'
import { useGetStats } from 'hooks/api'
import { usePriceCakeBusd } from 'state/hooks'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getTaalAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
// import AnimatedNumber from 'react-animated-number'
import CardValue from '../../views/Home/components/CardValue'

const Section_Top = () => {
  const data = useGetStats()
  const cakePriceUsd = usePriceCakeBusd()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getTaalAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  //   const tvl = data ? data.tvl.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null
  const tvl = data ? data.tvl : null

  return (
    <div className="top_wrap">
      <div className="cont">
        <h3 className="home_title">Boost your assets the way you&apos;re never imagined</h3>
        <p className="home_subtit">A multi-chain AMM protocol to safeguard and increse your assets</p>
        <div className="top_buyline">
          <div className="buy_textwrap">
            <p className="buy_name">Current TVL</p>

            {data && <p className="buy_num">{`$${tvl.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}</p>}
            {/* {data != null ? (
              <AnimatedNumber
                component="p"
                value={tvl}
                style={{
                  transition: '0.8s ease-out',
                  fontSize: '44px',
                  color: '#212b36',
                  fontWeight: 'bold',
                  marginLeft: '5%',
                }}
                duration={5000}
                // formatValue={(n) => `$${n.toFixed(2)}`}
                formatValue={(n) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
              />
            ) : null} */}
          </div>
          <div className="buy_btnwrap">
            <input type="button" value="BUY TAL" style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div className="input_wrap">
          <div className="taal_info">
            <ul>
              <li>
                <p className="tit">TAL PRICE</p>
                <div style={{ display: 'flex' }}>
                  {cakePriceUsd.isNaN() === false && (
                    <>
                      <CardValue fontWeight="bold" fontSize="18px" marginRight="20px" value={cakePriceUsd.toNumber()} />
                      <span className="name">USD</span>
                    </>
                  )}
                </div>
              </li>
              <li>
                <p className="tit">TAL market cap</p>
                <div>
                  {/* <span className="num" style={{ color: 'red' }}> */}
                  <span className="num">101.5M</span>
                  <span className="name">USD</span>
                </div>
              </li>
              <li>
                <p className="tit">TAL circ. supply</p>
                <div style={{ display: 'flex' }}>
                  {/* <span className="num">2,709,061</span> */}
                  {cakeSupply && (
                    <>
                      <CardValue fontSize="18px" marginRight="20px" value={cakeSupply} />
                      <span className="name">TAL</span>
                    </>
                  )}
                </div>
                {/* <p className="sub_text" style={{ color: 'red' }}> */}
                <p className="sub_text">=BSC 2.3M / HECO 0.2M / OTHERS 0.2M</p>
              </li>
              <li>
                <p className="tit">TAL burnt</p>
                <div style={{ display: 'flex' }}>
                  {/* <span className="num">59,566.5887</span> */}
                  <CardValue fontSize="18px" marginRight="20px" decimals={0} value={burnedBalance} />
                  <span className="name">TAL</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="taal_portfolio">
            <ul>
              <p className="portfolio_title">MY PORTFOLIO</p>
              <li>
                <p className="tit">MY Total Deposit</p>
                <div>
                  <span className="num">-</span>
                  <span className="name">USD</span>
                </div>
              </li>
              <li>
                <p className="tit">TAL Earned</p>
                <div>
                  <span className="num">-</span>
                  <span className="name">TAL</span>
                </div>
              </li>
              <li>
                <p className="tit">My Average APR</p>
                <div>
                  <span className="num">-</span>
                  <span className="name">%</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section_Top
