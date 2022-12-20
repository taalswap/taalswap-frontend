import axios from 'axios'
import { ChainId } from 'taalswap-sdk'
import store from 'state'
import { parseUnits } from 'ethers/lib/utils'
import getChainId from './getChainId'
import {DataResponse} from "./getLotteryRoundData";

export enum GAS_PRICE {
  default = '5',
  fast = '6',
  instant = '7',
  testnet = '10',
  klaytn = '250',    // change 25 -> 750 -> 250
  aurora = '0.07'
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
  klaytn: parseUnits(GAS_PRICE.klaytn, 'gwei').toString(),
  aurora: parseUnits(GAS_PRICE.aurora, 'gwei').toString(),
}

const getFastGasPrice = async () => {
  const result = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
  console.log('====>', result);
  return parseUnits(Math.floor(result.data.fastest / 10).toString(), 'gwei').toString();
}

/**
 * Function to return gasPrice outwith a react component
 */
const getGasPrice = async () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const state = store.getState()
  // const userGas = GAS_PRICE_GWEI.default
  const userGas = await getFastGasPrice();
  console.log(userGas)
  const currentChainId = getChainId()
  if (currentChainId === ChainId.KLAYTN || currentChainId === ChainId.BAOBAB) {
    return GAS_PRICE_GWEI.klaytn
  }
  if (currentChainId === ChainId.AURORAMAIN || currentChainId === ChainId.AURORATEST) {
    return GAS_PRICE_GWEI.aurora
  }

  return chainId === ChainId.MAINNET.toString() ? userGas : GAS_PRICE_GWEI.testnet
}

export default getGasPrice
