import { ChainId, Currency, currencyEquals, ETHER, KLAYTN, WETH } from 'taalswap-sdk'
import { useMemo } from 'react'
import { tryParseAmount } from '../state/swap/hooks'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCurrencyBalance } from '../state/wallet/hooks'
import { useActiveWeb3React } from './index'
import { useWETHContract } from './useContract2'
import { useTranslation } from '../contexts/Localization'

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  typedValue: string | undefined,
): {
  wrapType: WrapType
  execute?: undefined | (() => Promise<void>)
  inputError?: string
} {
  const { chainId, account } = useActiveWeb3React()
  const wethContract = useWETHContract()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  const { t } = useTranslation()

  let wrapStr
  let unWrapStr
  let ethStr
  let wethStr
  switch (chainId) {
    case ChainId.MAINNET:
    case ChainId.ROPSTEN:
    case ChainId.RINKEBY:
      wrapStr = 'ETH to WETH'
      unWrapStr = 'WETH to ETH'
      ethStr = 'ETH'
      wethStr = 'WETH'
      break
    case ChainId.KLAYTN:
    case ChainId.BAOBAB:
      wrapStr = 'KLAY to WKLAY'
      unWrapStr = 'WKLAY to KLAY'
      ethStr = 'KLAY'
      wethStr = 'WKLAY'
      break
    default:
      wrapStr = 'ETH to WETH'
      unWrapStr = 'WETH to ETH'
      ethStr = 'ETH'
      wethStr = 'WETH'
      break
  }

  return useMemo(() => {
    if (!wethContract || !chainId || !inputCurrency || !outputCurrency) return NOT_APPLICABLE

    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount)

    if ((inputCurrency === ETHER || inputCurrency === KLAYTN) && currencyEquals(WETH[chainId], outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await wethContract.deposit({
                    value: `0x${inputAmount.raw.toString(16)}`,
                  })
                  addTransaction(txReceipt, {
                    summary: `Wrap ${inputAmount.toSignificant(6)} ${wrapStr}`,
                  })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : t('Insufficient %symbol% balance', ethStr),
      }
    }
    if (currencyEquals(WETH[chainId], inputCurrency) && (outputCurrency === ETHER || outputCurrency === KLAYTN)) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await wethContract.withdraw(`0x${inputAmount.raw.toString(16)}`)
                  addTransaction(txReceipt, {
                    summary: `Unwrap ${inputAmount.toSignificant(6)} ${unWrapStr}`,
                  })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : t('Insufficient %symbol% balance', ethStr),
      }
    }
    return NOT_APPLICABLE
  }, [
    wethContract,
    chainId,
    inputCurrency,
    outputCurrency,
    inputAmount,
    balance,
    addTransaction,
    ethStr,
    unWrapStr,
    wrapStr,
    t,
  ])
}
