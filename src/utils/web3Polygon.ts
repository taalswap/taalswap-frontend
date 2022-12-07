import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

const nodesPolygon = 'https://polygon-rpc.com'
const nodesMumbai = 'https://rpc-mumbai.maticvigil.com'

const RPC_URL = process.env.REACT_APP_POLYGON_ID === '137' ? nodesPolygon : nodesMumbai
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const web3PolygonNoAccount = new Web3(httpProvider)

const getWeb3PolygonNoAccount = () => {
    return web3PolygonNoAccount
}

export { getWeb3PolygonNoAccount }
export default web3PolygonNoAccount
