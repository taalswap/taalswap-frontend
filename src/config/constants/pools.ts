import tokens from './tokens'
import { PoolCategory, PoolConfig } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.taal,
    earningToken: tokens.taal,
    contractAddress: {
      1: '0xc2a17a9cb634bbb28f07d395c34ca368fe680abc',
      3: '0x9c4e0e5f046edd7bc65523b87e15b2490bff3f87',
      4: '0x37d9a669338aD2f9e5ae553017CD03d423b03b59',
      97: '0x124bDb941DF9fC548D99E21F727357e9c287772E',     // MasterChef
      56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '40',
    sortOrder: 1,
    isFinished: false,
  }
]

export default pools
