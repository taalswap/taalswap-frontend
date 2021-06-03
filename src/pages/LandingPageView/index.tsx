import React from 'react'
import styled from 'styled-components'
// import TopBar from './TopBar'
import useAuth from 'hooks/useAuth'
import { useWeb3React } from '@web3-react/core'

import { TopBar } from 'taalswap-uikit'
import SectionTop from './Section_Top'
import SectionBottom from './Section_Bottom'
import Footer from './Footer'
import './App.css'

const AppWrapper = styled.div`
  height: '100%';
  width: '100%';
`

const LandingPageView = () => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()

  return (
    <div className="wrap">
      <TopBar account={account} login={login} logout={logout} />
      <SectionTop />
      <SectionBottom />
      <Footer />
    </div>
  )
}

export default LandingPageView
