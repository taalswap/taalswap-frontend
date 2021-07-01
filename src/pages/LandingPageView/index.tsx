import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';
import SectionTop from './Section_Top';
import TableWrap from './Table_Wrap'
import SectionBottom from './Section_Bottom';
import Footer from './Footer';
import Teaser from './Teaser_page';
import SubSection from './Sub_Section';
import './App.css';

const AppWrapper = styled.div`
  height:100%;
  width: 100%;
  position: relative;
`;

const LandingPageView = () => {
  return (
    <AppWrapper className='wrap'>
        <Teaser />
        <TopBar />
        <SectionTop />
        <TableWrap />
        <SectionBottom />
        <SubSection />
        <Footer />
    </AppWrapper>
  );
};

export default LandingPageView;
