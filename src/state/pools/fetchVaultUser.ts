import BigNumber from 'bignumber.js'
import { getCakeVaultContract } from 'utils/contractHelpers'

const cakeVaultContract = getCakeVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await cakeVaultContract.userInfo(account)
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares.toString()).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime.toString(),
      lastUserActionTime: userContractResponse.lastUserActionTime.toString(),
      taalAtLastUserAction: new BigNumber(userContractResponse.taalAtLastUserAction.toString()).toJSON(),
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
