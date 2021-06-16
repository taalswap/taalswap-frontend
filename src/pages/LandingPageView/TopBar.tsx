import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Target } from 'react-feather'
import { Link } from 'taalswap-uikit'
import Topmenu from './topmenu'
import logo_img from './images/TAAL_Logo_A_bg.png'

const TopBar = () => {
  const { account } = useWeb3React()

  console.log(account)
  return (
    <div className="tabbar_wrap">
      <div>
        <Link href="/">
          <img src={logo_img} alt="logo_img" className="top_logo" />
        </Link>
      </div>
      <div className="top_menu">
        <div>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none',fontSize:"14px" }}>
            Home
          </Link>
        </div>
        <div style={{ marginLeft: '30px' }}>
          <Link href="http://localhost:3000/#/swap" style={{ color: '#fff', textDecoration: 'none',fontSize:"14px" }}>
            Swap
          </Link>
        </div>
        <div style={{ marginLeft: '30px' }}>
          <Link href="http://localhost:3000/#/pool" style={{ color: '#fff', textDecoration: 'none',fontSize:"14px" }}>
            Liquidity
          </Link>
        </div>
        <div style={{ marginLeft: '30px' }}>
          <Link href="/farms" style={{ color: '#fff', textDecoration: 'none',fontSize:"14px" }}>
            Farms
          </Link>
        </div>
        <div style={{ marginLeft: '30px' }}>
          <Link href="/pools" style={{ color: '#fff', textDecoration: 'none',fontSize:"14px"}}>
            Staking
          </Link>
        </div>
        <div style={{ marginLeft: '30px' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none',fontSize:"14px" }}>
            IDO
          </Link>
        </div>
        <div>
          <input type="button" value="Connect Wallet" className="connect_btn" />
        </div>
      </div>
      <div className="mobile_menu" style={{ cursor: 'pointer' }}>
        <Topmenu />
      </div>
    </div>
  )
}

export default TopBar
