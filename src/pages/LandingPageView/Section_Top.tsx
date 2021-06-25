import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'

import { useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { RowType } from 'taalswap-uikit'

import { useFarms, usePollFarmsData, usePriceCakeBusd } from 'state/hooks'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getTaalAddress } from 'utils/addressHelpers'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'

import { OptionProps } from 'components/Select/Select'
import CardValue from 'views/Home/components/CardValue'
import { FarmWithStakedValue } from '../../views/Farms/components/FarmCard/FarmCard'
import Table from '../../views/Farms/components/FarmTable/FarmTable'

import { RowProps } from '../../views/Farms/components/FarmTable/Row'

import { DesktopColumnSchema, ViewMode } from '../../views/Farms/components/types'
import circleImg01 from './images/cilcle_icon01.png'
import circleImg02 from './images/cilcle_icon02.png'
import circleImg03 from './images/cilcle_icon03.png'
import circleImg04 from './images/cilcle_icon04.png'

const NUMBER_OF_FARMS_VISIBLE = 12

const SectionTop: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()

  const cakePrice = usePriceCakeBusd()

  const [query, setQuery] = useState('')

  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const [talTvl, setTalTvl] = useState(0)
  const [talPrice, setTalPrice] = useState(0)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getTaalAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  usePollFarmsData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  useEffect(() => {
    fetch('https://taalswap-info-api.vercel.app/api/tvl', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setTalTvl(response.data.tvl)
      })
    setTalPrice(cakePrice.toNumber())
  }, [setTalTvl, cakePrice, setTalPrice])

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
      isLandingPage: true,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
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

    return <Table data={rowData} columns={columns} userDataReady={userDataReady} isLandingPage />
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }
  return (
    <div className="top_wrap">
      <div className="cont">
        <div className="cont_top">
          <div>
            <p className="home_title">
              Boost your assets the way <br />
              you&apos;re never imagined
            </p>
            <p className="home_subtit">A multi-chain AMM protocol to safeguard and increse your assets</p>
            <p className="current_time">
              <span>05/25</span>
              <span>20:00</span>
              <span>SGT</span>
            </p>
            <input type="button" value="Start" style={{ cursor: 'pointer' }} className="start_btn" />
          </div>
          <div className="top_buyline">
            <p className="buy_name">Current TVL</p>
            <p className="buy_num">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignContent: 'center',
                }}
              >
                <p>$</p>
                <div>
                  <CardValue value={talTvl} color="#005046" fontSize="45" />
                </div>
              </div>
            </p>
            <div className="buy_btnwrap">
              <input type="button" value="Buy TAL" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>
        <div className="input_wrap">
          <div className="taal_info">
            <ul>
              <li>
                <img src={circleImg01} alt="circle_icon" />
                <span className="info_title">TAL price</span>
              </li>
              <li>
                <span className="info_num">
                  <CardValue fontSize="29" value={talPrice} />
                </span>
                <span className="info_name">USD</span>
              </li>
            </ul>
          </div>
          <div className="taal_info">
            <ul>
              <li>
                <img src={circleImg02} alt="circle_icon" />
                <span className="info_title">TAL market cap</span>
              </li>
              <li>
                <span className="info_num">101.5M</span>
                <span className="info_name">USD</span>
              </li>
            </ul>
          </div>
          <div className="taal_info">
            <ul>
              <li>
                <img src={circleImg03} alt="circle_icon" />
                <span className="info_title">TAL burnt</span>
              </li>
              <li>
                <span className="info_num">
                  <CardValue fontSize="29" value={burnedBalance} />
                </span>
                <span className="info_name">TAL</span>
              </li>
            </ul>
          </div>
          <div className="taal_info">
            <ul>
              <li>
                <img src={circleImg04} alt="circle_icon" />
                <span className="info_title">TAL circ. supply</span>
              </li>
              <li>
                <span className="info_num">
                  <CardValue fontSize="29" value={cakeSupply} />
                </span>
                <span className="info_name">TAL</span>
              </li>
              <li className="list_name">
                <span className="info_subname">
                  = <span>BSC 2.3M</span>/<span>HECO 0.2M</span>/<span>OTHERS 0.2M</span>
                </span>
              </li>
            </ul>
          </div>
          <div className="taal_info info_portfolio">
            <ul>
              <li>
                <span className="info_title">MY PORTFOLIO</span>
              </li>
              <li className="list_progressbar">
                <div>
                  <p className="progressbar_title">My Average APR</p>
                  <p>
                    <span className="progressbar">progressbar</span>
                    <span>
                      <span className="progressbar_num">-</span>%
                    </span>
                  </p>
                </div>
              </li>
              <li className="list_date">
                <ul>
                  <li>
                    <div>
                      <span className="date_title">My Total Deposit</span>
                    </div>
                    <div>
                      <span className="date_num">-</span>
                      <span className="date_name">USD</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span className="date_title">TAL Earned</span>
                    </div>
                    <div>
                      <span className="date_num">-</span>
                      <span className="date_name">TAL</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="farms_wrap">
          {renderContent()}
          <div ref={loadMoreRef} />
        </div>
      </div>
    </div>
  )
}

export default SectionTop
