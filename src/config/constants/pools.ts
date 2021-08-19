import tokens from './tokens'
import { PoolCategory, PoolConfig } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.taal,
    earningToken: tokens.taal,
    contractAddress: {
      1: '0x226b1eaf01a78396e190ebd9893b0d5a120aa678',
      3: '0x9c4e0e5f046edd7bc65523b87e15b2490bff3f87',
      4: '0x37d9a669338aD2f9e5ae553017CD03d423b03b59',
      8217: '',     // MasterChef
      1001: '0xab482a006d312d6796277d539fe87609065a2b93',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '40',    // TaalPerBlock 변경 시 변경 필요
    sortOrder: 1,
    isFinished: false,
  }
]

export default pools
