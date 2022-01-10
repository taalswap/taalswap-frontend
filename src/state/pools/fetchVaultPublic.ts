// import BigNumber from 'bignumber.js'
// import { convertSharesToCake } from 'views/Pools/helpers'
// import { getCakeVaultContract } from 'utils/contractHelpers'
// import makeBatchRequest from 'utils/makeBatchRequest'

import BigNumber from 'bignumber.js'
import { convertSharesToCake } from 'views/Pools/helpers'
import {multicallv2} from 'utils/multicall'
import cakeVaultAbi from 'config/abi/cakeVault.json'
import { getCakeVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getCakeVaultContract } from '../../utils/contractHelpers'
import makeBatchRequest from '../../utils/makeBatchRequest'
import {getWeb3NoAccount} from '../../utils/web3'

export const fetchPublicVaultData = async () => {
  const noAccount = getWeb3NoAccount()

// @ts-ignore
  const cakeVaultContract = new noAccount.eth.Contract(cakeVaultAbi, getCakeVaultAddress())
  try {
    const [sharePrice, shares, estimatedCakeBountyReward, totalPendingCakeHarvest] = await makeBatchRequest([
      cakeVaultContract.methods.getPricePerFullShare().call,
      cakeVaultContract.methods.totalShares().call,
      cakeVaultContract.methods.calculateHarvestTaalRewards().call,
      cakeVaultContract.methods.calculateTotalPendingTaalRewards().call,
    ])
    const totalSharesAsBigNumber = new BigNumber(shares as string)
    const sharePriceAsBigNumber = new BigNumber(sharePrice as string)
    const totalCakeInVaultEstimate = convertSharesToCake(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCakeInVault: totalCakeInVaultEstimate.cakeAsBigNumber.toJSON(),
      estimatedCakeBountyReward: new BigNumber(estimatedCakeBountyReward as string).toJSON(),
      totalPendingCakeHarvest: new BigNumber(totalPendingCakeHarvest as string).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalCakeInVault: null,
      estimatedCakeBountyReward: null,
      totalPendingCakeHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  const noAccount = getWeb3NoAccount()

// @ts-ignore
  const cakeVaultContract = new noAccount.eth.Contract(cakeVaultAbi, getCakeVaultAddress())
  try {
    const [performanceFee, callFee, withdrawalFee, withdrawalFeePeriod] = await makeBatchRequest([
      cakeVaultContract.methods.performanceFee().call,
      cakeVaultContract.methods.callFee().call,
      cakeVaultContract.methods.withdrawFee().call,
      cakeVaultContract.methods.withdrawFeePeriod().call,
    ])
    return {
      performanceFee: parseInt(performanceFee as string, 10),
      callFee: parseInt(callFee as string, 10),
      withdrawalFee: parseInt(withdrawalFee as string, 10),
      withdrawalFeePeriod: parseInt(withdrawalFeePeriod as string, 10),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

// export const fetchPublicVaultData = async () => {
//   try {
//     const calls = [
//       'getPricePerFullShare',
//       'totalShares',
//       'calculateHarvestCakeRewards',
//       'calculateTotalPendingCakeRewards',
//     ].map((method) => ({
//       address: getCakeVaultAddress(),
//       name: method,
//     }))
//     console.log('1111', calls)
//     const [[sharePrice], [shares], [estimatedCakeBountyReward], [totalPendingCakeHarvest]] = await multicallv2(
//       cakeVaultAbi,
//       calls,
//     )
//     console.log('2222')
//     const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
//     const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
//     const totalCakeInVaultEstimate = convertSharesToCake(totalSharesAsBigNumber, sharePriceAsBigNumber)
//     console.log('3333', totalSharesAsBigNumber.toJSON())
//     return {
//       totalShares: totalSharesAsBigNumber.toJSON(),
//       pricePerFullShare: sharePriceAsBigNumber.toJSON(),
//       totalCakeInVault: totalCakeInVaultEstimate.cakeAsBigNumber.toJSON(),
//       estimatedCakeBountyReward: new BigNumber(estimatedCakeBountyReward.toString()).toJSON(),
//       totalPendingCakeHarvest: new BigNumber(totalPendingCakeHarvest.toString()).toJSON(),
//     }
//   } catch (error) {
//     return {
//       totalShares: null,
//       pricePerFullShare: null,
//       totalCakeInVault: null,
//       estimatedCakeBountyReward: null,
//       totalPendingCakeHarvest: null,
//     }
//   }
// }
//
// export const fetchVaultFees = async () => {
//   try {
//     const calls = ['performanceFee', 'callFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
//       address: getCakeVaultAddress(),
//       name: method,
//     }))
//
//     const [[performanceFee], [callFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(cakeVaultAbi, calls)
//
//     return {
//       performanceFee: performanceFee.toNumber(),
//       callFee: callFee.toNumber(),
//       withdrawalFee: withdrawalFee.toNumber(),
//       withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
//     }
//   } catch (error) {
//     return {
//       performanceFee: null,
//       callFee: null,
//       withdrawalFee: null,
//       withdrawalFeePeriod: null,
//     }
//   }
// }

export default fetchPublicVaultData
