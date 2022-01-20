import React, { useCallback, useEffect, useState } from 'react'
import { ChainId } from 'taalswap-sdk'
import styled from 'styled-components'
import { useSwapState } from 'state/swap/hooks'
import { useActiveWeb3React } from 'hooks'
import { HelpIcon, useTooltip } from 'taalswap-uikit'
import { useTranslation } from '../../contexts/Localization'

const NetworkSelectBox = styled.select`
  width: 180px;
  height: auto;
  min-height: 30px;
  position: relative;
  border: 1px solid #dce0e4;
  border-radius: 5px;
  background-color: #fff;
  margin-left: 15px;

  @media screen and (max-width: 500px) {
    margin-left: 0px;
    margin-bottom: 10px;
  }
`

const ReferenceElement = styled.div`
  display: flex;
  margin-left: 0.3rem;
  margin-right: auto;
`

const NetworkSelector = ({ onSetCrossChain, id }) => {
  const { t } = useTranslation()
  const { crossChain } = useSwapState()
  const { chainId } = useActiveWeb3React()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    // t('When you add liquidity, you will receive LP tokens to be registered as your share in this liquidity pool.'),
    t('Cross-chain swap service will start soon through TaalSwap’s in-house bridge system.'),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  if (window.localStorage.getItem('chainId') === null && chainId !== undefined)
    window.localStorage.setItem('chainId', chainId?.toString())

  const currentChainId = window.localStorage.getItem('chainId')
  const crossChainId = window.localStorage.getItem('crossChain') ?? chainId
  const crossChainConf = parseInt(process.env.REACT_APP_KLAYTN_ID ?? '', 10) as ChainId

  // ------------------------------
  // support only swap
  const [selectedChainId, setSelectedChainId] = useState(currentChainId)

  // ------------------------------
  // support xswap
  // const [selectedChainId, setSelectedChainId] = useState(() =>
  //   id === 'swap-currency-input' ? currentChainId : crossChainId,
  // )

  const networkList = [
    {
      id: 0,
      name: 'Select Network',
      chainId: 0,
    },
    {
      id: 1,
      name: 'Ethereum',
      chainId: ChainId.ROPSTEN,
    },
    {
      id: 2,
      name: 'Klaytn',
      chainId: crossChainConf,
    },
  ]

  const handleSelect = (e) => {
    if (id === 'swap-currency-output') {
      // setSelectedChainId(parseInt(e.target.value));
      setSelectedChainId(e.target.value)
      onSetCrossChain(parseInt(e.target.value))
      window.localStorage.setItem('crossChain', e.target.value)
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', removeCrossChainId)
    return () => {
      window.removeEventListener('beforeunload', removeCrossChainId)
    }
  }, [])

  const removeCrossChainId = (e) => {
    window.localStorage.removeItem('crossChain')
  }

  useEffect(() => {
    // ------------------------------
    // support only swap
    setSelectedChainId(currentChainId)
    window.localStorage.setItem('crossChain', currentChainId?.toString())
    window.localStorage.setItem('prevChainId', currentChainId?.toString())

    // ------------------------------
    // support xswap
    // if (id === 'swap-currency-input') {
    //   setSelectedChainId(currentChainId)
    // }
    //
    // if (id === 'swap-currency-output' && crossChainId !== null) {
    //   setSelectedChainId(crossChainId)
    //   onSetCrossChain(crossChainId)
    //   window.localStorage.setItem('crossChain', crossChainId?.toString())
    //   window.localStorage.setItem('prevChainId', crossChainId?.toString())
    // }
    // ------------------------------
  }, [currentChainId, crossChainId, onSetCrossChain, id])

  // useEffect(() => {
  //   return () => {
  //     window.localStorage.removeItem('crossChain');
  //   };
  // }, []);

  return (
    <div style={{ display: 'flex' }}>
      <NetworkSelectBox
        onChange={handleSelect}
        disabled
        // disabled={id === 'swap-currency-input'}
        // value={selectedChainId !== null ? selectedChainId : 0}
        value={selectedChainId}
      >
        {networkList.map((network) => (
          <option key={network.id} value={network.chainId} label={network.name} />
        ))}
      </NetworkSelectBox>
      {id === 'swap-currency-output' && (
        <>
          <ReferenceElement ref={targetRef}>
            <HelpIcon color="textSubtle" />
          </ReferenceElement>
          {tooltipVisible && tooltip}
        </>
      )}
    </div>
  )
}

export default NetworkSelector
