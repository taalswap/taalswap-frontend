import React from 'react'
import { CardHeader, Heading, Text, Flex, Image } from 'taalswap-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import CoinImg01 from '../../../../pages/LandingPageView/images/coin_eth_icon.svg'
import CoinImg02 from '../../../../pages/LandingPageView/images/coin_taal_icon.svg'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string; isPromotedPool?: boolean }>`
  background: ${({ theme }) => theme.card.background};
  border-radius: ${({ theme, isPromotedPool }) =>
    isPromotedPool ? '31px 31px 0 0' : `${theme.radii.card} ${theme.radii.card} 0 0`};
`

const IconImageBody = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  > div:nth-child(1) {
      z-index: 2;
    }
  > div:nth-child(2) {
      margin-left: -15px;
      z-index: 1;
    }
`;


const IconImage = styled(Image)`
  width: 60px;
  height: 60px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 60px;
    height: 60px;
  }
`

const StyledCardHeader: React.FC<{
  earningTokenSymbol: string
  stakingTokenSymbol: string
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
  isPromotedPool?: boolean
}> = ({
  earningTokenSymbol,
  stakingTokenSymbol,
  isFinished = false,
  isAutoVault = false,
  isStaking = false,
  isPromotedPool = false,
}) => {
  const { t } = useTranslation()
  const poolImageSrc = isAutoVault
    ? `tal-tal.svg`
    : `${earningTokenSymbol}-${stakingTokenSymbol}.svg`.toLocaleLowerCase()
  const isCakePool = earningTokenSymbol === 'TAL' && stakingTokenSymbol === 'TAL'
  const background = isStaking ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return t('Auto')
    }
    if (isCakePool) {
      // manual cake
      return t('Manual')
    }
    // all other pools
    return t('Earn')
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return t('Automatic restaking')
    }
    if (isCakePool) {
      return t('Earn TAL, stake TAL')
    }
    return t('Stake %symbol%', { symbol: stakingTokenSymbol })
  }

  return (
    <Wrapper isPromotedPool={isPromotedPool} isFinished={isFinished} background={background} style={{borderRadius: '15px'}}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : '#00ab55'} scale="lg">
            {`${getHeadingPrefix()} ${earningTokenSymbol}`}
          </Heading>
          <Text color={isFinished ? 'textDisabled' : 'textSubtle'}>{getSubHeading()}</Text>
        </Flex>
        {/* <Image src={`/images/pools/${poolImageSrc}`} alt={earningTokenSymbol} width={50} height={64} /> */}
        <IconImageBody>
          <IconImage src={CoinImg01} alt={earningTokenSymbol} width={60} height={60} />
          <IconImage src={CoinImg02} alt={earningTokenSymbol} width={60} height={60} />
        </IconImageBody>
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
