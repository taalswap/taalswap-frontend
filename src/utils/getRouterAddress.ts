import { ChainId } from 'taalswap-sdk';
import { ROUTER_ADDRESS } from '../constants';

export default function getRouterAddress(chain: any): string {
  let routerAddress;

  switch (chain) {
    case ChainId.MAINNET:
      routerAddress = ROUTER_ADDRESS[ChainId.MAINNET]
      break;
    case ChainId.ROPSTEN:
      routerAddress = ROUTER_ADDRESS[ChainId.ROPSTEN]
      break;
    case ChainId.RINKEBY:
      routerAddress = ROUTER_ADDRESS[ChainId.RINKEBY]
      break;
    case ChainId.KLAYTN:
      routerAddress = ROUTER_ADDRESS[ChainId.KLAYTN]
      break;
    case ChainId.BAOBAB:
      routerAddress = ROUTER_ADDRESS[ChainId.BAOBAB]
      break;
    case ChainId.BSCMAIN:
      routerAddress = ROUTER_ADDRESS[ChainId.BSCMAIN]
      break;
    case ChainId.BSCTEST:
      routerAddress = ROUTER_ADDRESS[ChainId.BSCTEST]
      break;
    case ChainId.POLYGON:
      routerAddress = ROUTER_ADDRESS[ChainId.POLYGON]
      break;
    case ChainId.MUMBAI:
      routerAddress = ROUTER_ADDRESS[ChainId.MUMBAI]
      break;
    default:
      routerAddress = ROUTER_ADDRESS[ChainId.MAINNET]
      break;
  }

  return routerAddress
}
