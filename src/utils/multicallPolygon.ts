import { AbiItem } from 'web3-utils'
import { Interface } from '@ethersproject/abi'
import { getWeb3BinanceNoAccount } from 'utils/web3Binance'
import MultiCallAbi from 'config/abi/Multicall.json'
import addresses from 'config/constants/contracts'
import { parseInt } from 'lodash'

interface Call {
    address: string // Address of the contract
    name: string // Function name on the contract (example: balanceOf)
    params?: any[] // Function params
}

const multicallPolygon = async (abi: any[], calls: Call[]) => {
    const web3 = getWeb3BinanceNoAccount()
    const multi = new web3.eth.Contract(MultiCallAbi as unknown as AbiItem, addresses.multiCall[parseInt(process.env.REACT_APP_POLYGON_ID, 10)])
    const itf = new Interface(abi)

    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    console.log('----->', calldata)
    const { returnData } = await multi.methods.aggregate(calldata).call()
    const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

    return res
}

export default multicallPolygon
