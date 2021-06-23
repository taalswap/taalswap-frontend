import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Text, Flex, LinkExternal, Skeleton } from 'taalswap-uikit'
import LpIcon from '../FarmTable/Actions/Icons/LpIcon'
import LpIcon2 from '../FarmTable/Actions/Icons/LpIcon2'
import LpIcon3 from '../FarmTable/Actions/Icons/LpIcon3'


export interface ExpandableSectionProps {
  bscScanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled.div`
  font-weight: 400;
`
const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()


  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);
  

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{t('Total Liquidity')}:</Text>
        {totalValueFormatted ? <Text>{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
      <Flex justifyContent='space-evenly' alignItems='center' mt='20px'>
      {!removed && (
        <StyledLinkExternal onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} style={{cursor:'pointer'}}><LpIcon />
        {isShown && (
        <div style={{position:"absolute",marginTop:"5px",color:"#00ab55"}}>
          {t('Get %symbol%', { symbol: lpLabel })}
        </div>
        )}
        </StyledLinkExternal>
      )}
      <StyledLinkExternal onMouseEnter={() => setIsShown2(true)}
        onMouseLeave={() => setIsShown2(false)} style={{cursor:'pointer'}}><LpIcon2 />
        {isShown2 && (
        <div style={{position:"absolute",marginTop:"5px",color:"#00ab55"}}>
          {t('View Contract')}
        </div>
        )}
        </StyledLinkExternal>
      <StyledLinkExternal onMouseEnter={() => setIsShown3(true)}
        onMouseLeave={() => setIsShown3(false)} style={{cursor:'pointer'}}><LpIcon3 />
        {isShown3 && (
        <div style={{position:"absolute",marginTop:"5px",color:"#00ab55"}}>
          {t('See Pair Info')}
        </div>
        )}
        </StyledLinkExternal>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
