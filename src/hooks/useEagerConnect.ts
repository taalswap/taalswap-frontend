import { useEffect } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from 'taalswap-uikit'
import useAuth from 'hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import { injected } from 'utils/web3React'
import getChainId from '../utils/getChainId'
import {setupNetwork} from "../utils/wallet";
import useToast from "./useToast";
import {useTranslation} from "../contexts/Localization";

const ethChainId = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1', 10);
const klayChainId = parseInt(process.env.REACT_APP_KLAYTN_ID ?? '8217', 10);

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

export const useEagerConnect = () => {
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

      const chainIdConfig = getChainId()
      window.localStorage.setItem('chainId', chainIdConfig.toString())

      login(connectorId)
    }
  }, [login, chainId])
}

export const useInactiveListenerNew = (suppress = false) => {
  const { active, error, activate } = useWeb3React() // specifically using useWeb3React because of what this hook does
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    const { ethereum } = window as WindowChain

    // if (ethereum && ethereum.on && !active && !error && !suppress) {
    if (ethereum && ethereum.on) {
      const handleChainChanged = async (chainId) => {
        // TODO: Handle wrong network injected
        if (parseInt(chainId, 16) === ethChainId || parseInt(chainId, 16) === klayChainId) {
          // eat errors
          const curChainId = parseInt(chainId, 16).toString()
          const prevChainId = window.localStorage.getItem('chainId')
          window.localStorage.setItem('chainId', curChainId)
          window.localStorage.setItem('prevChainId', prevChainId ?? curChainId)
          // window.localStorage.setItem('refresh', 'true')
          // Todo page reload
          // window.location.reload()

          activate(injected, undefined, true).catch((e) => {
            console.error('Failed to activate after chain changed', e)
          })
        } else {
          // TODO: 잘못된 네트워크가 선택되었다는 에러 메시지 창 띄우기
          toastError(t('Error'), t('You are on the wrong network.'))
          const changeNet = await setupNetwork(ethChainId)

        }
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch((e) => {
            console.error('Failed to activate after accounts changed', e)
          })
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, suppress, activate, toastError,t])
}

// export default useEagerConnect
