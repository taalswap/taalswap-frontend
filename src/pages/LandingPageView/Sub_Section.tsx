import React from 'react';
import styled from 'styled-components';
import AgencyLogo01 from './images/Agency_logo01.png';
import AgencyLogo02 from './images/Agency_logo02.png';

const SectionWrapper = styled.div`
  height:100%;
  width: 100%;
  max-width: 1280px;
  margin:0 auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Usewrap = styled.li`
  background-color: ${({ theme }) => theme.colors.background};
`;

const Txtcolor = styled.p`
  color: ${({ theme }) => theme.colors.logoColor};
`

const LandingPageView = () => {
    return (
        <SectionWrapper>
            <div className='subsection_box'>
                <Txtcolor className='section_tit'>Auditing Agency</Txtcolor>
                <ul>
                    <Usewrap><a href="./"><img src={AgencyLogo01} alt="LogoImg" /></a></Usewrap>
                    <Usewrap><a href="./"><img src={AgencyLogo02} alt="LogoImg" /></a></Usewrap>
                </ul>  
            </div> 
            <div className='subsection_box'>
                <Txtcolor className='section_tit'>Partners</Txtcolor>
            </div>   
        </SectionWrapper>
    );
}

export default LandingPageView;