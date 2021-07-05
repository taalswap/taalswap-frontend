import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'

import styled from 'styled-components'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text,Link } from 'taalswap-uikit'

import styled from 'styled-components'

import {
  useFarms,
  usePollFarmsData,
  usePriceCakeBusd,
  usePools,
  useCakeVault,
  useFetchCakeVault,
  useFetchPublicPoolsData,
} from 'state/hooks'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { useMasterchef } from 'hooks/useContract'
import { harvest } from 'utils/callHelpers'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getTaalAddress } from 'utils/addressHelpers'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'

import CardValue from 'views/Home/components/CardValue'
import { FarmWithStakedValue } from '../../views/Farms/components/FarmCard/FarmCard'
import Table from '../../views/Farms/components/FarmTable/FarmTable'

import { RowProps } from '../../views/Farms/components/FarmTable/Row'

import { DesktopColumnSchema, ViewMode } from '../../views/Farms/components/types'
import circleImg01 from './images/cilcle_icon01.png';
import circleImg02 from './images/cilcle_icon02.png';
import circleImg03 from './images/cilcle_icon03.png';
import circleImg04 from './images/cilcle_icon04.png';
import info2Img01 from './images/info2_icon01.png';
import info2Img02 from './images/info2_icon02.png';
import info2Img03 from './images/info2_icon03.png';
import info2Img04 from './images/info2_icon04.png';

const NUMBER_OF_FARMS_VISIBLE = 12

const StyledTvlDic = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  // align-items: center;
  color: red;
  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    justify-content: flex-start;
    color: blue;
  }
`
const Usewrap = styled.ul`
  background-color: ${({ theme }) => theme.colors.background};
`
const Txtcolor = styled.span`
  color: ${({ theme }) => theme.colors.logoColor};
`
const Titcolor = styled.span`
  color: ${({ theme }) => theme.colors.textSubtle};
`
const Titcolor2 = styled.p`
  color: ${({ theme }) => theme.colors.logoColor};
