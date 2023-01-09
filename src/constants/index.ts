import { ChainId, JSBI, Percent, Token, WETH } from 'taalswap-sdk'

// export const ROUTER_ADDRESS = '0x913cf96b805221e1631de21cd22b7a93099c00b7';
export const ROUTER_ADDRESS = {
  [ChainId.MAINNET]: '0x913cf96b805221e1631de21cd22b7a93099c00b7',
  [ChainId.ROPSTEN]: '0x43807616f5c7d51a9c83f63e6740f76349669800',
  [ChainId.RINKEBY]: '0x43807616f5C7d51a9c83F63e6740f76349669800',
  [ChainId.KLAYTN]: '0x913cf96b805221e1631de21cd22b7a93099c00b7',
  [ChainId.BAOBAB]: '0xf532e0589d477db6d36591612b0ee42d038019c2',
  [ChainId.BSCTEST]: '0x91559fec263307afe6afb917ce6d530a16222a0e',
  [ChainId.BSCMAIN]: '',
  [ChainId.MUMBAI]: '0x4b3ca2c094b69b350e14223c3d66861a8be94910',
  [ChainId.POLYGON]: '',
  [ChainId.AURORATEST]: '0x6a05753889799f253565a35f5cdd6dc014694d4a',
  [ChainId.AURORAMAIN]: ''
}

export const BRIDGE_ADDRESS = {
  [ChainId.MAINNET]: '0x1010aacf0afb069297085571a161b911fe6f0f55',
  [ChainId.ROPSTEN]: '0x16e3ed1d321c35cb711fa35b6e557e2aa3647cc9',
  [ChainId.RINKEBY]: '0x1010aacf0afb069297085571a161b911fe6f0f55',
  [ChainId.KLAYTN]: '0xd5849636c092a1ad3a852750d84868a2ad18d85b',
  [ChainId.BAOBAB]: '0xc7783434a22e6ee06404e0ea73b032f414523c81',
  [ChainId.BSCTEST]: '0x909b1752d3421000db82ebff9da43642a5bc080e',
  [ChainId.BSCMAIN]: '',
  [ChainId.MUMBAI]: '0x7874ec641821108b628b4ecb2df2be7a856aa85d',
  [ChainId.POLYGON]: '',
  [ChainId.AURORATEST]: '0xa74caf50aefc9290f25fc0a680885eac3cc9831f',
  [ChainId.AURORAMAIN]: ''
}

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

// export const TAL = new Token(
//   ChainId.MAINNET,
//   '0x7e6bd46f4ddc58370c0435d496ef7fcc5fe1751d',
//   18,
//   'TAL',
//   'TaalSwap Token'
// );
export const TAL = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x7e6bd46f4ddc58370c0435d496ef7fcc5fe1751d',
    18,
    'TAL',
    'TaalSwap Token',
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0xebd87e7c13b3aca572665140b6b12349112f0ce0',
    18,
    'TAL',
    'TaalSwap Token',
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0x92ecacfc94588aa99fba837be1a98738290e3252',
    18,
    'TAL',
    'TaalSwap Token',
  ),
  [ChainId.KLAYTN]: new Token(
    ChainId.KLAYTN,
    '0x90a4a420732907b3c38b11058f9aa02b3f4121df',
    18,
    'TAL',
    'TaalSwap Token',
  ),
  [ChainId.BAOBAB]: new Token(
    ChainId.BAOBAB,
    '0x6c27d9f6c4067212797794cd931596c2917f7bf7',
    18,
    'TAL',
    'TaalSwap Token',
  ),
  [ChainId.BSCTEST]: new Token(
      ChainId.BSCTEST,
      '0x8318ea1dbba627731ac55bf47e57a22952bd537d',
      18,
      'TAL',
      'TaalSwap Token',
  ),
  [ChainId.BSCMAIN]: new Token(
      ChainId.BSCMAIN,
      '0x8318ea1dbba627731ac55bf47e57a22952bd537d',
      18,
      'TAL',
      'TaalSwap Token',
  ),
  [ChainId.MUMBAI]: new Token(
      ChainId.MUMBAI,
      '0x42a0931B5623Bbb7Db7F3115b1DD168cbFF8C6ee',
      18,
      'TAL',
      'TaalSwap Token',
  ),
  [ChainId.POLYGON]: new Token(
      ChainId.POLYGON,
      '0x42a0931B5623Bbb7Db7F3115b1DD168cbFF8C6ee',
      18,
      'TAL',
      'TaalSwap Token',
  ),
  [ChainId.AURORATEST]: new Token(
      ChainId.AURORATEST,
      '0x67fd18cc70a7f8c26508c59c906b39b2a079866d',
      18,
      'TAL',
      'TaalSwap Token',
  ),
  [ChainId.AURORAMAIN]: new Token(
      ChainId.AURORAMAIN,
      '0x67fd18cc70a7f8c26508c59c906b39b2a079866d',
      18,
      'TAL',
      'TaalSwap Token',
  ),
}

