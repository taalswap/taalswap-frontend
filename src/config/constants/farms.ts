import tokens from './tokens'
import { FarmConfig } from './types'

const farmsConfig: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'TAL',
    lpAddresses: {
      1: '0x7e6bd46f4ddc58370c0435d496ef7fcc5fe1751d',
      3: '0xebd87e7c13b3aca572665140b6b12349112f0ce0',
      4: '0xe18e460d38441027b6672363d68c9088f3d773bf',    // TaalToken
    },
    token: tokens.syrup,
    quoteToken: tokens.weth,
  },
  {
    pid: 1,
    lpSymbol: 'TAL-ETH LP',
    lpAddresses: {
      1: '0x5adda6b4e4966f1d8d0498c97aab54829999d65e',
      3: '0xd849f4f9fd23708f849cf2d7f9f2069a24158793',
      4: '0x98d2c51626bdac2a257dda01a60deb51cee2cee6',
    },
    token: tokens.taal,
    quoteToken: tokens.weth,
  },
  {
    pid: 2,
    lpSymbol: 'USDC-ETH LP',
    lpAddresses: {
      1: '0x2d22e163ae5fd9c7b529e0864b69c204a895bc30',
      3: '0xc34fd134bdd68ad96e8bb80bb85cf5f51e6ceb1f',
      4: '0x73b1501e0ab88dc81d95f8ed9aa67938afabda4b',
    },
    token: tokens.usdc,
    quoteToken: tokens.weth,
  },
  {
    pid: 3,
    lpSymbol: 'USDT-ETH LP',
    lpAddresses: {
      1: '0x5fee0c80d26cc393e48f0774a56f0362e82b76e4',
      3: '0x8c84586ce82795f592d41ae4ee5c32932068a992',
      4: '0x1a7bab68f22eb8f84e8920b120bec8130efd6db8',
    },
    token: tokens.usdt,
    quoteToken: tokens.weth,
  },
  {
    pid: 4,
    lpSymbol: 'TAL-USDC LP',
    lpAddresses: {
      1: '0x0eff6a9fbcebec4257e44115b3048bd4f8215eb7',
      3: '0x588492dc4c48d664975d0ed691bdebf9b71d9ccd',
      4: '0x036126bda6190605fadd2028caa8dd7be13c045a',
    },
    token: tokens.taal,
    quoteToken: tokens.usdc,
  },
  {
    pid: 5,
    lpSymbol: 'TAL-USDT LP',
    lpAddresses: {
      1: '0xdfea645431b312aa0bbe41f23a31fac4f36517af',
      3: '0x0951dbf1f71e26e1c480a27ed5593618e1f059bd',
      4: '0xa17d74b8ae149f08c8a1db09e4a55e158163fed1',
    },
    token: tokens.taal,
    quoteToken: tokens.usdt,
  },
  {
    pid: 6,
    lpSymbol: 'USDT-USDC LP',
    lpAddresses: {
      1: '0x73a0ac4498ac839c6a93d36967638759da2be952',
      3: '0xc002144ff412f745350f4243a6c0b88a26ce3edc',
      4: '0xbac68c775b94b2999e8e2fdcda3ea5e57bbb9176',
    },
    token: tokens.usdt,
    quoteToken: tokens.usdc,
  },
  // // {
  // //   pid: 13,
  // //   lpSymbol: 'TALK-ETH LP',
  // //   lpAddresses: {
  // //     97: '0x6e1ca435b981e0478099f616e61e878dfc1629b3',
  // //     56: '',
  // //   },
  // //   token: tokens.talken,
  // //   quoteToken: tokens.weth,
  // // },
  // // {
  // //   pid: 12,
  // //   lpSymbol: 'TAL-ETH LP',
  // //   lpAddresses: {
  // //     97: '0x8029d53f77e11125e620254e65622ad81400e300',
  // //     56: '',
  // //   },
  // //   token: tokens.taal,
  // //   quoteToken: tokens.weth,
  // // },
  // // {
  // //   pid: 2,
  // //   lpSymbol: 'USDT-ETH LP',
  // //   lpAddresses: {
  // //     97: '0xd2dafced17fc1679fbabfd02d10b001405dcd299',
  // //     56: '',
  // //   },
  // //   token: tokens.busd,
  // //   quoteToken: tokens.weth,
  // // },
  // // {
  // //   pid: 1,
  // //   lpSymbol: 'TAL-ETH LP',
  // //   lpAddresses: {
  // //     97: '0xe5582d873e265a1dd4202f20a4c5022cee215f39',
  // //     56: '',
  // //   },
  // //   token: tokens.cake,
  // //   quoteToken: tokens.weth,
  // // },
  // // {
  // //   pid: 10,
  // //   lpSymbol: 'TALK-TAL LP',
  // //   lpAddresses: {
  // //     97: '0xd0a583974af3d09b087b5dc7406fece1cb195aac',
  // //     56: '',
  // //   },
  // //   token: tokens.talken,
  // //   quoteToken: tokens.taal,
  // // },
]

const farmsConfigKlaytn: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'KTAL',
    lpAddresses: {
      8217: '',   // TaalToken
      1001: '0xe8e2f5117297f3a330fd06fac88928b63bb84b09',
    },
    token: tokens.syrup,
    quoteToken: tokens.wklay,
  },
  {
    pid: 1,
    lpSymbol: 'KTAL-KLAY LP',
    lpAddresses: {
      8217: '',
      1001: '0x87fe2963f988dcf8ce8d4b4e6b8596749e0ff890',
    },
    token: tokens.ktaal,
    quoteToken: tokens.wklay,
  },
  {
    pid: 2,
    lpSymbol: 'KLAY-KDAI LP',
    lpAddresses: {
      8217: '',
      1001: '0x16ed834606a8ccf4262fb13a59871602290fedf4'
    },
    token: tokens.kdai,
    quoteToken: tokens.wklay,
  },
  {
    pid: 3,
    lpSymbol: 'KLAY-KUSDT LP',
    lpAddresses: {
      8217: '',
      1001: '0x0a8bb177be98f92cd899382d3d84a8120c4af8c5',
    },
    token: tokens.kusdt,
    quoteToken: tokens.wklay,
  },
  // {
  //   pid: 4,
  //   lpSymbol: 'KTAL-KDAI LP',
  //   lpAddresses: {
  //     8217: '',
  //     1001: '',
  //   },
  //   token: tokens.ktaal,
  //   quoteToken: tokens.kdai,
  // },
  // {
  //   pid: 5,
  //   lpSymbol: 'KTAL-KUSDT LP',
  //   lpAddresses: {
  //     8217: '',
  //     1001: '',
  //   },
  //   token: tokens.ktaal,
  //   quoteToken: tokens.kusdt,
  // },
  // {
  //   pid: 6,
  //   lpSymbol: 'KUSDT-DAI LP',
  //   lpAddresses: {
  //     8217: '',
  //     1001: '',
  //   },
  //   token: tokens.kusdt,
  //   quoteToken: tokens.kdai,
  // },
]

// export default farms
export { farmsConfig, farmsConfigKlaytn }
