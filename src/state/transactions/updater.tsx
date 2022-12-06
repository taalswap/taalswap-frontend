import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Caver from 'caver-js';
import { useActiveWeb3React } from '../../hooks'
import { useAddPopup, useBlockNumber } from '../application/hooks'
import { AppDispatch, AppState } from '../index'
import { checkedTransaction, finalizeTransaction } from './actions'

let caver

export function shouldCheck(
  lastBlockNumber: number,
  tx: { addedTime: number; receipt?: any; lastCheckedBlockNumber?: number }
): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  }
  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  }
  // otherwise every block
  return true
}

export default function Updater(): null {
  const { chainId, library } = useActiveWeb3React()

  if (chainId === 1001) {
    caver = new Caver('https://api.baobab.klaytn.net:8651')
  } else if (chainId === 8217) {
    caver = new Caver('https://public-en.kaikas.io/v1/cypress')
  }

  const lastBlockNumber = useBlockNumber()
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector<AppState, AppState['transactions']>((s) => s.transactions)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transactions = chainId ? state[chainId] ?? {} : {}

  // show popup on confirm
  const addPopup = useAddPopup()

  useEffect(() => {
    if (!chainId || !library || !lastBlockNumber) return

    if (chainId < 55) {
      Object.keys(transactions)
        .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
        .forEach((hash) => {
          library
            .getTransactionReceipt(hash)
            .then((receipt) => {
                if (receipt) {
                // console.log(receipt)
                dispatch(
                  finalizeTransaction({
                    chainId,
                    hash,
                    receipt: {
                      blockHash: receipt.blockHash,
                      blockNumber: receipt.blockNumber,
                      contractAddress: receipt.contractAddress,
                      from: receipt.from,
                      status: receipt.status,
                      to: receipt.to,
                      transactionHash: receipt.transactionHash,
                      transactionIndex: receipt.transactionIndex,
                    },
                  })
                )

                addPopup(
                  {
                    txn: {
                      hash,
                      success: receipt.status === 1,
                      summary: transactions[hash]?.summary,
                    },
                  },
                  hash
                )
              } else {
                dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }))
              }
            })
            .catch((error) => {
              console.error(`failed to check transaction hash: ${hash}`, error)
            })
        })
    } else if (chainId > 55 && chainId < 1000) {
      Object.keys(transactions)
        .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
        .forEach((hash) => {
          library
            .getTransactionReceipt(hash)
            .then((receipt) => {
                if (receipt) {
                    // console.log(receipt)
                    dispatch(
                        finalizeTransaction({
                            chainId,
                            hash,
                            receipt: {
                                blockHash: receipt.blockHash,
                                blockNumber: receipt.blockNumber,
                                contractAddress: receipt.contractAddress,
                                from: receipt.from,
                                status: receipt.status,
                                to: receipt.to,
                                transactionHash: receipt.transactionHash,
                                transactionIndex: receipt.transactionIndex,
                            },
                        })
                    )

                    addPopup(
                        {
                            txn: {
                                hash,
                                success: receipt.status === 1,
                                summary: transactions[hash]?.summary,
                            },
                        },
                        hash
                    )
                } else {
                    dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }))
                }
            })
              .catch((error) => {
                  console.error(`failed to check transaction hash: ${hash}`, error)
              })
        })
    } else {
        Object.keys(transactions)
        .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
        .forEach((hash) => {
          caver.klay
            .getTransactionReceipt(hash)
            .then((receipt) => {
              if (receipt) {
                // console.log(receipt)
                dispatch(
                  finalizeTransaction({
                    chainId,
                    hash,
                    receipt: {
                      blockHash: receipt.blockHash,
                      blockNumber: receipt.blockNumber,
                      contractAddress: receipt.contractAddress,
                      from: receipt.from,
                      status: receipt.status,
                      to: receipt.to,
                      transactionHash: receipt.transactionHash,
                      transactionIndex: receipt.transactionIndex,
                    },
                  })
                )

                addPopup(
                  {
                    txn: {
                      hash,
                      success: receipt.status === 1,
                      summary: transactions[hash]?.summary,
                    },
                  },
                  hash
                )
              } else {
                dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }))
              }
            })
            .catch((error) => {
              console.error(`failed to check transaction hash: ${hash}`, error)
            })
        })
    }
  }, [chainId, library, transactions, lastBlockNumber, dispatch, addPopup])

  return null
}
