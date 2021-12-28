import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from './Providers'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import ApplicationUpdater from './state/application/updater'
import MulticallUpdaterXswap from './state/multicall/updaterX'
import ToastListener from './components/ToastListener';

function Updaters() {
    return (
        <>
            <ListsUpdater />
            <ApplicationUpdater />
            <TransactionUpdater />
            <MulticallUpdaterXswap />
            <MulticallUpdater />
            <ToastListener />
        </>
    )
}

ReactDOM.render(
  <React.StrictMode>
    <Providers>
        <Updaters />
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
