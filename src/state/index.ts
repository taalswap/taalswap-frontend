import { configureStore } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import cloneDeep from 'lodash/cloneDeep'
import { useDispatch } from 'react-redux'
import farmsReducer from './farms'
import poolsReducer from './pools'
import predictionsReducer from './predictions'
import profileReducer from './profile'
import teamsReducer from './teams'
import achievementsReducer from './achievements'
import blockReducer from './block'
import collectiblesReducer from './collectibles'
import user, { initialState as userInitialState } from './user/reducer'
import application from './application/reducer';
import transactions from './transactions/reducer';
import swap from './swap/reducer';
import mint from './mint/reducer';
import lists from './lists/reducer';
import burn from './burn/reducer';
import multicall from './multicall/reducer';
import toasts from './toasts';
import { getThemeCache } from '../utils/theme';
import { updateVersion } from './global/actions'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists', 'profile']

const safeCloneDeep = <T>(state: T) => {
  try {
    return JSON.parse(JSON.stringify(state)) as T
  } catch (error) {
    console.error(error)
    return cloneDeep(state)
  }
}

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    achievements: achievementsReducer,
    block: blockReducer,
    farms: farmsReducer,
    pools: poolsReducer,
    predictions: predictionsReducer,
    profile: profileReducer,
    teams: teamsReducer,
    collectibles: collectiblesReducer,

    // Exchange
    application,
    user,
    transactions,
    swap,
    mint,
    burn,
    multicall,
    lists,
    toasts,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: true }),
    save({ states: PERSISTED_KEYS, debounce: 1000 }),
  ],
  preloadedState: load({
    states: PERSISTED_KEYS,
    preloadedState: {
      user: safeCloneDeep(userInitialState),
    },
  }),
})

store.dispatch(updateVersion())

export type AppState = ReturnType<typeof store.getState>;

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
