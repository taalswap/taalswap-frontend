import random from 'lodash/random'
import { ChainId } from 'taalswap-sdk'
import getChainId from './getChainId'

// Array of available nodes to connect to
export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]
export const nodesCypress = 'https://public-en.kaikas.io/v1/cypress'
export const nodesBaobab = 'https://api.baobab.klaytn.net:8651'
export const nodesBscmain = 'https://bsc-dataseed.binance.org'
export const nodesBsctest = 'https://data-seed-prebsc-1-s1.binance.org:8545'
export const nodesMumbai = 'https://rpc-mumbai.maticvigil.com'
export const nodesPolygon = 'https://polygon-rpc.com'
export const nodesAuroraTest = 'https://testnet.aurora.dev'
export const nodesAuroraMain = 'https://mainnet.aurora.dev'

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  const chainId = getChainId()
  switch (chainId) {
    case ChainId.MAINNET:
      return nodes[randomIndex]
      break
    case ChainId.KLAYTN:
      return nodesCypress
      break
    case ChainId.BAOBAB:
      return nodesBaobab
      break
    case ChainId.BSCMAIN:
      return nodesBscmain
      break
    case ChainId.BSCTEST:
      return nodesBsctest
      break
    case ChainId.POLYGON:
      return nodesPolygon
      break
    case ChainId.MUMBAI:
      return nodesMumbai
      break
    case ChainId.AURORAMAIN:
      return nodesAuroraMain
      break
    case ChainId.AURORATEST:
      return nodesAuroraTest
      break
    default:
      return nodes[randomIndex]
      break
  }
  // return nodes[randomIndex]
}

export const getSelectedNodeUrl = (chainId) => {
  const randomIndex = random(0, nodes.length - 1)
  switch (parseInt(chainId)) {
    case ChainId.MAINNET:
      return nodes[randomIndex]
      break
    case ChainId.KLAYTN:
      return nodesCypress
      break
    case ChainId.BAOBAB:
      return nodesBaobab
      break
    case ChainId.BSCMAIN:
      return nodesBscmain
      break
    case ChainId.BSCTEST:
      return nodesBsctest
      break
    case ChainId.POLYGON:
      return nodesPolygon
      break
    case ChainId.MUMBAI:
      return nodesMumbai
      break
    case ChainId.AURORAMAIN:
      return nodesAuroraMain
      break
    case ChainId.AURORATEST:
      return nodesAuroraTest
      break
    default:
      return nodes[randomIndex]
      break
  }
  // return nodes[randomIndex]
}

export default getNodeUrl
