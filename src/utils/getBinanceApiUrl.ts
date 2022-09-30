
const getBinanceApiUrl = () => {
    const chainId = process.env.REACT_APP_BINANCE_ID
    let apiUrl

    switch(chainId) {
        case "56":
            apiUrl = 'https://api.taalswap.info/bscmain/api'
            break
        case "97":
        default:
            apiUrl = 'https://api.taalswap.info/bsctest/api'
            break
    }

    return apiUrl
}

export default getBinanceApiUrl
