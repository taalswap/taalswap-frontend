import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

const nodesAuroraMainnet = 'https://mainnet.aurora.dev'
const nodesAuroraTestnet = 'https://testnet.aurora.dev'

const RPC_URL = process.env.REACT_APP_AURORA_ID === '1313161554' ? nodesAuroraMainnet : nodesAuroraTestnet
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const web3AuroraNoAccount = new Web3(httpProvider)

const getWeb3AuroraNoAccount = () => {
    return web3AuroraNoAccount
}

export { getWeb3AuroraNoAccount }
export default web3AuroraNoAccount
