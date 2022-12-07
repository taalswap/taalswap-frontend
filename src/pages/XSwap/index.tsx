import { ChainId, CurrencyAmount, JSBI, Token, Trade } from 'taalswap-sdk'
import React, { useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react'
import { useTranslation } from 'contexts/Localization'
import { ArrowDown } from 'react-feather'
import {
  Card as UICard,
  CardBody,
  ArrowDownIcon,
  ArrowForwardIcon,
  Button,
  IconButton,
  Text,
  useModal,
  Link,
  Flex,
  useMatchBreakpoints,
  ConnectorNames,
} from 'taalswap-uikit'
import useAuth from 'hooks/useAuth'
import styled, { ThemeContext } from 'styled-components'
import getAPIUrl from 'utils/getAPIUrl'
import { useExpertModeManager, useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { computeTradePriceBreakdown, computeTradeXPriceBreakdown, warningSeverity } from 'utils/prices'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useDerivedXswapInfo,
  useSwapActionHandlers,
  useSwapState,
} from 'state/swap/hooks'
import { Field } from 'state/swap/actions'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { useCurrencyXswap } from 'hooks/TokensXswap'
import { ApprovalState, useApproveCallbackFromTradeX } from 'hooks/useApproveCallback'
import { useSwapCallback } from 'hooks/useSwapCallback'

import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'

import { INITIAL_ALLOWED_SLIPPAGE } from 'constants/index'
import { setupNetwork } from 'utils/wallet'

import SafeMoonWarningModal from './components/SafeMoonWarningModal'
import ProgressSteps from './components/ProgressSteps'
import InterfacePageHeader from './components/InterfacePageHeader'
import CurrencyXSwapInputPanel from './components/CurrencyXSwapInputPanel'
import V2ExchangeRedirectModal from './components/V2ExchangeRedirectModal'
import ConnectWalletButton from './components/ConnectWalletButton'
import Loader from './components/Loader'
import { LinkStyledButton } from './components/Shared'

import TokenWarningModal from './components/TokenWarningModal'
import TradePrice from './components/swap/TradePrice'

import AdvancedXSwapDetailsDropdown from './components/swap/AdvancedXSwapDetailsDropdown'
import SyrupWarningModal from './components/SyrupWarningModal'
import confirmPriceImpactWithoutFee from './components/swap/confirmPriceImpactWithoutFee'
import ConfirmSwapModal from './components/swap/ConfirmSwapModal'
import { AutoRow, RowBetween } from './components/Row'
import AddressInputPanel from './components/AddressInputPanel'
import Card, { GreyCard } from './components/Card'
import { AutoColumn } from './components/Column'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from './components/swap/styleds'

import TOKEN_LIST from '../../constants/token/taalswap.json'

const { ethereum } = window as WindowChain

// const CACHE_KEY = 'pancakeswap_language';
const CACHE_KEY = 'taalswap_language'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  flex: 1;

  width: 100%;
  padding: 32px 16px;

  // background-image: url('/images/group-pancake.svg');
  background-repeat: no-repeat;
  background-position: bottom 24px center;
  background-size: 90%;
  

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    // background-image: url('/images/arch-${({ theme }) =>
    theme.isDark ? 'dark' : 'light'}.svg'), url('/images/left-pancake.svg'), url('/images/right-pancake.svg');
    background-repeat: no-repeat;
    background-position: center 420px, 10% 230px, 90% 230px;
    background-size: contain, 266px, 266px;
    /* min-height: 90vh; */
  }
`

const StyledLink = styled(Link)`
  display: inline;
  color: ${({ theme }) => theme.colors.failure};
`

const SwapBody = styled(UICard)`
  position: relative;
  max-width: 1240px;
  width: 100%;
  border : 2px solid rgb(0, 171, 85);

  /* z-index: ; */
`

const CardChildBody = styled(CardBody)`
  @media screen and (max-width: 500px) {
    padding: 0.75rem 0.875rem;
  }
