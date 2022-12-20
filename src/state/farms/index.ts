/* eslint-disable no-param-reassign */
import { useWeb3React } from '@web3-react/core'
import { ChainId } from "taalswap-sdk";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { farmsConfig, farmsConfigKlaytn, farmsConfigBinance, farmsConfigPolygon, farmsConfigAurora } from 'config/constants/farms'
import isArchivedPid from 'utils/farmHelpers'
import priceHelperLpsConfig from 'config/constants/priceHelperLps'
import { chain, isUndefined, parseInt } from 'lodash'
import fetchFarms from './fetchFarms'
import fetchFarmsPrices from './fetchFarmsPrices'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import { FarmsState, Farm } from '../types'
import getChainId from '../../utils/getChainId'

// const chainId = window.localStorage.getItem('chainId')

// const chainId = getChainId()

// export const changeChainId = () => {}

let noAccountFarmConfig
if (getChainId() === ChainId.POLYGON || getChainId() === ChainId.MUMBAI) {
    noAccountFarmConfig = farmsConfigPolygon.map((farm) => ({
        ...farm,
        userData: {
            allowance: '0',
            tokenBalance: '0',
            stakedBalance: '0',
            earnings: '0',
        },
    }))
} else if (getChainId() === ChainId.KLAYTN || getChainId() === ChainId.BAOBAB) {
  noAccountFarmConfig = farmsConfigKlaytn.map((farm) => ({
    ...farm,
    userData: {
      allowance: '0',
      tokenBalance: '0',
      stakedBalance: '0',
      earnings: '0',
    },
  }))
} else if (getChainId() === ChainId.BSCMAIN || getChainId() === ChainId.BSCTEST) {
    noAccountFarmConfig = farmsConfigBinance.map((farm) => ({
        ...farm,
        userData: {
            allowance: '0',
            tokenBalance: '0',
            stakedBalance: '0',
            earnings: '0',
        },
    }))
} else if (getChainId() === ChainId.AURORAMAIN || getChainId() === ChainId.AURORATEST) {
    noAccountFarmConfig = farmsConfigAurora.map((farm) => ({
        ...farm,
        userData: {
            allowance: '0',
            tokenBalance: '0',
            stakedBalance: '0',
            earnings: '0',
        },
    }))
} else {
  noAccountFarmConfig = farmsConfig.map((farm) => ({
    ...farm,
    userData: {
      allowance: '0',
      tokenBalance: '0',
      stakedBalance: '0',
      earnings: '0',
    },
  }))
}

const initialState: FarmsState = {
  data: noAccountFarmConfig,
  loadArchivedFarmsData: false,
  userDataLoaded: false,
}
// export const nonArchivedFarms = farmsConfig.filter(({ pid }) => !isArchivedPid(pid))
let nonArchivedFarmsChainId
if (getChainId() === ChainId.POLYGON || getChainId() === ChainId.MUMBAI) {
    nonArchivedFarmsChainId = farmsConfigPolygon.filter(({pid}) => !isArchivedPid(pid))
} else if (getChainId() === ChainId.KLAYTN || getChainId() === ChainId.BAOBAB) {
  nonArchivedFarmsChainId = farmsConfigKlaytn.filter(({ pid }) => !isArchivedPid(pid))
} else if (getChainId() === ChainId.BSCMAIN || getChainId() === ChainId.BSCTEST) {
    nonArchivedFarmsChainId = farmsConfigBinance.filter(({ pid }) => !isArchivedPid(pid))
} else if (getChainId() === ChainId.AURORAMAIN || getChainId() === ChainId.AURORATEST) {
    nonArchivedFarmsChainId = farmsConfigAurora.filter(({ pid }) => !isArchivedPid(pid))
} else {
  nonArchivedFarmsChainId = farmsConfig.filter(({ pid }) => !isArchivedPid(pid))
}

export const nonArchivedFarms = nonArchivedFarmsChainId

