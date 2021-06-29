import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text,Link } from 'taalswap-uikit'
import styled from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePollFarmsData, usePriceCakeBusd } from 'state/hooks'
import usePersistState from 'hooks/usePersistState'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import FarmCard, { FarmWithStakedValue } from '../../views/Farms/components/FarmCard/FarmCard'
import Table from '../../views/Farms/components/FarmTable/FarmTable'
import FarmTabButtons from '../../views/Farms/components/FarmTabButtons'
import { RowProps } from '../../views/Farms/components/FarmTable/Row'
import ToggleView from '../../views/Farms/components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from '../../views/Farms/components/types'
import circleImg01 from './images/cilcle_icon01.png';
import circleImg02 from './images/cilcle_icon02.png';
import circleImg03 from './images/cilcle_icon03.png';
import circleImg04 from './images/cilcle_icon04.png';


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

const NUMBER_OF_FARMS_VISIBLE = 12

const SectionTop: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, 'pancake_farm_view')
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

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
      },
      details: farm,
    }

    return row
  })

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
                        <input type="button" value='Buy TAL' style={{cursor:'pointer'}}/>
                    </div>
                </div>
            </div>
            <div className='input_wrap'>
                <div className='taal_info'>
                  <Usewrap>
                        <li>
                          <img src={circleImg01} alt="circle_icon"/>
                          <Titcolor className='info_title'>TAL price</Titcolor>
                        </li>
                        <li><Txtcolor className='info_num'>37.3051</Txtcolor><Titcolor className='info_name'>USD</Titcolor>
                        </li>
                  </Usewrap>
                </div>
                <div className='taal_info'>
                  <Usewrap>
                        <li><img src={circleImg02} alt="circle_icon"/>
                          <Titcolor className='info_title'>TAL market cap</Titcolor>
                        </li>
                        <li><Txtcolor className='info_num'>3101.5M</Txtcolor><Titcolor className='info_name'>USD</Titcolor>
                        </li>
                </Usewrap>
                </div>
                <div className='taal_info'>
                <Usewrap>
                        <li><img src={circleImg03} alt="circle_icon"/>
                          <Titcolor className='info_title'>TAL burnt</Titcolor>
                        </li>
                        <li><Txtcolor className='info_num'>359,566.5887</Txtcolor><Titcolor className='info_name'>TAL</Titcolor>
                        </li>
                </Usewrap>
                </div>
                <div className='taal_info'>
                    <Usewrap>
                        <li><img src={circleImg04} alt="circle_icon"/>
                          <Titcolor className='info_title'>TAL circ. supply</Titcolor>
                        </li>
                        <li><Txtcolor className='info_num'>32,709,061</Txtcolor><Titcolor className='info_name'>TAL</Titcolor>
                        </li>
                        <li className='list_name'><Titcolor className='info_subname'>= <span>BSC 2.3M</span>/<span>HECO 0.2M</span>/<span>OTHERS 0.2M</span></Titcolor>
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
                                <Titcolor2 className='progressbar_title'>My Average APR</Titcolor2>
                                <p><span className='progressbar'>progressbar</span><Titcolor><Txtcolor className='progressbar_num'>-</Txtcolor>%</Titcolor></p>
                            </div>
                        </li>
                        <li className='list_date'>
                            <ul>
                                <li>
                                    <div><Txtcolor className='date_title'>My Total Deposit</Txtcolor></div>
                                    <div><Txtcolor className='date_num'>-</Txtcolor><Titcolor className='date_name'>USD</Titcolor></div>
                                </li>
                                <li>
                                    <div><Txtcolor className='date_title'>TAL Earned</Txtcolor></div>
                                    <div><Txtcolor className='date_num'>-</Txtcolor><Titcolor className='date_name'>TAL</Titcolor></div>
                                </li>
                            </ul>
                        </li>
                    </Usewrap>
                </div>
            </div>
            <div className='farms_wrap'>
            {renderContent()}
            <div ref={loadMoreRef} />
            </div>
        </div>
      </div>
    )
  }

  export default SectionTop
