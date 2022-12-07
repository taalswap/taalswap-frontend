import React from 'react'
import useAuth from 'hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { TopBar } from 'taalswap-uikit'
import XSwap from 'pages/XSwap'
import SectionTop from './Section_Top'
import SectionBottom from './Section_Bottom'
import Footer from './Footer'
import SubSection from './Sub_Section'
import AllPairs from './AllPairs'
import './App.css'
import AllTokens from './AllTokens'
import KlayAllTokens from './KlayAllTokens'
import KlayAllPairs from './KlayAllPairs'
import RecentTransactionETH from './RecentTransactionETH'
import RecentTransactionKlay from './RecentTransactionKlay'

const LandingPageView = () => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { currentLanguage, setLanguage } = useTranslation()
  return (
    <div className="wrap">
      {/* <Teaser /> */}
      <TopBar
        account={account}
        login={login}
        logout={logout}
        langs={languageList}
        setLang={setLanguage}
        currentLang={currentLanguage.code}
        isDark={isDark}
        toggleTheme={toggleTheme}
        blockchain={process.env.REACT_APP_CHAIN_ID}
        klaytn={process.env.REACT_APP_KLAYTN_ID}
        binance={process.env.REACT_APP_BINANCE_ID}
        polygon={process.env.REACT_APP_POLYGON_ID}
      />
      <SectionTop />
      <XSwap />
      <div className="areafarms">
        <RecentTransactionETH />
        <RecentTransactionKlay />
      </div>
      <div className="areafarms">
        <AllTokens />
        <AllPairs />
      </div>
      <div className="areafarms">
        <KlayAllTokens />
        <KlayAllPairs />
      </div>
      <SectionBottom />
      <SubSection />
      <Footer />
    </div>
  )
}

export default LandingPageView
