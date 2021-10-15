import React from 'react'
import styled from 'styled-components'
import { useFarmUser } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text, Image } from 'taalswap-uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import CoinImg01 from '../../../../pages/LandingPageView/images/coin_eth_icon.svg'
import CoinImg02 from '../../../../pages/LandingPageView/images/coin_taal_icon.svg'

export interface FarmProps {
  label: string
  pid: number
  image: string
}

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
  width: 24px;
  height: 24px;

  /*
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
    height: 40px;
  }
  */
`

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;
  max-width:atuo;

  ${({ theme }) => theme.mediaQueries.sm} {
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({ image, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Farming')}
        </Text>
      )
    }

    return null
  }

  return (
    <Container>
      {/* <IconImage src={`/images/farms/${image}.svg`} alt="icon" width={40} height={40} mr="8px" /> */ }
      <IconImageBody>
        <IconImage src={CoinImg01} alt="icon" width={40} height={40} mr="8px" />
        <IconImage src={CoinImg02} alt="icon" width={40} height={40} mr="8px" />
      </IconImageBody>
      <div style={{width:'100%'}}>
        {handleRenderFarming()}
        <Text bold fontSize='14px'>{label}</Text>
      </div>
    </Container>
  )
}

export default Farm