// Async thunks
export const fetchFarmsPublicDataAsync = createAsyncThunk<Farm[], number[]>(
  'farms/fetchFarmsPublicDataAsync',
  async (pids) => {
    // const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))

    let farmsToFetch
    if (getChainId() === ChainId.POLYGON || getChainId() === ChainId.MUMBAI) {
        farmsToFetch = farmsConfigPolygon.filter((farmConfig) => pids.includes(farmConfig.pid))
    } else if (getChainId() === ChainId.KLAYTN || getChainId() === ChainId.BAOBAB) {
      farmsToFetch = farmsConfigKlaytn.filter((farmConfig) => pids.includes(farmConfig.pid))
    } else if (getChainId() === ChainId.BSCMAIN || getChainId() === ChainId.BSCTEST) {
      farmsToFetch = farmsConfigBinance.filter((farmConfig) => pids.includes(farmConfig.pid))
    } else if (getChainId() === ChainId.AURORAMAIN || getChainId() === ChainId.AURORATEST) {
        farmsToFetch = farmsConfigAurora.filter((farmConfig) => pids.includes(farmConfig.pid))
    } else {
      farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))
    }

    // Add price helper farms
    const farmsWithPriceHelpers = farmsToFetch.concat(priceHelperLpsConfig)
      console.log('===>', farmsWithPriceHelpers);
    const farms = await fetchFarms(farmsWithPriceHelpers)
    const farmsWithPrices = await fetchFarmsPrices(farms)
    // Filter out price helper LP config farms
    const farmsWithoutHelperLps = farmsWithPrices.filter((farm: Farm) => {
      return farm.pid || farm.pid === 0
    })
    return farmsWithoutHelperLps
  },
)

interface FarmUserDataResponse {
  pid: number
  allowance: string
  tokenBalance: string
  stakedBalance: string
  earnings: string
}

export const fetchFarmUserDataAsync = createAsyncThunk<FarmUserDataResponse[], { account: string; pids: number[] }>(
  'farms/fetchFarmUserDataAsync',
  async ({ account, pids }) => {
    // const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))
    let farmsToFetch
    if (getChainId() === ChainId.POLYGON || getChainId() === ChainId.MUMBAI) {
        farmsToFetch = farmsConfigPolygon.filter((farmConfig) => pids.includes(farmConfig.pid))
    } else if (getChainId() === ChainId.KLAYTN || getChainId() === ChainId.BAOBAB) {
      farmsToFetch = farmsConfigKlaytn.filter((farmConfig) => pids.includes(farmConfig.pid))
    } else if (getChainId() === ChainId.BSCMAIN || getChainId() === ChainId.BSCTEST) {
      farmsToFetch = farmsConfigBinance.filter((farmConfig) => pids.includes(farmConfig.pid))
    } else if (getChainId() === ChainId.AURORAMAIN || getChainId() === ChainId.AURORAMAIN) {
        farmsToFetch = farmsConfigAurora.filter((farmConfig) => pids.includes(farmConfig.pid))
    } else {
      farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))
    }
    const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch)
    const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch)
    const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsToFetch)
    const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch)

    return userFarmAllowances.map((farmAllowance, index) => {
      return {
        pid: farmsToFetch[index].pid,
        allowance: userFarmAllowances[index],
        tokenBalance: userFarmTokenBalances[index],
        stakedBalance: userStakedBalances[index],
        earnings: userFarmEarnings[index],
      }
    })
  },
)

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setLoadArchivedFarmsData: (state, action) => {
      const loadArchivedFarmsData = action.payload
      state.loadArchivedFarmsData = loadArchivedFarmsData
    },
  },
  extraReducers: (builder) => {
    // Update farms with live data
    builder
      .addCase(fetchFarmsPublicDataAsync.fulfilled, (state, action) => {
        state.data = state.data.map((farm) => {
          const liveFarmData = action.payload.find((farmData) => farmData.pid === farm.pid)
          return { ...farm, ...liveFarmData }
        })
      })
      .addCase(fetchFarmsPublicDataAsync.rejected, (state, action) => {
        console.log(action)
      })

    // Update farms with user data
    builder
      .addCase(fetchFarmUserDataAsync.fulfilled, (state, action) => {
        action.payload.forEach((userDataEl) => {
          const { pid } = userDataEl
          const index = state.data.findIndex((farm) => farm.pid === pid)
          state.data[index] = { ...state.data[index], userData: userDataEl }
        })
        state.userDataLoaded = true
      })
      .addCase(fetchFarmUserDataAsync.rejected, (state, action) => {
        console.log(action)
      })
  },
})

// Actions
export const { setLoadArchivedFarmsData } = farmsSlice.actions

export default farmsSlice.reducer
