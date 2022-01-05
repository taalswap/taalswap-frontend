import React from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from 'taalswap-uikit'
import BigNumber from 'bignumber.js'
import { useEagerConnect, useInactiveListenerNew } from 'hooks/useEagerConnect'
import { usePollCoreFarmData, useFetchProfile, usePollBlockNumber } from 'state/hooks'
import Swap from 'views/Swap'
import XSwap from 'views/XSwap'
import Pool from 'views/Pool'
import AddLiquidity from 'views/AddLiquidity'
import RemoveLiquidity from 'views/RemoveLiquidity'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
// import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
// import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import Pools from './views/Pools'
import Farms from './views/Farms'
import history from './routerHistory'
import LandingPageView from './pages/LandingPageView'
import NotFound from './views/NotFound'

import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './views/AddLiquidity/redirects'
import { RedirectOldRemoveLiquidityPathStructure } from './views/RemoveLiquidity/redirects'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  // When turn off Metamask listener just comment out the below line
  useInactiveListenerNew(false)
  useFetchProfile()
  usePollCoreFarmData()

  return (
    <>
      <Router history={history}>
        <ResetCSS />
        <GlobalStyle />
        <Switch>
          <Route exact strict path="/" component={LandingPageView} />
          <Menu>
            {/* <SuspenseWithChunkError fallback={<PageLoader />}> */}
            <Switch>
              {process.env.REACT_APP_SITE_STOP === 'true' ? (
                <>
                  <Route path="/farms" exact>
                    <Redirect to="/" />
                  </Route>
                  <Route path="/staking" exact>
                    <Redirect to="/" />
                  </Route>
                  <Route path="/farms/:isAdmin">
                    <Farms />
                  </Route>
                  <Route path="/staking/:isAdmin">
                    <Pools />
                  </Route>
                </>
              ) : (
                <>
                  <Route exact strict path="/swap" component={Swap} />
                  <Route exact strict path="/xswap" component={XSwap} />
                  <Route exact strict path="/liquidity" component={Pool} />
                  <Route exact path="/add" component={AddLiquidity} />
                  <Route path="/farms" component={Farms} />
                  <Route path="/staking" component={Pools} />

                  {/* Redirection: These old routes are still used in the code base */}
                  <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                  <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/add/:chainId/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                </>
              )}

              <Route component={NotFound} />
            </Switch>
            {/* </SuspenseWithChunkError> */}
          </Menu>
          <EasterEgg iterations={2} />
          <ToastListener />
        </Switch>
      </Router>
    </>
  )
}

export default React.memo(App)
