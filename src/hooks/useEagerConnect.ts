import { useEffect } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from 'taalswap-uikit'
import useAuth from 'hooks/useAuth'
import { useWeb3React } from '@web3-react/core'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    }),
  )

const useEagerConnect = () => {
  const { login } = useAuth()
  const { chainId } = useWeb3React()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

    if (connectorId) {
      const isConnectorBinanceChain = connectorId === ConnectorNames.BSC
      const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')

      // Currently BSC extension doesn't always inject in time.
      // We must check to see if it exists, and if not, wait for it before proceeding.
      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        _binanceChainListener().then(() => login(connectorId))

        return
      }

      login(connectorId)
      window.localStorage.setItem("chainId", String(chainId))
    }
  }, [login, chainId])
}

export default useEagerConnect