`
const Txtcolor3 = styled.span`
color: ${({ theme }) => theme.colors.logoColor};
border-bottom: 2px solid ${({ theme }) => theme.colors.logoColor};
`

const SectionTop: React.FC = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const [query, setQuery] = useState('')
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const [talTvl, setTalTvl] = useState(0)
  const [talPrice, setTalPrice] = useState(0)
  const [talStakedTotal, setTalStakedTotal] = useState(0)
  const [maxApr, setMaxApr] = useState(0)
  const [transactions24, setTransactions24] = useState(0)
  const [volumeUSD24, setVolumeUSD24] = useState(0)
  const [pendingTx, setPendingTx] = useState(false)

  const farmsWithBalance = useFarmsWithBalance()
  const masterChefContract = useMasterchef()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getTaalAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  usePollFarmsData(isArchived)
  useFetchPublicPoolsData()
  useFetchCakeVault()
  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const {
    userData: { userShares },
    fees: { performanceFee },
    totalCakeInVault,
  } = useCakeVault()

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  const { pools: poolsWithoutAutoVault } = usePools(account)
  const pools = useMemo(() => {
    const cakePool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
    const cakeAutoVault = { ...cakePool, isAutoVault: true }
    return [cakeAutoVault, ...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  const getTalStaked = useCallback(() => {
    let result = 0
    pools.forEach((pool) => {
      if (pool.isAutoVault) {
        // console.log(
        //   `${pool.stakingToken.symbol}(${pool.isAutoVault}):  ${getBalanceNumber(
        //     totalCakeInVault,
        //     pool.stakingToken.decimals,
        //   )}`,
        // )
        result += getBalanceNumber(totalCakeInVault, pool.stakingToken.decimals)
      } else if (pool.sousId === 0) {
        const manualCakeTotalMinusAutoVault = new BigNumber(pool.totalStaked).minus(totalCakeInVault)
        // console.log(
        //   `${pool.stakingToken.symbol}(${pool.isAutoVault}):  ${getBalanceNumber(
        //     manualCakeTotalMinusAutoVault,
        //     pool.stakingToken.decimals,
        //   )}`,
        // )
        result += getBalanceNumber(manualCakeTotalMinusAutoVault, pool.stakingToken.decimals)
      } else {
        result += getBalanceNumber(pool.totalStaked, pool.stakingToken.decimals)
      }
    })

    setTalStakedTotal(result)
  }, [pools, totalCakeInVault])

  useEffect(() => {
    async function fetchData() {
      let result = 0
      getTalStaked()
      fetch('https://taalswap-info-api.vercel.app/api/tvl', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          // console.log(`tvl : ${response.data.tvl}`)
          // console.log(`talStakedTotal : ${talStakedTotal}`)
          // console.log(`cakePrice.toNumber() : ${cakePrice.toNumber()}`)
          result = parseFloat(response.data.tvl) + talStakedTotal * cakePrice.toNumber()
          // console.log(`result : ${result}`)
          setTalTvl(result)
        })

      setTalPrice(cakePrice.toNumber())
    }

    async function fetchData24h() {
      fetch('https://taalswap-info-api.vercel.app/api/daily', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setTransactions24(response.data.transactions)
          setVolumeUSD24(response.data.volumeUSD)
        })
    }

    fetchData()
    fetchData24h()
  }, [talTvl, setTalTvl, cakePrice, setTalPrice, talStakedTotal, getTalStaked])

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
        const apr = isActive ? getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity) : 0

        return { ...farm, apr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [cakePrice, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      farmsStaked = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(farmsStaked).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [farmsStakedMemoized, observerIsSet])


    const getMultiplierAvg = () => {
        let result = 0
        farmsStakedMemoized.forEach((row) => {
            const multiplier = row.multiplier
            if (multiplier !== undefined) {
                result += parseInt(multiplier.replace('X', ''))
            }
        })
        return result
    }

  const rowData = farmsStakedMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('TAAL', '')

    const row: RowProps = {
      apr: {
        value: farm.apr && farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apr,
      },
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
          multiplierAvg: getMultiplierAvg(),
      },
      details: farm,
        isLandingPage: true,
    }

    return row
  })

    const getTotalAssets = () => {
        let result = 0

        farmsStakedMemoized.forEach((farm) => {
            if (farm.userData.earnings !== '0') {
                result += Number(farm.liquidity)
            }
        })
        return result
    }

    const getTotalEarned = () => {
        let result = 0
        farmsStakedMemoized.forEach((farm) => {
            const earnings = getBalanceNumber(new BigNumber(farm.userData.earnings))
            result += earnings
        })
        return result
    }

    const getTotalApr = () => {
        let result = 0
        let cnt = 0
        farmsStakedMemoized.forEach((farm) => {
            if (maxApr < farm.apr) {
                setMaxApr(farm.apr)
            }
            if (farm.userData.earnings !== '0') {
                result += farm.apr
                cnt++
            }
        })

        const returnValue = result / cnt

        if (Number.isNaN(returnValue)) {
            return 0
        }
        return returnValue
    }


    const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    }

        const linkToURL = (url: string) => {
            window.location.href = url
        }

        const harvestAllFarms = useCallback(async () => {
            setPendingTx(true)
            // eslint-disable-next-line no-restricted-syntax
            for (const farmWithBalance of balancesWithValue) {
                try {
                    // eslint-disable-next-line no-await-in-loop
                    await harvest(masterChefContract, farmWithBalance.pid, account)
                } catch (error) {
                    // TODO: find a way to handle when the user rejects transaction or it fails
                }
            }
            setPendingTx(false)
        }, [account, balancesWithValue, masterChefContract])

        function MoneyFormat(labelValue) {
            return labelValue
            // return Math.abs(Number(labelValue)) >= 1.0e9
            //   ? Math.abs(Number(labelValue)) / 1.0e9 + 'B'
            //   : Math.abs(Number(labelValue)) >= 1.0e6
            //   ? Math.abs(Number(labelValue)) / 1.0e6 + 'M'
            //   : Math.abs(Number(labelValue)) >= 1.0e3
            //   ? Math.abs(Number(labelValue)) / 1.0e3 + 'K'
            //   : Math.abs(Number(labelValue))
        }


        return (
        <div>
          <FlexLayout>
            <Route exact path={`${path}`}>
              {farmsStakedMemoized.map((farm) => (
                <FarmCard key={farm.pid} farm={farm} cakePrice={cakePrice} account={account} removed={false} />
              ))}
            </Route>
            <Route exact path={`${path}/history`}>
              {farmsStakedMemoized.map((farm) => (
                <FarmCard key={farm.pid} farm={farm} cakePrice={cakePrice} account={account} removed />
              ))}
            </Route>
            <Route exact path={`${path}/archived`}>
              {farmsStakedMemoized.map((farm) => (
                <FarmCard key={farm.pid} farm={farm} cakePrice={cakePrice} account={account} removed />
              ))}
            </Route>
          </FlexLayout>
        </div>
      )
    }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }
    return (
        <div className='top_wrap'>
            <div className='cont'>
                <div className='cont_top'>
                    <div>
                        <p className='home_title'>Boost your assets the way <br />you&apos;re never imagined</p>
                        <p className='home_subtit'>A multi-chain AMM protocol to safeguard and increse your assets</p>
                        <p className='current_time'><span>05/25</span><span>20:00</span><span>SGT</span></p>
                        <input type="button" value='Start' style={{cursor:'pointer'}} className="start_btn"/>
                    </div>
                    <div className='top_buyline'>
                        <p className='buy_name'>Current TVL</p>
                        <p className='buy_num'>$0,000,000,000</p>
                        <div className='buy_btnwrap'>
                            <input type="button" value='Buy TAL' style={{cursor:'pointer'}} />
                        </div>
                    </div>
                </div>
                <div className='input_wrap'>
                    <div className='taal_info info01'>
                        <Usewrap>
                            <li>
                                <img src={circleImg01} alt="circle_icon"/>
                                <Titcolor className='info_title'>TAL price</Titcolor>
                            </li>
                            <li><Txtcolor className='info_num'>37.3051</Txtcolor><Titcolor className='info_name'>USD</Titcolor>
                            </li>
                        </Usewrap>
                    </div>
                    <div className='taal_info info02'>
                        <Usewrap>
                            <li>
                                <div>
                                    <img src={info2Img01} alt="info_icon" />
                                    <Titcolor className='img_tit'>Maximum ARP</Titcolor>
                                </div>
                                <Txtcolor className='info_num'><span>400</span>%</Txtcolor>
                            </li>
                            <li>
                                <div>
                                    <img src={info2Img02} alt="info_icon" />
                                    <Titcolor className='img_tit'># of Transactions (24H)</Titcolor>
                                </div>
                                <Txtcolor className='info_num'>250</Txtcolor>
                            </li>
                            <li>
                                <div>
                                    <img src={info2Img03} alt="info_icon" />
                                    <Titcolor className='img_tit'># of Volume USD (24H)</Titcolor>
                                </div>
                                <div>
                                    <Txtcolor className='info_num'>0.2M</Txtcolor>
                                    <Titcolor className='info_name'>USD</Titcolor>
                                </div>
                            </li>
                        </Usewrap>
                    </div>
                    <div className='taal_info info03'>
                        <Usewrap>
                            <li>
                                <img src={info2Img04} alt="info_icon" />
                                <Txtcolor className='info_title'>Halving Countdown</Txtcolor>
                                <Txtcolor className='info_num'><span>11</span>:<span>42</span>:<span>35</span></Txtcolor>
                            </li>
                            <li>
                                <div>
                                    <img src={info2Img01} alt="info_icon" />
                                    <Titcolor className='info_name'>New TAL/sec</Titcolor>
                                </div>
                                <div>
                                    <div>
                                        <Txtcolor className='info_num'><span>132.138</span></Txtcolor>
                                        <Titcolor className='info_name'><span>-2,507.46</span>USD</Titcolor>
                                    </div>
                                    <input type="button" value="Claim" style={{cursor:"pointer"}}/>
                                </div>
                            </li>
                        </Usewrap>
                    </div>
                    <div className='taal_info info04'>
                        <Usewrap>
                            <li>
                                <div>
                                    <img src={circleImg02} alt="circle_icon"/>
                                    <Titcolor className='info_title'>TAL market cap</Titcolor>
                                </div>
                                <div>
                                    <Txtcolor className='info_num'>101.5</Txtcolor>
                                    <Titcolor className='info_name'>USD</Titcolor>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src={circleImg03} alt="circle_icon"/>
                                    <Titcolor className='info_title'>TAL burnt</Titcolor>
                                </div>
                                <div>
                                    <Txtcolor className='info_num'>0</Txtcolor>
                                    <Titcolor className='info_name'>TAL</Titcolor>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src={circleImg04} alt="circle_icon"/>
                                    <Titcolor className='info_title'>TAL circ. supply</Titcolor>
                                </div>
                                <div>
                                    <Txtcolor className='info_num'>2,21212</Txtcolor>
                                    <Titcolor className='info_name'>TAL</Titcolor>
                                </div>
                            </li>
                        </Usewrap>
                    </div>
                    <div className='taal_info info_portfolio'>
                        <Usewrap>
                            <li>
                                <Txtcolor className='info_title'>MY PORTFOLIO</Txtcolor>
                                <input type="button" value='Harvest All' style={{cursor:"pointer"}}/>
                            </li>
                            <li className='list_progressbar'>
                                <div>
                                    <Titcolor className='progressbar_title'>My Average APR</Titcolor>
                                    <div>
                                        <Txtcolor3 className='info_num'><span>345.54854%</span></Txtcolor3>
                                    </div>
                                </div>
                            </li>
                            <li className='list_date'>
                                <ul>
                                    <li>
                                        <div><Titcolor className='date_title'>My Total Deposit</Titcolor></div>
                                        <div><Txtcolor className='date_num'>-</Txtcolor><Titcolor className='date_name'>USD</Titcolor></div>
                                    </li>
                                    <li>
                                        <div><Titcolor className='date_title'>TAL Earned</Titcolor></div>
                                        <div><Txtcolor className='date_num'>-</Txtcolor><Titcolor className='date_name'>TAL</Titcolor></div>
                                    </li>
                                </ul>
                            </li>
                        </Usewrap>
                    </div>
                </div>
            </div>
        </div>
      // <div className='top_wrap'>
      //   <div className='cont'>
      //       <div className='cont_top'>
      //           <div>
      //               <p className='home_title'>Boost your assets the way <br />you&apos;re never imagined</p>
      //               <p className='home_subtit'>A multi-chain AMM protocol to safeguard and increse your assets</p>
      //               <p className='current_time'><span>05/25</span><span>20:00</span><span>SGT</span></p>
      //               <input type="button" value='Start' style={{cursor:'pointer'}} className="start_btn"/>
      //           </div>
      //           <div className='top_buyline'>
      //               <p className='buy_name'>Current TVL</p>
      //               <p className='buy_num'>$0,000,000,000</p>
      //               <div className='buy_btnwrap'>
      //                   <input type="button" value='Buy TAL' style={{cursor:'pointer'}}/>
      //               </div>
      //           </div>
      //       </div>
      //       <div className='input_wrap'>
      //           <div className='taal_info'>
      //               <ul>
      //                   <li><img src={circleImg01} alt="circle_icon"/>
      //                       <span className='info_title'>TAL price</span>
      //                   </li>
      //                   <li><span className='info_num'>37.3051</span><span className='info_name'>USD</span>
      //                   </li>
      //               </ul>
      //           </div>
      //           <div className='taal_info'>
      //               <ul>
      //                   <li><img src={circleImg02} alt="circle_icon"/>
      //                       <span className='info_title'>TAL market cap</span>
      //                   </li>
      //                   <li><span className='info_num'>101.5M</span><span className='info_name'>USD</span>
      //                   </li>
      //               </ul>
      //           </div>
      //           <div className='taal_info'>
      //               <ul>
      //                   <li><img src={circleImg03} alt="circle_icon"/>
      //                       <span className='info_title'>TAL burnt</span>
      //                   </li>
      //                   <li><span className='info_num'>59,566.5887</span><span className='info_name'>TAL</span>
      //                   </li>
      //               </ul>
      //           </div>
      //           <div className='taal_info'>
      //               <ul>
      //                   <li><img src={circleImg04} alt="circle_icon"/>
      //                       <span className='info_title'>TAL circ. supply</span>
      //                   </li>
      //                   <li><span className='info_num'>2,709,061</span><span className='info_name'>TAL</span>
      //                   </li>
      //                   <li className='list_name'><span className='info_subname'>= <span>BSC 2.3M</span>/<span>HECO 0.2M</span>/<span>OTHERS 0.2M</span></span>
      //                   </li>
      //               </ul>
      //           </div>
      //           <div className='taal_info info_portfolio'>
      //               <ul>
      //                   <li>
      //                     <span className='info_title'>MY PORTFOLIO</span>
      //                     <input type="button" value='Harvest All' style={{cursor:"pointer"}}/>
      //                   </li>
      //                   <li className='list_progressbar'>
      //                       <div>
      //                           <p className='progressbar_title'>My Average APR</p>
      //                           <p><span className='progressbar'>progressbar</span><span><span className='progressbar_num'>-</span>%</span></p>
      //                       </div>
      //                   </li>
      //                   <li className='list_date'>
      //                       <ul>
      //                           <li>
      //                               <div><span className='date_title'>My Total Deposit</span></div>
      //                               <div><span className='date_num'>-</span><span className='date_name'>USD</span></div>
      //                           </li>
      //                           <li>
      //                               <div><span className='date_title'>TAL Earned</span></div>
      //                               <div><span className='date_num'>-</span><span className='date_name'>TAL</span></div>
      //                           </li>
      //                       </ul>
      //                   </li>
      //               </ul>
      //           </div>
      //       </div>
      //       <div className='farms_wrap'>
      //       {renderContent()}
      //       <div ref={loadMoreRef} />
      //       </div>
      //   </div>
      // </div>
    )
  }

export default SectionTop
