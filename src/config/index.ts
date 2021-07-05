import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 15   //  TODO : Mainnet 블록타임으로 교체해야 함.

// TAL_PER_BLOCK details
// 40 TAL is minted per block
// 20 TAL per block is sent to Burn pool (A farm just for burning cake)
// 10 TAL per block goes to TAL syrup pool
// 10 TAL per block goes to Yield farms and lottery
// TAL_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// TAL/Block in src/views/Home/components/CakeStats.tsx = 20 (40 - Amount sent to burn pool)

export const TAL_PER_BLOCK = new BigNumber(2.7)  // TODO: 스마트컨드랙 내 데이터와 일치 ?
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const TAL_PER_YEAR = TAL_PER_BLOCK.times(BLOCKS_PER_YEAR)
// export const BASE_URL = 'https://pancakeswap.finance'
// export const BASE_EXCHANGE_URL = 'https://exchange.pancakeswap.finance'
export const BASE_URL = 'http://localhost:3001'
export const BASE_EXCHANGE_URL = 'http://localhost:3000'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/liquidity`
// export const BASE_BSC_SCAN_URL = 'https://bscscan.com'
// export const BASE_BSC_SCAN_URL = 'https://testnet.bscscan.com'
export const BASE_BSC_SCAN_URL = 'https://ropsten.etherscan.io'
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 3000000
export const DEFAULT_GAS_PRICE = 5
