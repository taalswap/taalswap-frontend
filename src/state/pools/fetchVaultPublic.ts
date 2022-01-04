// import BigNumber from 'bignumber.js'
// import { convertSharesToCake } from 'views/Pools/helpers'
// import { getCakeVaultContract } from 'utils/contractHelpers'
// import makeBatchRequest from 'utils/makeBatchRequest'

import BigNumber from 'bignumber.js'
import { convertSharesToCake } from 'views/Pools/helpers'
import multicall from 'utils/multicall'
import cakeVaultAbi from 'config/abi/cakeVault.json'
import { getCakeVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

// const cakeVaultContract = getCakeVaultContract()

// export const fetchPublicVaultData = async () => {
//   try {
//     const [sharePrice, shares, estimatedCakeBountyReward, totalPendingCakeHarvest] = await makeBatchRequest([
//       cakeVaultContract.getPricePerFullShare().call,
//       cakeVaultContract.methods.totalShares().call,
//       cakeVaultContract.methods.calculateHarvestTaalRewards().call,
//       cakeVaultContract.methods.calculateTotalPendingTaalRewards().call,
//     ])
//     const totalSharesAsBigNumber = new BigNumber(shares as string)
//     const sharePriceAsBigNumber = new BigNumber(sharePrice as string)
//     const totalCakeInVaultEstimate = convertSharesToCake(totalSharesAsBigNumber, sharePriceAsBigNumber)
//     return {
//       totalShares: totalSharesAsBigNumber.toJSON(),
//       pricePerFullShare: sharePriceAsBigNumber.toJSON(),
//       totalCakeInVault: totalCakeInVaultEstimate.cakeAsBigNumber.toJSON(),
//       estimatedCakeBountyReward: new BigNumber(estimatedCakeBountyReward as string).toJSON(),
//       totalPendingCakeHarvest: new BigNumber(totalPendingCakeHarvest as string).toJSON(),
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
//     const [performanceFee, callFee, withdrawalFee, withdrawalFeePeriod] = await makeBatchRequest([
//       cakeVaultContract.methods.performanceFee().call,
//       cakeVaultContract.methods.callFee().call,
//       cakeVaultContract.methods.withdrawFee().call,
//       cakeVaultContract.methods.withdrawFeePeriod().call,
//     ])
//     return {
//       performanceFee: parseInt(performanceFee as string, 10),
//       callFee: parseInt(callFee as string, 10),
//       withdrawalFee: parseInt(withdrawalFee as string, 10),
//       withdrawalFeePeriod: parseInt(withdrawalFeePeriod as string, 10),
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

export const fetchPublicVaultData = async () => {
  try {
    const calls = [
      'getPricePerFullShare',
      'totalShares',
      'calculateHarvestCakeRewards',
      'calculateTotalPendingCakeRewards',
    ].map((method) => ({
      address: getCakeVaultAddress(),
      name: method,
    }))

    const [[sharePrice], [shares], [estimatedCakeBountyReward], [totalPendingCakeHarvest]] = await multicall(
      cakeVaultAbi,
      calls,
    )

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalCakeInVaultEstimate = convertSharesToCake(totalSharesAsBigNumber, sharePriceAsBigNumber)
    console.log('1111', totalSharesAsBigNumber.toJSON())
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCakeInVault: totalCakeInVaultEstimate.cakeAsBigNumber.toJSON(),
      estimatedCakeBountyReward: new BigNumber(estimatedCakeBountyReward.toString()).toJSON(),
      totalPendingCakeHarvest: new BigNumber(totalPendingCakeHarvest.toString()).toJSON(),
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
  try {
    const calls = ['performanceFee', 'callFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: getCakeVaultAddress(),
      name: method,
    }))

    const [[performanceFee], [callFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicall(cakeVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      callFee: callFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
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

export default fetchPublicVaultData
