import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'TAL',
    lpAddresses: {
      1: '0x90a4a420732907b3c38b11058f9aa02b3f4121df',
      3: '0x2ccdf53b17cce1c1c37bdd0ff0f8320e8cea34ed',
      4: '0xe18e460d38441027b6672363d68c9088f3d773bf',    // TaalToken
      97: '0xb01258e6fb20bde11dab2b65b2ffa197d725c91c',
      56: '',
    },
    token: tokens.syrup,
    quoteToken: tokens.weth,
  },
  {
    pid: 1,
    lpSymbol: 'TAL-ETH LP',
    lpAddresses: {
      1: '0x1caa17dbc6ba52b74b81b00158b7d34b579fce4f',
      3: '0x112ee1ffbaebc34e3131815f8f3772dc94ffb7f6',
      4: '0x98d2c51626bdac2a257dda01a60deb51cee2cee6',
      97: '0x74f8ee76936280e744c663b1d17b68e58a34cc29',
      56: '',
    },
    token: tokens.taal,
    quoteToken: tokens.weth,
  },
  {
    pid: 2,
    lpSymbol: 'USDC-ETH LP',
    lpAddresses: {
      1: '0x2d22e163ae5fd9c7b529e0864b69c204a895bc30',
      3: '0x65f1eb2bcb4b1d9a043366de732f0f7e055d2fab',
      4: '0x73b1501e0ab88dc81d95f8ed9aa67938afabda4b',
      97: '0xd2dafced17fc1679fbabfd02d10b001405dcd299',
      56: '',
    },
    token: tokens.usdc,
    quoteToken: tokens.weth,
  },
  {
    pid: 3,
    lpSymbol: 'USDT-ETH LP',
    lpAddresses: {
      1: '0x5fee0c80d26cc393e48f0774a56f0362e82b76e4',
      3: '0xaddb08d7f1c5c29243f85e7b400be6aacd3298f2',
      4: '0x1a7bab68f22eb8f84e8920b120bec8130efd6db8',
      97: '',
      56: '',
    },
    token: tokens.usdt,
    quoteToken: tokens.weth,
  },
  {
    pid: 4,
    lpSymbol: 'TAL-USDC LP',
    lpAddresses: {
      1: '0x648f94b68db9694ce3a34fd2dd7de5afe645bc52',
      3: '0x93edb60a035a06dfa3224f6393e41d269bfebb0e',
      4: '0x036126bda6190605fadd2028caa8dd7be13c045a',
      97: '',
      56: '',
    },
    token: tokens.taal,
    quoteToken: tokens.usdc,
  },
  {
    pid: 5,
    lpSymbol: 'TAL-USDT LP',
    lpAddresses: {
      1: '0x93036ed88960b74294aef83608281a47057b804c',
      3: '0x16036778bd039b0fb538b4326db2093fd6422f87',
      4: '0xa17d74b8ae149f08c8a1db09e4a55e158163fed1',
      97: '',
      56: '',
    },
    token: tokens.taal,
    quoteToken: tokens.usdt,
  },
  {
    pid: 6,
    lpSymbol: 'USDT-USDC LP',
    lpAddresses: {
      1: '0x73a0ac4498ac839c6a93d36967638759da2be952',
      3: '0xa066d6cb3c5ac43367a8fb548a78000d342492b0',
      4: '0xbac68c775b94b2999e8e2fdcda3ea5e57bbb9176',
      97: '',
      56: '',
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

export default farms
