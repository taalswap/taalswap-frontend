import React from 'react';
import styled from 'styled-components';
import { Text, Link } from 'taalswap-uikit'
import { useTranslation } from 'contexts/Localization'

const Txtcolor = styled.p`
  color: ${({ theme }) => theme.colors.logoColor};
  text-align:center;
`
const TableWrap = styled.table`
filter: ${({ theme }) => theme.card.dropShadow};
width: 100%;
background: ${({ theme }) => theme.card.background};
border-radius: 16px;
margin: 16px 0px;
overflow:hidden;
`

const TitleStyle = styled.th`
color: ${({ theme }) => theme.colors.textSubtle};
background: ${({ theme }) => theme.colors.tertiary};
border-bottom: 2px solid rgba(133, 133, 133, 0.1);
padding:24px 8px 24px 20px;
text-align:left;
font-size:14px;
`

const TextStyle = styled.td`
color: ${({ theme }) => theme.colors.logoColor};
padding:24px 8px 24px 20px;
text-align:left;
border-bottom: 2px solid rgba(133, 133, 133, 0.1);
font-size:14px;
`

const LinkStyle = styled(Link)`
color: ${({ theme }) => theme.colors.logoColor};
text-decoration:underline;
font-size:14px;
`

const AllPairs = () => {
    const { t } = useTranslation()
    return (
        <div className="farms_wrap" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <Txtcolor className='section_tit'>All Pairs</Txtcolor>
            <TableWrap>
                <tbody>
                    <tr>
                        <TitleStyle>Name</TitleStyle>
                        <TitleStyle>Liquidity</TitleStyle>
                        <TitleStyle>Prices</TitleStyle>
                    </tr>
                    <tr>
                        <TextStyle>XPN-ETH</TextStyle>
                        <TextStyle>$6,000</TextStyle>
                        <TextStyle><LinkStyle href='./'>{t('Buy XPN')}</LinkStyle></TextStyle>
                    </tr>
                    <tr>
                        <TextStyle>.</TextStyle>
                        <TextStyle>.</TextStyle>
                        <TextStyle>.</TextStyle>
                    </tr>
                </tbody>
            </TableWrap>
        </div>
    );
}

export default AllPairs;