import { ChainId } from 'taalswap-sdk'
import getChainId from './getChainId'

const getKlaytnApiUrl = () => {
  const chainId = getChainId()
  let apiUrl

  switch(chainId) {
    case ChainId.BAOBAB:
      apiUrl = 'https://api.taalswap.info/baobab/api'
      break
    case ChainId.KLAYTN:
    default:
      apiUrl = 'https://api.taalswap.info/cypress/api'
      break
  }

  return apiUrl
}

export default getKlaytnApiUrl