`

const InputPanelBody = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
  // width: 10%;
`

const CardPanelBody = styled(Card)`
  /* marginTop: 1rem, */
  padding: 0.25rem 0 0.625rem;
  border-radius: 20px;
  max-width: 540px;
  margin: 1rem auto 0;
  line-height: 1.2;
  border-radius: 0;

  @media screen and (max-width: 500px) {
    ${AutoColumn} {
      grid-row-gap: 15px;
    }
  }
`

const RowBetweenSub = styled(RowBetween)`
  @media screen and (max-width: 500px) {
    //display:block;

    ${Text} {
      // display:block;
    }
    ${Text}:nth-child(2) {
      // display:block;
      //width:100% !important;
      //justify-content:flex-end !important;
      text-align: right !important;
    }
  }
`

const AutoRowAlign = styled(AutoRow)`
  @media screen and (max-width: 500px) {
    width: auto;
    position: absolute;
    top: -25px;
    left: 50%;
    margin: 0;
    padding: 0 !important;
    transform: translateX(-50%);
    z-index: 100;
  }
`

const IconLineButton = styled(IconButton)`
  @media screen and (max-width: 500px) {
    border: 1px solid #ddd;
  }
`

const PriceInlineColumn = styled.div`
  @media screen and (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > div {
      background-color: ${({ theme }) => theme.colors.tertiary};
      color: ${({ theme }) => theme.colors.text};
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
      border-radius: 16px;
      padding: 0 0.35rem;
      font-size: 12px !important;
      min-height: 20px;
    }
    & > div > div {
      font-size: 12px !important;
    }
    & > div ~ div {
      margin-left: 0.25rem;
    }
  }
`

