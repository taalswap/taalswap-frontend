import React from 'react'
// import TopBar from './TopBar'
import useAuth from 'hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { TopBar } from 'taalswap-uikit'
import SectionTop from './Section_Top'
import SectionBottom from './Section_Bottom'
import Footer from './Footer'
import './App.css'

const LandingPageView = () => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { currentLanguage, setLanguage } = useTranslation()
  return (
    <div className="wrap">
      <TopBar
        account={account}
        login={login}
        logout={logout}
        langs={languageList}
        setLang={setLanguage}
        currentLang={currentLanguage.code}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <SectionTop />
      <SectionBottom />
      <Footer />
    </div>
  )
}

export default LandingPageView