export const TAL_ADDRESS = {
  [ChainId.MAINNET]: '0x7e6bd46f4ddc58370c0435d496ef7fcc5fe1751d',
  [ChainId.ROPSTEN]: '0xebd87e7c13b3aca572665140b6b12349112f0ce0',
  [ChainId.RINKEBY]: '0x92ecacfc94588aa99fba837be1a98738290e3252',
  [ChainId.KLAYTN]: '0x90a4a420732907b3c38b11058f9aa02b3f4121df',
  [ChainId.BAOBAB]: '0x6c27d9f6c4067212797794cd931596c2917f7bf7',
  [ChainId.BSCTEST]: '0x8318ea1dbba627731ac55bf47e57a22952bd537d',
  [ChainId.BSCMAIN]: '0x8318ea1dbba627731ac55bf47e57a22952bd537d',
  [ChainId.MUMBAI]: '0x42a0931B5623Bbb7Db7F3115b1DD168cbFF8C6ee',
  [ChainId.POLYGON]: '0x42a0931B5623Bbb7Db7F3115b1DD168cbFF8C6ee',
  [ChainId.AURORATEST]: '0x67fd18cc70a7f8c26508c59c906b39b2a079866d',
  [ChainId.AURORAMAIN]: '0x67fd18cc70a7f8c26508c59c906b39b2a079866d',
}

// export const WETH = new Token(ChainId.RINKEBY, '0x92EcACFC94588aa99fba837Be1a98738290E3252', 18, 'WETH', 'Wrapped ETH');
// export const DAI = new Token(ChainId.MAINNET, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Stablecoin');
// export const BUSD = new Token(ChainId.RINKEBY, '0xd16431da4EafE953B4f34923CdB8d833FB1B2E7c', 18, 'BUSD', 'Binance USD');
// export const BTCB = new Token(ChainId.MAINNET, '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18, 'BTCB', 'Binance BTC');

// export const USDT = new Token(ChainId.MAINNET, '0xdac17f958d2ee523a2206206994597c13d831ec7', 6, 'USDT', 'Tether USD');
export const USDT = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xdac17f958d2ee523a2206206994597c13d831ec7', 6, 'USDT', 'Tether USD'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x66b007ea82040320eff7d37bf31a2f7086c27d11', 6, 'USDT', 'Tether USD'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x92ecacfc94588aa99fba837be1a98738290e3252', 18, 'USDT', 'Tether USD'),
  [ChainId.KLAYTN]: new Token(
    ChainId.KLAYTN,
    '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167',
    6,
    'oUSDT',
    'Orbit Bridge Klaytn USD Tether',
  ),
  [ChainId.BAOBAB]: new Token(ChainId.BAOBAB, '0xc63f4d520544913daecc535fef2d78885db9a850', 18, 'oUSDT', 'Tether USD'),
  // [ChainId.BSCMAIN]: new Token(ChainId.BSCMAIN, '', 18, 'USDT', 'Tether USD'),
  // [ChainId.BSCTEST]: new Token(ChainId.BSCTEST, '', 18, 'USDT', 'Tether USD'),
  [ChainId.MUMBAI]: new Token(ChainId.MUMBAI, '0xae16dd27539a255a43596481d0f0824ced8170e1', 6, 'USDT', 'Tether USD'),
  [ChainId.POLYGON]: new Token(ChainId.POLYGON, '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', 6, 'USDT', 'Tether USD'),
  [ChainId.AURORATEST]: new Token(ChainId.AURORATEST, '0x17337154fe49b8b0871a004de387dfeb506c5b73', 6, 'USDT', 'Tether USD'),
  [ChainId.AURORAMAIN]: new Token(ChainId.AURORAMAIN, '0x4988a896b1227218e4A686fdE5EabdcAbd91571f', 6, 'USDT', 'Tether USD'),
}

export const USDT_ADDRESS = {
  [ChainId.MAINNET]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  [ChainId.ROPSTEN]: '0x66b007ea82040320eff7d37bf31a2f7086c27d11',
  [ChainId.RINKEBY]: '0x92ecacfc94588aa99fba837be1a98738290e3252',
  [ChainId.BSCMAIN]: '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167',
  [ChainId.BSCTEST]: '0xc63f4d520544913daecc535fef2d78885db9a850',
  [ChainId.MUMBAI]: '0xae16dd27539a255a43596481d0f0824ced8170e1',
  [ChainId.POLYGON]: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  [ChainId.AURORATEST]: '0x17337154fe49b8b0871a004de387dfeb506c5b73',
  [ChainId.AURORAMAIN]: '0x4988a896b1227218e4A686fdE5EabdcAbd91571f',
}

