import BigNumber from 'bignumber.js'
import { getCakeVaultContract } from 'utils/contractHelpers'
import web3NoAccount from "../../utils/web3";
import cakeVaultAbi from "../../config/abi/cakeVault.json";
import {getCakeVaultAddress} from "../../utils/addressHelpers";

// const cakeVaultContract = getCakeVaultContract()
// @ts-ignore
const cakeVaultContract = new web3NoAccount.eth.Contract(cakeVaultAbi, getCakeVaultAddress())

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await cakeVaultContract.methods.userInfo(account).call()
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime as string,
      lastUserActionTime: userContractResponse.lastUserActionTime as string,
      taalAtLastUserAction: new BigNumber(userContractResponse.taalAtLastUserAction).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      taalAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
