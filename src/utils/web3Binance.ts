import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

const nodesBscmain = 'https://bsc-dataseed.binance.org'
const nodesBsctest = 'https://data-seed-prebsc-1-s1.binance.org:8545'

const RPC_URL = process.env.REACT_APP_BINANCE_ID === '97' ? nodesBsctest : nodesBscmain
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const web3BinanceNoAccount = new Web3(httpProvider)

const getWeb3BinanceNoAccount = () => {
    return web3BinanceNoAccount
}

export { getWeb3BinanceNoAccount }
export default web3BinanceNoAccount