// export const USDC = new Token(ChainId.MAINNET, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 6, 'USDC', 'USD Coin');
export const USDC = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 6, 'USDC', 'USD Coin'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x2e3aa7718a95a48424c086e6f594c04624a798de', 6, 'USDC', 'USD Coin'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x92ecacfc94588aa99fba837be1a98738290e3252', 18, 'USDC', 'USD Coin'),
  [ChainId.BSCMAIN]: new Token(ChainId.BSCMAIN, '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', 6, 'USDC', 'USD Coin'),
  [ChainId.BSCTEST]: new Token(ChainId.BSCTEST, '0x64544969ed7ebf5f083679233325356ebe738930', 18, 'USDC', 'USD Coin'),
  [ChainId.MUMBAI]: new Token(ChainId.MUMBAI, '0xaf07ac23189718a3b570c73ccd9cd9c82b16b867', 6, 'USDC', 'USD Coin'),
  [ChainId.POLYGON]: new Token(ChainId.POLYGON, '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', 6, 'USDC', 'USD Coin'),
  [ChainId.AURORATEST]: new Token(ChainId.AURORATEST, '0x05436246d637f56e543479b12d0c60c7a077f1c1', 6, 'USDC', 'USD Coin'),
  [ChainId.AURORAMAIN]: new Token(ChainId.AURORAMAIN, '0xB12BFcA5A55806AaF64E99521918A4bf0fC40802', 6, 'USDC', 'USD Coin'),
}

export const USDC_ADDRESS = {
  [ChainId.MAINNET]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  [ChainId.ROPSTEN]: '0x9c8fa1ee532f8afe9f2e27f06fd836f3c9572f71',
  [ChainId.RINKEBY]: '0x92ecacfc94588aa99fba837be1a98738290e3252',
  [ChainId.BSCMAIN]: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  [ChainId.BSCTEST]: '0x64544969ed7ebf5f083679233325356ebe738930',
  [ChainId.MUMBAI]: '0xaf07ac23189718a3b570c73ccd9cd9c82b16b867',
  [ChainId.POLYGON]: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  [ChainId.AURORATEST]: '0x05436246d637f56e543479b12d0c60c7a077f1c1',
  [ChainId.AURORAMAIN]: '0xB12BFcA5A55806AaF64E99521918A4bf0fC40802',
}

export const KDAI = {
  [ChainId.KLAYTN]: new Token(ChainId.KLAYTN, '0x5c74070fdea071359b86082bd9f9b3deaafbe32b', 18, 'KDAI', 'Klaytn DAI'),
  [ChainId.BAOBAB]: new Token(ChainId.BAOBAB, '0xa76639d69cfdbff27abf1d0abc22d5e30e73a07f', 18, 'KDAI', 'Klaytn DAI'),
}

export const KDAI_ADDRESS = {
  [ChainId.KLAYTN]: '0x5c74070fdea071359b86082bd9f9b3deaafbe32b',
  [ChainId.BAOBAB]: '0xa76639d69cfdbff27abf1d0abc22d5e30e73a07f',
}

export const BUSD = {
  [ChainId.BSCMAIN]: new Token(ChainId.BSCMAIN, '0xe9e7cea3dedca5984780bafc599bd69add087d56', 18, 'BUSD', 'Binance USD'),
  [ChainId.BSCTEST]: new Token(ChainId.BSCTEST, '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee', 18, 'BUSD', 'Binance USD'),
}

export const BUSD_ADDRESS = {
  [ChainId.BSCMAIN]: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  [ChainId.BSCTEST]: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
}

