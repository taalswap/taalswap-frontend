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
      3: '0x78a24accf5f557b004c1313b2cad2e85c345d971',
      4: '0xe18e460d38441027b6672363d68c9088f3d773bf',
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
      3: '0x0f8c6983fed6617dc72874b17c4849e765bafc23',
      4: '0x98d2c51626bdac2a257dda01a60deb51cee2cee6',
      97: '0x74f8ee76936280e744c663b1d17b68e58a34cc29',
      56: '',
    },
    token: tokens.taal,
    quoteToken: tokens.weth,
  },
  {
    pid: 2,
    lpSymbol: 'USDT-ETH LP',    // <-- USDC-ETH 로 변경
    lpAddresses: {
      3: '0xd3ebd345775b0491e8842fdbad71256f5b15bf8a',
      4: '0x73b1501e0ab88dc81d95f8ed9aa67938afabda4b',
      97: '0xd2dafced17fc1679fbabfd02d10b001405dcd299',
      56: '',
    },
    token: tokens.usdt,         // <-- usdc 로 변경
    quoteToken: tokens.weth,
  },
  {
    pid: 3,
    lpSymbol: 'ETH-USDC LP',    // <-- ETH-USDT 로 변경
    lpAddresses: {
      3: '0x1e5aefcbf561cade978cf7c87762e97e772090c5',
      4: '0x1a7bab68f22eb8f84e8920b120bec8130efd6db8',
      97: '',
      56: '',
    },
    token: tokens.weth,
    quoteToken: tokens.usdc,    // <-- usdt 로 변경
  },
  {
    pid: 4,
    lpSymbol: 'TAL-USDT LP',
    lpAddresses: {
      3: '0x4eeb7094e34c8272d6c3d813bb7d18ced7874ab9',
      4: '0x036126bda6190605fadd2028caa8dd7be13c045a',
      97: '',
      56: '',
    },
    token: tokens.taal,
    quoteToken: tokens.usdt,
  },
  {
    pid: 5,
    lpSymbol: 'TAL-USDC LP',
    lpAddresses: {
      3: '0x43dee61dec9abdbfe4a8a1f38182f7c4d2931228',
      4: '0xa17d74b8ae149f08c8a1db09e4a55e158163fed1',
      97: '',
      56: '',
    },
    token: tokens.taal,
    quoteToken: tokens.usdc,
  },
  {
    pid: 6,
    lpSymbol: 'USDC-USDT LP',
    lpAddresses: {
      3: '0xda51cc4b05bbec589ce7114061f4346bfc1c2a07',
      4: '0xbac68c775b94b2999e8e2fdcda3ea5e57bbb9176',
      97: '',
      56: '',
    },
    token: tokens.usdc,
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
