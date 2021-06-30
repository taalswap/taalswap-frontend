import tokens from './tokens'
import { PoolCategory, PoolConfig } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.taal,
    earningToken: tokens.taal,
    contractAddress: {
      1: '',
      3: '0x9301446C63462B3337AE4567aC13Cf6b0fB8eB60',
      4: '0x37d9a669338aD2f9e5ae553017CD03d423b03b59',
      97: '0x124bDb941DF9fC548D99E21F727357e9c287772E',     // MasterChef
      56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools
