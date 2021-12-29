import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { parseUnits } from '@ethersproject/units'
import { ethers } from 'ethers'
import { Pair, TokenAmount, Token } from 'taalswap-sdk'
import { getLpContract, getMasterchefContract } from 'utils/contractHelpers'
import { farmsConfig, farmsConfigKlaytn } from 'config/constants/farms'
import { getAddress, getTaalAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import pools from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import { isUndefined, parseInt } from 'lodash'
import multicall from './multicall'
import { getWeb3NoAccount } from './web3'
import { getBalanceAmount } from './formatBalance'
import { BIG_TEN, BIG_ZERO } from './bigNumber'
import getChainId from './getChainId'
import getGasPrice from "./getGasPrice";

export const approve = async (lpContract, masterChefContract, account) => {
  const result = await lpContract
    .approve(masterChefContract.address, ethers.constants.MaxUint256, { from: account })
  return result
}

export const stake = async (masterChefContract, pid, amount, account) => {
  const gasPrice = getGasPrice()
  if (pid === 0) {
    const tx = await masterChefContract
      .enterStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), { gasPrice, gasLimit: 200000 })
    const receipt = await tx.wait()
    return receipt.transactionHash
  }

  const tx = await masterChefContract
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), { from: account, gasPrice: parseUnits('10', 'gwei').toString(), gasLimit: 200000 })
  const receipt = await tx.wait()
  return receipt.transactionHash
}

export const sousStake = async (sousChefContract, amount, decimals = 18, account) => {
  const tx = await sousChefContract
    .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), { from: account, gasPrice: parseUnits('10', 'gwei').toString(), gasLimit: 200000 })
  const receipt = await tx.wait()
  return receipt.transactionHash
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  const tx = await sousChefContract
    .deposit({
      from: account,
      gasPrice: parseUnits('10', 'gwei').toString(),
      gasLimit: 200000,
      value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(),
    })
  const receipt = await tx.wait()
  return receipt.transactionHash
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  if (pid === 0) {
    const tx = await masterChefContract
      .leaveStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), { from: account, gasPrice: parseUnits('10', 'gwei').toString(), gasLimit: 200000 })
    const receipt = await tx.wait()
    return receipt.transactionHash
  }

  const tx = await masterChefContract
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), { from: account, gasPrice: parseUnits('10', 'gwei').toString(), gasLimit: 200000 })
  const receipt = await tx.wait()
  return receipt.transactionHash
}

export const sousUnstake = async (sousChefContract, amount, decimals, account) => {
  const tx = await sousChefContract
    .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), { from: account, gasPrice: parseUnits('10', 'gwei').toString(), gasLimit: 200000 })
  const receipt = await tx.wait()
  return receipt.transactionHash
}

export const sousEmergencyUnstake = async (sousChefContract, account) => {
  const tx = await sousChefContract
    .emergencyWithdraw({ from: account })
  const receipt = await tx.wait()
  return receipt.transactionHash
}

export const harvest = async (masterChefContract, pid, account) => {
  if (pid === 0) {
    const tx = await masterChefContract
      .leaveStaking('0', { from: account, gasPrice: parseUnits('10', 'gwei').toString(), gasLimit: 200000 })
    const receipt = await tx.wait()
    return receipt.transactionHash
  }

  const tx = await masterChefContract
    .deposit(pid, '0', { from: account, gasPrice: parseUnits('10', 'gwei').toString(), gasLimit: 200000 })
  const receipt = await tx.wait()
  return receipt.transactionHash
}

export const soushHarvest = async (sousChefContract, account) => {
  const tx = await sousChefContract
    .deposit('0', { from: account, gasPrice: parseUnits('10', 'gwei').toString(), gasLimit: 200000 })
  const receipt = await tx.wait()
  return receipt.transactionHash
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  const tx = await sousChefContract
    .deposit({ from: account, gasPrice: parseUnits('10', 'gwei').toString(), gasLimit: 200000, value: BIG_ZERO })
  const receipt = await tx.wait()
  return receipt.transactionHash
}