// export const UST = new Token(
//   ChainId.MAINNET,
//   '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
//   18,
//   'UST',
//   'Wrapped UST Token'
// );
// export const ETH = new Token(
//   ChainId.MAINNET,
//   '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
//   18,
//   'ETH',
//   'Binance-Peg Ethereum Token'
// );

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.KLAYTN]: [WETH[ChainId.KLAYTN]],
  [ChainId.BAOBAB]: [WETH[ChainId.BAOBAB]],
  [ChainId.BSCMAIN]: [WETH[ChainId.BSCMAIN]],
  [ChainId.BSCTEST]: [WETH[ChainId.BSCTEST]],
  [ChainId.POLYGON]: [WETH[ChainId.POLYGON]],
  [ChainId.MUMBAI]: [WETH[ChainId.MUMBAI]],
  [ChainId.AURORAMAIN]: [WETH[ChainId.AURORAMAIN]],
  [ChainId.AURORATEST]: [WETH[ChainId.AURORATEST]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], USDC[ChainId.MAINNET], USDT[ChainId.MAINNET]],
  // [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, BTCB, USDT, UST, ETH]
  [ChainId.ROPSTEN]: [...WETH_ONLY[ChainId.ROPSTEN], USDC[ChainId.ROPSTEN], USDT[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [...WETH_ONLY[ChainId.RINKEBY], USDC[ChainId.RINKEBY], USDT[ChainId.RINKEBY]],
  [ChainId.KLAYTN]: [...WETH_ONLY[ChainId.KLAYTN], KDAI[ChainId.KLAYTN], USDT[ChainId.KLAYTN]],
  [ChainId.BAOBAB]: [...WETH_ONLY[ChainId.BAOBAB], KDAI[ChainId.BAOBAB], USDT[ChainId.BAOBAB]],
  [ChainId.BSCMAIN]: [...WETH_ONLY[ChainId.BSCMAIN], USDC[ChainId.BSCMAIN], BUSD[ChainId.BSCMAIN]],
  [ChainId.BSCTEST]: [...WETH_ONLY[ChainId.BSCTEST], USDC[ChainId.BSCTEST], BUSD[ChainId.BSCTEST]],
  [ChainId.POLYGON]: [...WETH_ONLY[ChainId.POLYGON], USDC[ChainId.POLYGON], USDT[ChainId.POLYGON]],
  [ChainId.MUMBAI]: [...WETH_ONLY[ChainId.MUMBAI], USDC[ChainId.MUMBAI], USDT[ChainId.MUMBAI]],
  [ChainId.AURORAMAIN]: [...WETH_ONLY[ChainId.AURORAMAIN], USDC[ChainId.AURORAMAIN], USDT[ChainId.AURORAMAIN]],
  [ChainId.AURORATEST]: [...WETH_ONLY[ChainId.AURORATEST], USDC[ChainId.AURORATEST], USDT[ChainId.AURORATEST]],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
  [ChainId.ROPSTEN]: {},
  [ChainId.RINKEBY]: {},
  [ChainId.KLAYTN]: {},
  [ChainId.BAOBAB]: {},
  [ChainId.BSCMAIN]: {},
  [ChainId.BSCTEST]: {},
  [ChainId.POLYGON]: {},
  [ChainId.MUMBAI]: {},
  [ChainId.AURORAMAIN]: {},
  [ChainId.AURORATEST]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], USDC[ChainId.MAINNET], USDT[ChainId.MAINNET]],
  // [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT]
  [ChainId.ROPSTEN]: [...WETH_ONLY[ChainId.ROPSTEN], USDC[ChainId.ROPSTEN], USDT[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [...WETH_ONLY[ChainId.RINKEBY], USDC[ChainId.RINKEBY], USDT[ChainId.RINKEBY]],
  [ChainId.KLAYTN]: [...WETH_ONLY[ChainId.KLAYTN], KDAI[ChainId.KLAYTN], USDT[ChainId.KLAYTN]],
  [ChainId.BAOBAB]: [...WETH_ONLY[ChainId.BAOBAB], KDAI[ChainId.BAOBAB], USDT[ChainId.BAOBAB]],
  [ChainId.BSCMAIN]: [...WETH_ONLY[ChainId.BSCMAIN], USDC[ChainId.BSCMAIN], BUSD[ChainId.BSCMAIN]],
  [ChainId.BSCTEST]: [...WETH_ONLY[ChainId.BSCTEST], USDC[ChainId.BSCTEST], BUSD[ChainId.BSCTEST]],
  [ChainId.POLYGON]: [...WETH_ONLY[ChainId.POLYGON], USDC[ChainId.POLYGON], USDT[ChainId.POLYGON]],
  [ChainId.MUMBAI]: [...WETH_ONLY[ChainId.MUMBAI], USDC[ChainId.MUMBAI], USDT[ChainId.MUMBAI]],
  [ChainId.AURORAMAIN]: [...WETH_ONLY[ChainId.AURORAMAIN], USDC[ChainId.AURORAMAIN], USDT[ChainId.AURORAMAIN]],
  [ChainId.AURORATEST]: [...WETH_ONLY[ChainId.AURORATEST], USDC[ChainId.AURORATEST], USDT[ChainId.AURORATEST]],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], USDC[ChainId.MAINNET], USDT[ChainId.MAINNET]],
  // [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, BTCB, USDT]
  [ChainId.ROPSTEN]: [...WETH_ONLY[ChainId.ROPSTEN], USDC[ChainId.ROPSTEN], USDT[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [...WETH_ONLY[ChainId.RINKEBY], USDC[ChainId.RINKEBY], USDT[ChainId.RINKEBY]],
  [ChainId.KLAYTN]: [...WETH_ONLY[ChainId.KLAYTN], KDAI[ChainId.KLAYTN], USDT[ChainId.KLAYTN]],
  [ChainId.BAOBAB]: [...WETH_ONLY[ChainId.BAOBAB], KDAI[ChainId.BAOBAB], USDT[ChainId.BAOBAB]],
  [ChainId.BSCMAIN]: [...WETH_ONLY[ChainId.BSCMAIN], USDC[ChainId.BSCMAIN], BUSD[ChainId.BSCMAIN]],
  [ChainId.BSCTEST]: [...WETH_ONLY[ChainId.BSCTEST], USDC[ChainId.BSCTEST], BUSD[ChainId.BSCTEST]],
  [ChainId.POLYGON]: [...WETH_ONLY[ChainId.POLYGON], USDC[ChainId.POLYGON], USDT[ChainId.POLYGON]],
  [ChainId.MUMBAI]: [...WETH_ONLY[ChainId.MUMBAI], USDC[ChainId.MUMBAI], USDT[ChainId.MUMBAI]],
  [ChainId.AURORAMAIN]: [...WETH_ONLY[ChainId.AURORAMAIN], USDC[ChainId.AURORAMAIN], USDT[ChainId.AURORAMAIN]],
  [ChainId.AURORATEST]: [...WETH_ONLY[ChainId.AURORATEST], USDC[ChainId.AURORATEST], USDT[ChainId.AURORATEST]],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  // [ChainId.MAINNET]: [
  [ChainId.MAINNET]: [
    [TAL[ChainId.MAINNET], WETH[ChainId.MAINNET]],
    // [CAKE, WBNB],
    [USDC[ChainId.MAINNET], USDT[ChainId.MAINNET]],
    // [DAI, USDT]
  ],
  [ChainId.ROPSTEN]: [
    [TAL[ChainId.ROPSTEN], WETH[ChainId.ROPSTEN]],
    [USDC[ChainId.ROPSTEN], USDT[ChainId.ROPSTEN]],
  ],
  [ChainId.RINKEBY]: [
    [TAL[ChainId.RINKEBY], WETH[ChainId.RINKEBY]],
    [USDC[ChainId.RINKEBY], USDT[ChainId.RINKEBY]],
  ],
  [ChainId.KLAYTN]: [
    [TAL[ChainId.KLAYTN], WETH[ChainId.KLAYTN]],
    [KDAI[ChainId.KLAYTN], USDT[ChainId.KLAYTN]],
  ],
  [ChainId.BAOBAB]: [
    [TAL[ChainId.BAOBAB], WETH[ChainId.BAOBAB]],
    [KDAI[ChainId.BAOBAB], USDT[ChainId.BAOBAB]],
  ],
  [ChainId.BSCMAIN]: [
    [TAL[ChainId.BSCMAIN], WETH[ChainId.BSCMAIN]],
    [USDC[ChainId.BSCMAIN], BUSD[ChainId.BSCMAIN]],
  ],
  [ChainId.BSCTEST]: [
    [TAL[ChainId.BSCTEST], WETH[ChainId.BSCTEST]],
    [USDC[ChainId.BSCTEST], BUSD[ChainId.BSCTEST]],
  ],
  [ChainId.POLYGON]: [
    [TAL[ChainId.POLYGON], WETH[ChainId.POLYGON]],
    [USDC[ChainId.POLYGON], USDT[ChainId.POLYGON]],
  ],
  [ChainId.MUMBAI]: [
    [TAL[ChainId.MUMBAI], WETH[ChainId.MUMBAI]],
    [USDC[ChainId.MUMBAI], USDT[ChainId.MUMBAI]],
  ],
  [ChainId.AURORAMAIN]: [
    [TAL[ChainId.AURORAMAIN], WETH[ChainId.AURORAMAIN]],
    [USDC[ChainId.AURORAMAIN], USDT[ChainId.AURORAMAIN]],
  ],
  [ChainId.AURORATEST]: [
    [TAL[ChainId.AURORATEST], WETH[ChainId.AURORATEST]],
    [USDC[ChainId.AURORATEST], USDT[ChainId.AURORATEST]],
  ],
}

// Todo
export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
