
const getAuroraApiUrl = () => {
    const chainId = process.env.REACT_APP_AURORA_ID
    let apiUrl

    switch(chainId) {
        case "1313161554":
            apiUrl = 'https://api.taalswap.info/aurora/api'
            break
        case "1313161555":
        default:
            apiUrl = 'https://api.taalswap.info/aurora/api'
            break
    }

    return apiUrl
}

export default getAuroraApiUrl
