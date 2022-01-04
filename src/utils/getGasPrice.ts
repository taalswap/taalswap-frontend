import { ChainId } from 'taalswap-sdk'
import store from 'state'
import { parseUnits } from 'ethers/lib/utils'

export enum GAS_PRICE {
  default = '5',
  fast = '6',
  instant = '7',
  testnet = '10',
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
}

/**
 * Function to return gasPrice outwith a react component
 */
const getGasPrice = (): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const state = store.getState()
  const userGas = GAS_PRICE_GWEI.default
  return chainId === ChainId.MAINNET.toString() ? userGas : GAS_PRICE_GWEI.testnet
}

export default getGasPrice
