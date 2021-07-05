import tokens from './tokens'
import { PoolCategory, PoolConfig } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.taal,
    earningToken: tokens.taal,
    contractAddress: {
      1: '',
      3: '0xc893bc766dfd3597e55e90cc3cd3d41e297b6c16',
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
  {
    sousId: 2,
    stakingToken: tokens.taal,
    earningToken: tokens.talk,
    contractAddress: {
      1: '',
      3: '0xb61dda68ee9861901badb761790951a58d877754',   // SmartChefFactory::deployPool() --> SmartChefInitializable Address
      4: '',
      97: '',
      56: '0x2b3974dda76b2d408b7d680a27fbb0393e3cf0e1',   // SmartChefInitializable
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 999,
    tokenPerBlock: '0.3472',
  },
]

export default pools
