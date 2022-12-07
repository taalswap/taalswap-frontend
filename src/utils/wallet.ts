// Set of helper functions to facilitate wallet setup
import { ChainId } from 'taalswap-sdk'
import { BASE_BSC_SCAN_URL, SCAN_URL, NETWORK_NAME } from 'config'
import { UserRejectedRequestError } from '@web3-react/injected-connector'
import {chain} from "lodash";

const recoverChainId = () => {
  const prevChainId = window.localStorage.getItem('prevChainId')
  window.localStorage.setItem('chainId', prevChainId)
}

export const addNetwork = async (chainId: number) => {
  const provider = (window as WindowChain).ethereum
  if (provider && provider.request) {
    try {
      if (chainId === ChainId.MAINNET || chainId === ChainId.ROPSTEN || chainId === ChainId.RINKEBY) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: NETWORK_NAME[chainId],
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: [`${process.env.REACT_APP_NETWORK_URL}`],
              blockExplorerUrls: [`${SCAN_URL[chainId]}/`]
            },
          ],
        })
      } else if (chainId === ChainId.BAOBAB) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Klaytn Baobab',
              nativeCurrency: {
                name: 'klay',
                symbol: 'KLAY',
                decimals: 18,
              },
              rpcUrls: ['https://api.baobab.klaytn.net:8651'],
              blockExplorerUrls: ['https://baobab.scope.klaytn.com/']
            },
          ],
        });
      } else if (chainId === ChainId.KLAYTN) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Klaytn Mainnet',
              nativeCurrency: {
                name: 'KLAY',
                symbol: 'KLAY',
                decimals: 18,
              },
              rpcUrls: ['https://public-en.kaikas.io/v1/cypress'],
              blockExplorerUrls: ['https://scope.klaytn.com/']
            },
          ],
        });
      } else if (chainId === ChainId.BSCMAIN) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Binance Mainnet',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: ['https://bsc-dataseed.binance.org'],
              blockExplorerUrls: ['https://bscscan.com/']
            },
          ],
        });
      } else if (chainId === ChainId.BSCTEST) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Binance Testnet',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
              blockExplorerUrls: ['https://testnet.bscscan.com/']
            },
          ],
        });
      } else if (chainId === ChainId.POLYGON) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: ['https://polygon-rpc.com'],
              blockExplorerUrls: ['https://polygonscan.com/']
            },
          ],
        });
      } else if (chainId === ChainId.MUMBAI) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Polygon Testnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
              blockExplorerUrls: ['https://mumbai.polygonscan.com/']
            },
          ],
        });
      }
    } catch (addError) {
      // handle "add" error
      console.error(addError)
      switch (addError.code) {
        case -32602:
          return true;
          break;
        default:
          break;
      }
      return false;
    }
  } else {
    console.error("Can't setup the ethereum mainnet on metamask because window.ethereum is undefined")
    return false
  }
  return true
}

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (chainId: number) => {
  const provider = (window as WindowChain).ethereum
  let result

  result = await addNetwork(chainId)   // Talken

  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        result = await addNetwork(chainId)
      } else if (error.code === 4001 || error instanceof UserRejectedRequestError) {
        recoverChainId()
        return false
      }
    }
  } else {
    console.error("Can't setup the ethereum mainnet on metamask because window.ethereum is undefined")
    return false
  }
  return result
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
) => {
  const tokenAdded = await (window as WindowChain).ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  })

  return tokenAdded
}