// const Swap = () => {
function XSwap() {
  const { login } = useAuth()

  const { isSm, isXs, isMd } = useMatchBreakpoints()
  const currencyA = undefined
  const currencyB = undefined
  const [currencyAFlag, setCurrencyAFlag] = useState(currencyA !== undefined)
  const [currencyBFlag, setCurrencyBFlag] = useState(currencyB !== undefined)
  const [currencyAPrice, setCurrencyAPrice] = useState('0')
  const [currencyBPrice, setCurrencyBPrice] = useState('0')
  const { t } = useTranslation()
  const storedLangCode = localStorage.getItem(CACHE_KEY)
  const loadedUrlParams = useDefaultsFromURLSearch()
  const [modalCountdownSecondsRemaining, setModalCountdownSecondsRemaining] = useState(5)
  const [disableSwap, setDisableSwap] = useState(false)
  const [hasPoppedModal, setHasPoppedModal] = useState(false)
  const [interruptRedirectCountdown, setInterruptRedirectCountdown] = useState(false)
  const [onPresentV2ExchangeRedirectModal] = useModal(
    <V2ExchangeRedirectModal handleCloseModal={() => setInterruptRedirectCountdown(true)} />,
  )
  const onPresentV2ExchangeRedirectModalRef = useRef(onPresentV2ExchangeRedirectModal)
  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrencyXswap(loadedUrlParams?.outputCurrencyId),
  ]
  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const [transactionWarning, setTransactionWarning] = useState<{
    selectedToken: string | null
    purchaseType: string | null
  }>({
    selectedToken: null,
    purchaseType: null,
  })
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  const handleConfirmWarning = () => {
    setTransactionWarning({
      selectedToken: null,
      purchaseType: null,
    })
  }

  const { account } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  // TODO: 상수 처리 ... 디폴트 값 ?
  const chainId = window.localStorage.getItem('chainId') ?? '0'
  const prevChainId = window.localStorage.getItem('prevChainId') ?? '0'
  const crossChain =
    window.localStorage.getItem('crossChain') ?? process.env.REACT_APP_CHAIN_ID ?? ChainId.ROPSTEN.toString()

  // Check local storage configurations
  if (chainId === '0') {
    window.localStorage.setItem('chainId', process.env.REACT_APP_CHAIN_ID ?? '1')

    // Check currently injected chain and switch network
    const injected = ethereum ? (ethereum.chainId ? ethereum.chainId : 0x1) : 0x1
    setupNetwork(parseInt(process.env.REACT_APP_CHAIN_ID ?? '1', 10))
  }

  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [deadline] = useUserDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const swapInfo = useDerivedSwapInfo(currencyA ?? undefined, currencyB ?? undefined)
  const xSwapInfo = useDerivedXswapInfo(currencyA ?? undefined, currencyB ?? undefined)

  const {
    v2Trade,
    v2TradeX,
    currencyBalances,
    currencyBalancesOrg,
    parsedAmount,
    currencies,
    inputError: swapInputError,
  } = chainId !== crossChain ? xSwapInfo : swapInfo

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade
  const tradeX = showWrap ? undefined : v2TradeX

  const getAddressBySymbol = useCallback((symbol: string | undefined, targetChainId: string) => {
    let curSymbol
    if (symbol === 'ETH') curSymbol = 'WETH'
    else if (symbol === 'KLAY') curSymbol = 'WKLAY'
    else if (symbol === 'BNB') curSymbol = 'WBNB'
    else if (symbol === 'MATIC') curSymbol = 'WMATIC'
    else curSymbol = symbol

    const curToken =
      curSymbol !== undefined
        ? TOKEN_LIST.tokens.find((token) => token.symbol === curSymbol && token.chainId.toString() === targetChainId)
        : null

    return curToken?.address
  }, [])

  useEffect(() => {
    async function fetchPrice() {
      try {
        const inputToken = getAddressBySymbol(currencies[Field.INPUT]?.symbol, chainId)
        const outputToken = getAddressBySymbol(currencies[Field.OUTPUT]?.symbol, crossChain)
        if (currencies[Field.INPUT]?.symbol !== undefined && currencies[Field.OUTPUT]?.symbol !== undefined) {
          if (inputToken !== undefined) {
            await fetch(
              `${getAPIUrl(chainId)}/tokens/${getAddressBySymbol(currencies[Field.INPUT]?.symbol, chainId)}`,
              // 'https://taalswap-info-api-black.vercel.app/api/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7',
              {
                method: 'GET',
                headers: {
                  'Content-type': 'application/json',
                },
              },
            )
              .then((response) => response.json())
              .then((response) => {
                setCurrencyAPrice(parseFloat(response.data.price).toFixed(4))
              })
          }

          if (outputToken !== undefined) {
            await fetch(
              `${getAPIUrl(crossChain)}/tokens/${getAddressBySymbol(currencies[Field.OUTPUT]?.symbol, crossChain)}`,

              // 'https://taalswap-info-api-black.vercel.app/api/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7',
              {
                method: 'GET',
                headers: {
                  'Content-type': 'application/json',
                },
              },
            )
              .then((response) => response.json())
              .then((response) => {
                setCurrencyBPrice(parseFloat(response.data.price).toFixed(4))
              })
          }
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchPrice()
  }, [currencies, getAddressBySymbol, chainId, crossChain])

  // Manage disabled trading pairs that should redirect users to V2
  useEffect(() => {
    const disabledSwaps = ['NULL']
    const inputCurrencySymbol = currencies[Field.INPUT]?.symbol || ''
    const outputCurrencySymbol = currencies[Field.OUTPUT]?.symbol || ''
    const doesInputMatch = disabledSwaps.includes(inputCurrencySymbol)
    const doesOutputMatch = disabledSwaps.includes(outputCurrencySymbol)

    if (doesInputMatch && doesOutputMatch) {
      // Prevent infinite re-render of modal with this condition
      if (!hasPoppedModal) {
        setHasPoppedModal(true)
        onPresentV2ExchangeRedirectModalRef.current()
      }

      // Controls the swap buttons being disabled & renders a message
      setDisableSwap(true)

      const tick = () => {
        setModalCountdownSecondsRemaining((prevSeconds) => prevSeconds - 1)
      }
      const timerInterval = setInterval(() => tick(), 1000)

      if (interruptRedirectCountdown) {
        // Reset timer if countdown is interrupted
        clearInterval(timerInterval)
        setModalCountdownSecondsRemaining(5)
      }

      if (modalCountdownSecondsRemaining <= 0) {
        window.location.href = 'https://swap.taalswap.finance/#/swap'
      }

      return () => {
        clearInterval(timerInterval)
      }
    }

    // Unset disableSwap state if the swap inputs & outputs dont match disabledSwaps
    setDisableSwap(false)
    return undefined
  }, [
    currencies,
    hasPoppedModal,
    modalCountdownSecondsRemaining,
    onPresentV2ExchangeRedirectModalRef,
    interruptRedirectCountdown,
  ])

  const parsedAmounts = showWrap
    ? {
      [Field.INPUT]: parsedAmount,
      [Field.OUTPUT]: parsedAmount,
    }
    : {
      [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
      [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : tradeX?.outputAmount,
    }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient, onSetCrossChain } =
    useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  useEffect(() => {
    if (currencyAFlag && currencyA !== undefined && currencyA !== null) {
      setCurrencyAFlag(false)
      onCurrencySelection(Field.INPUT, currencyA)
    }

    if (currencyBFlag && currencyB !== undefined && currencyB !== null) {
      setCurrencyBFlag(false)
      onCurrencySelection(Field.OUTPUT, currencyB)
    }
    // console.log(currencyB?.symbol);
  }, [currencyAFlag, currencyBFlag, currencyA, currencyB, onCurrencySelection])
  // if (currencyA !== null && currencyA !== undefined) {
  //   onCurrencySelection(Field.INPUT, currencyA);
  // }

  // if (currencyB !== null && currencyB !== undefined) {
  //   onCurrencySelection(Field.OUTPUT, currencyA);
  // }

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTradeX(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalancesOrg[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    deadline,
    recipient,
    tradeX,
  )

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)
  const { xpriceImpactWithoutFee } = computeTradeXPriceBreakdown(tradeX, crossChain)

  const handleSwap = useCallback(() => {
    if (
      priceImpactWithoutFee &&
      xpriceImpactWithoutFee &&
      !confirmPriceImpactWithoutFee(priceImpactWithoutFee, storedLangCode) &&
      !confirmPriceImpactWithoutFee(xpriceImpactWithoutFee, storedLangCode)
    ) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState((prevState) => ({
      ...prevState,
      attemptingTxn: true,
      swapErrorMessage: undefined,
      txHash: undefined,
    }))
    swapCallback()
      .then((hash) => {
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: undefined,
          txHash: hash,
        }))
      })
      .catch((error) => {
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: error.message,
          txHash: undefined,
        }))
      })
  }, [priceImpactWithoutFee, xpriceImpactWithoutFee, swapCallback, setSwapState, storedLangCode])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverityLeft = warningSeverity(priceImpactWithoutFee)
  const priceImpactSeverityRight = warningSeverity(xpriceImpactWithoutFee)
  const priceImpactSeverity =
    priceImpactSeverityLeft >= priceImpactSeverityRight ? priceImpactSeverityLeft : priceImpactSeverityRight
  // console.log('=== priceImpactSeverity ===>', priceImpactSeverityLeft, priceImpactSeverityRight, priceImpactSeverity )

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, showConfirm: false }))

    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [onUserInput, txHash, setSwapState])

  const handleAcceptChanges = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, tradeToConfirm: trade }))
  }, [trade])

  // This will check to see if the user has selected Syrup or SafeMoon to either buy or sell.
  // If so, they will be alerted with a warning message.
  const checkForWarning = useCallback(
    (selected: string, purchaseType: string) => {
      if (['SYRUP', 'SAFEMOON'].includes(selected)) {
        setTransactionWarning({
          selectedToken: selected,
          purchaseType,
        })
      }
    },
    [setTransactionWarning],
  )

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setCurrencyAFlag(false)
      setHasPoppedModal(false)
      setInterruptRedirectCountdown(false)
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      if (inputCurrency.symbol === 'SYRUP') {
        checkForWarning(inputCurrency.symbol, 'Selling')
      }
      if (inputCurrency.symbol === 'SAFEMOON') {
        checkForWarning(inputCurrency.symbol, 'Selling')
      }
    },
    [onCurrencySelection, setApprovalSubmitted, checkForWarning],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      setCurrencyBFlag(false)
      setHasPoppedModal(false)
      setInterruptRedirectCountdown(false)
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      if (outputCurrency.symbol === 'SYRUP') {
        checkForWarning(outputCurrency.symbol, 'Buying')
      }
      if (outputCurrency.symbol === 'SAFEMOON') {
        checkForWarning(outputCurrency.symbol, 'Buying')
      }
    },
    [onCurrencySelection, checkForWarning],
  )

  const [switched, setSwitched] = useState<boolean>(false)
  const inputCurrency = window.localStorage.getItem('INPUT') ?? ''
  const outputCurrency = window.localStorage.getItem('OUTPUT') ?? ''
  const newCurrencyA = useCurrency(outputCurrency)
  const newCurrencyB = useCurrencyXswap(inputCurrency)

  useEffect(() => {
    if (switched && newCurrencyA && newCurrencyB) {
      onCurrencySelection(Field.INPUT, newCurrencyA)
      onCurrencySelection(Field.OUTPUT, newCurrencyB)

      setSwitched(false)
    }
  }, [switched, onCurrencySelection, inputCurrency, outputCurrency, newCurrencyA, newCurrencyB])

  const { INPUT, OUTPUT } = useSwapState()

  const handleSwitchNetwork = useCallback(() => {
    window.localStorage.setItem('INPUT', INPUT.currencyId ?? '')
    window.localStorage.setItem('OUTPUT', OUTPUT.currencyId ?? '')

    if (chainId !== crossChain.toString()) {
      onSetCrossChain(chainId !== null ? parseInt(chainId) : parseInt(prevChainId))

      window.localStorage.setItem(
        'chainId',
        prevChainId !== undefined && prevChainId !== null ? prevChainId.toString() : '0',
      )

      window.localStorage.setItem('crossChain', chainId !== undefined && chainId !== null ? chainId.toString() : '0')

      window.localStorage.setItem('prevChainId', chainId !== undefined && chainId !== null ? chainId.toString() : '0')
      window.localStorage.setItem('refresh', 'true')
      login(ConnectorNames.Injected).then(() => {
        setSwitched(true)
      })
    }
  }, [onSetCrossChain, chainId, login, INPUT.currencyId, OUTPUT.currencyId, crossChain, prevChainId])

  // When leaves XSwap menu clear localStorage items...
  // useEffect(() => {
  //   history.listen((location, action) => {
  //     // console.log(`The current URL is ${location.pathname}`);
  //     if (location.pathname !== '/Xswap') {
  //       window.localStorage.removeItem('crossChain')
  //     }
  //   })
  // }, [history])

  return (
    <Container>
      {/* <Teaser /> */}
      <TokenWarningModal
        isOpen={urlLoadedTokens.length > 0 && !dismissTokenWarning}
        tokens={urlLoadedTokens}
        onConfirm={handleConfirmTokenWarning}
      />
      <SyrupWarningModal
        isOpen={transactionWarning.selectedToken === 'SYRUP'}
        transactionType={transactionWarning.purchaseType}
        onConfirm={handleConfirmWarning}
      />
      <SafeMoonWarningModal isOpen={transactionWarning.selectedToken === 'SAFEMOON'} onConfirm={handleConfirmWarning} />
      {/* <CardNav /> */}
      <InterfacePageHeader title={t('X-Swap')} description={t('Trade your token on the spot')} />
      <SwapBody>
        <Wrapper id="swap-page">
          <ConfirmSwapModal
            isOpen={showConfirm}
            trade={trade}
            tradeX={tradeX}
            originalTrade={tradeToConfirm}
            onAcceptChanges={handleAcceptChanges}
            attemptingTxn={attemptingTxn}
            txHash={txHash}
            recipient={recipient}
            allowedSlippage={allowedSlippage}
            onConfirm={handleSwap}
            swapErrorMessage={swapErrorMessage}
            onDismiss={handleConfirmDismiss}
          />
          <CardChildBody>
            <InputPanelBody>
              <CurrencyXSwapInputPanel
                label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
                value={formattedAmounts[Field.INPUT]}
                showMaxButton={!atMaxAmountInput}
                // currency={currencies[Field.INPUT]}
                currency={currencyAFlag ? currencyA : currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
                onSetCrossChain={onSetCrossChain}
                id="swap-currency-input"
              />

              <AutoColumn justify="space-between" style={{ margin: '7px 10px', position: 'relative' }}>
                <AutoRowAlign justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable>
                    <IconLineButton
                      variant="tertiary"
                      onClick={async () => {
                        handleSwitchNetwork()
                        setApprovalSubmitted(false) // reset 2 step UI for approvals
                        onSwitchTokens()
                      }}
                      style={{ borderRadius: '50%' }}
                      scale="sm"
                    >
                      {isXs || isSm || isMd ? (
                        <ArrowDownIcon color="#00ab55" width="24px" />
                      ) : (
                        <ArrowForwardIcon color="#00ab55" width="24px" />
                      )}
                    </IconLineButton>
                  </ArrowWrapper>
                  {recipient === null && !showWrap && isExpertMode ? (
                    <LinkStyledButton id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                      + Add a send (optional)
                    </LinkStyledButton>
                  ) : null}
                </AutoRowAlign>
              </AutoColumn>

              <CurrencyXSwapInputPanel
                value={formattedAmounts[Field.OUTPUT]}
                onUserInput={handleTypeOutput}
                label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
                showMaxButton={false}
                // currency={currencies[Field.OUTPUT]}
                currency={currencyBFlag ? currencyB : currencies[Field.OUTPUT]}
                onCurrencySelect={handleOutputSelect}
                otherCurrency={currencies[Field.INPUT]}
                onSetCrossChain={onSetCrossChain}
                id="swap-currency-output"
              />
            </InputPanelBody>
            {recipient !== null && !showWrap ? (
              <>
                <AutoRow justify="space-between">
                  <ArrowWrapper clickable={false}>
                    <ArrowDown size="16" color={theme.colors.textSubtle} />
                  </ArrowWrapper>
                  <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                    - Remove send
                  </LinkStyledButton>
                </AutoRow>
                <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
              </>
            ) : null}

            {showWrap ? null : (
              <CardPanelBody>
                <AutoColumn gap="4px">
                  {Boolean(trade) && (
                    <>
                      <RowBetweenSub align="center">
                        <Text fontSize="14px">{t('Price')}</Text>
                        <TradePrice
                          price={trade?.executionPrice}
                          showInverted={showInverted}
                          setShowInverted={setShowInverted}
                        />
                      </RowBetweenSub>

                      <PriceInlineColumn>
                        <div style={{ textAlign: 'right', fontSize: '14px' }}>
                          <Text fontSize="14px">
                            {`${currencies[Field.INPUT]?.symbol} = $ `}
                            {currencyAPrice === undefined ? '-' : currencyAPrice}
                          </Text>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '14px' }}>
                          <Text fontSize="14px">
                            {`${currencies[Field.OUTPUT]?.symbol} = $ `}
                            {currencyBPrice === undefined ? '-' : currencyBPrice}
                          </Text>
                        </div>
                      </PriceInlineColumn>
                    </>
                  )}
                  {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                    <RowBetweenSub align="center">
                      <Text fontSize="14px">{t('Slippage Tolerance')}</Text>
                      <Text fontSize="14px">{allowedSlippage / 100}%</Text>
                    </RowBetweenSub>
                  )}
                </AutoColumn>
              </CardPanelBody>
            )}

            {/* {chainId !== crossChain &&
            trade !== undefined &&
            tradeX !== undefined ? (
              <AdvancedXSwapDetailsDropdown trade={trade} tradeX={tradeX} />
            ) : null} */}

            {chainId === crossChain ? (
              trade !== undefined ? (
                <AdvancedXSwapDetailsDropdown trade={trade} tradeX={undefined} />
              ) : null
            ) : trade !== undefined && tradeX !== undefined ? (
              <AdvancedXSwapDetailsDropdown trade={trade} tradeX={tradeX} />
            ) : null}

            <BottomGrouping>
              {disableSwap && (
                <Flex alignItems="center" mb="1rem">
                  <Text color="failure">
                    Please use{' '}
                    <StyledLink external href="https://swap.taalswap.finance">
                      PancakeSwap V2
                    </StyledLink>{' '}
                    to make this trade
                  </Text>
                </Flex>
              )}
              {!account ? (
                <ConnectWalletButton width="100%" />
              ) : showWrap ? (
                <Button disabled={Boolean(wrapInputError)} onClick={onWrap} width="100%">
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null)}
                </Button>
              ) : noRoute && userHasSpecifiedInputOutput ? (
                <GreyCard style={{ textAlign: 'center' }}>
                  <Text mb="4px">{t('Insufficient liquidity for this trade.')}</Text>
                </GreyCard>
              ) : showApproveFlow ? (
                <RowBetween>
                  <Button
                    onClick={approveCallback}
                    disabled={disableSwap || approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                    style={{ width: '48%' }}
                    variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
                  >
                    {approval === ApprovalState.PENDING ? (
                      <AutoRow gap="6px" justify="center">
                        {t('Approving')} <Loader stroke="white" />
                      </AutoRow>
                    ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                      t('Approved')
                    ) : storedLangCode === 'ko-KR' ? (
                      t(`${currencies[Field.INPUT]?.symbol} ${t('Approve')}`)
                    ) : (
                      t(`${t('Approve')} ${currencies[Field.INPUT]?.symbol}`)
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined,
                        })
                      }
                    }}
                    style={{ width: '48%' }}
                    id="swap-button"
                    disabled={
                      disableSwap ||
                      !isValid ||
                      approval !== ApprovalState.APPROVED ||
                      (priceImpactSeverity > 3 && !isExpertMode)
                    }
                    variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
                  >
                    {priceImpactSeverity > 3 && !isExpertMode
                      ? t('Price Impact Too High')
                      : // : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
                      priceImpactSeverity > 2
                        ? t('Swap Anyway')
                        : t('Swap')}
                  </Button>
                </RowBetween>
              ) : (
                <Button
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        showConfirm: true,
                        txHash: undefined,
                      })
                    }
                  }}
                  id="swap-button"
                  disabled={
                    disableSwap || !isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError
                  }
                  variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
                  width="100%"

                >
                  {swapInputError ||
                    (priceImpactSeverity > 3 && !isExpertMode
                      ? t(`Price Impact Too High`)
                      : //  : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`)}

                      priceImpactSeverity > 2
                        ? t('Swap Anyway')
                        : t('Swap'))}
                </Button>
              )}
              {showApproveFlow && <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />}
              {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
            </BottomGrouping>
          </CardChildBody>
        </Wrapper>
      </SwapBody>
      {/* <AdvancedSwapDetailsDropdown trade={trade} /> */}
    </Container>
  )
}

export default XSwap
