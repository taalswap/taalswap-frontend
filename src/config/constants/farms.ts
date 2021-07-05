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
      3: '0x1e94361329257647669dde7dc8c869624aa424ea',
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
      3: '0x8ecebf4b71f6143e57c2144a273b023e8b647882',
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
      3: '0x61abc4ad785ee3952d220e2ba8a8fa26e83d4e05',
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
      3: '0x0ebd0874149762bc2f3f2d1113446ed93f47d40c',
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
      3: '0xd4d839ba02e7f1c131f38c51d04404ef0cc08282',
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
      3: '0x9117ae3e02b4c2e6d37faa6dd8fecb4b2ca49ef9',
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
      3: '0x25ea31604eace1b21c0c578fedb25de320d350de',
      4: '0xbac68c775b94b2999e8e2fdcda3ea5e57bbb9176',
      97: '',
      56: '',
    },
    token: tokens.usdt,
    quoteToken: tokens.usdc,
  },
  {
    pid: 7,
    lpSymbol: 'TALK-USDT LP',
    lpAddresses: {
      3: '0x02c2ce771fc95d8ec1caead6ed16b03b256bc164',
      4: '',
      97: '',
      56: '',
    },
    token: tokens.talk,
    quoteToken: tokens.usdt,
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
