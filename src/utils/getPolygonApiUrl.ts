
const getPolygonApiUrl = () => {
    const chainId = process.env.REACT_APP_BINANCE_ID
    let apiUrl

    switch(chainId) {
        case "137":
            apiUrl = 'https://api.taalswap.info/polygon/api'
            break
        case "80001":
        default:
            apiUrl = 'https://api.taalswap.info/mumbai/api'
            break
    }

    return apiUrl
}

export default getPolygonApiUrl
