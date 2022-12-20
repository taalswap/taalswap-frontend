import { ChainId } from 'taalswap-sdk';
import MULTICALL_ABI from './abi.json';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xc72160167f700f842ddf553e06bc44186f42b929',
  [ChainId.ROPSTEN]: '0xe81bff6533419dca61cabcd26252eafec782ac00',
  [ChainId.RINKEBY]: '0xe81bff6533419dca61cabcd26252eafec782ac00',
  [ChainId.KLAYTN]: '0x5ba315e48b40f8512b86e1795781f312d330c5fc',
  [ChainId.BAOBAB]: '0x6943fa156da5a68c74696837666ae49c95712431',
  [ChainId.BSCMAIN]: '',
  [ChainId.BSCTEST]: '0x6392f03e10917a9eec0786198bd4beb29ca199a9',
  [ChainId.POLYGON]: '',
  [ChainId.MUMBAI]: '0x32be9c162735ea6dca6f3c86341b4ff69521ba23',
  [ChainId.AURORAMAIN]: '',
  [ChainId.AURORATEST]: '0x553d68b23635893166f4ee5cc185d0cf99aa811f',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