// const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
const chainIdStr = window.localStorage.getItem("chainId")
const chainId = getChainId()

const cakeBnbPid = 1  // 251 -> 1
let cakeBnbFarm
if (chainId > 1000) {
  cakeBnbFarm = farmsConfigKlaytn.find((farm) => farm.pid === cakeBnbPid)
} else {
  cakeBnbFarm = farmsConfig.find((farm) => farm.pid === cakeBnbPid)
}

const CAKE_TOKEN = new Token(chainId, getTaalAddress(), 18)
const WBNB_TOKEN = new Token(chainId, tokens.weth.address[chainId], 18)
const CAKE_BNB_TOKEN = new Token(chainId, getAddress(cakeBnbFarm.lpAddresses), 18)

/*
 * Returns the total CAKE staked in the CAKE-BNB LP
 */
export const getUserStakeInCakeBnbLp = async (account: string, block?: number) => {
  try {
    const masterContract = getMasterchefContract()
    const cakeBnbContract = getLpContract(getAddress(cakeBnbFarm.lpAddresses))
    const totalSupplyLP = await cakeBnbContract.methods.totalSupply().call(undefined, block)
    const reservesLP = await cakeBnbContract.methods.getReserves().call(undefined, block)
    const cakeBnbBalance = await masterContract.methods.userInfo(cakeBnbPid, account).call(undefined, block)

    const pair: Pair = new Pair(
      new TokenAmount(CAKE_TOKEN, reservesLP._reserve0.toString()),
      new TokenAmount(WBNB_TOKEN, reservesLP._reserve1.toString()),
    )
    const cakeLPBalance = pair.getLiquidityValue(
      pair.token0,
      new TokenAmount(CAKE_BNB_TOKEN, totalSupplyLP.toString()),
      new TokenAmount(CAKE_BNB_TOKEN, cakeBnbBalance.amount.toString()),
      false,
    )

    return cakeLPBalance.toSignificant(18)
  } catch (error) {
    console.error(`CAKE-BNB LP error: ${error}`)
    return 0
  }
}

/**
 * Gets the cake staked in the main pool
 */
export const getUserStakeInCakePool = async (account: string, block?: number) => {
  try {
    const masterContract = getMasterchefContract()
    const response = await masterContract.methods.userInfo(0, account).call(undefined, block)

    return getBalanceAmount(new BigNumber(response.amount)).toNumber()
  } catch (error) {
    console.error('Error getting stake in CAKE pool', error)
    return 0
  }
}

/**
 * Returns total staked value of active pools
 */
export const getUserStakeInPools = async (account: string) => {
  try {
    const web3 = getWeb3NoAccount()
    const eligiblePools = pools
      .filter((pool) => pool.sousId !== 0)
      .filter((pool) => pool.isFinished === false || pool.isFinished === undefined)

    // Get the ending block is eligible pools
    const calls = eligiblePools.map((eligiblePool) => ({
      address: getAddress(eligiblePool.contractAddress),
      name: 'bonusEndBlock',
    }))
    const currentBlock = await web3.eth.getBlockNumber()
    const ends = await multicall(sousChefABI, calls)

    // Filter out pools that have ended
    const activePools = eligiblePools.filter((eligiblePool, index) => {
      const endBlock = new BigNumber(ends[index])
      return endBlock.gt(currentBlock)
    })

    // Get the user info of each pool
    const userInfoCalls = activePools.map((activePool) => ({
      address: getAddress(activePool.contractAddress),
      name: 'userInfo',
      params: [account],
    }))
    const userInfos = await multicall(sousChefABI, userInfoCalls)

    return userInfos
      .reduce((accum: BigNumber, userInfo) => {
        return accum.plus(new BigNumber(userInfo.amount._hex))
      }, new BigNumber(0))
      .toNumber()
  } catch (error) {
    console.error('Coult not fetch staked value in pools', error)
    return 0
  }
}
