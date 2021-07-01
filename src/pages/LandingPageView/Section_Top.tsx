import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { Image, Heading, RowType, Toggle, Text,Link } from 'taalswap-uikit'
import styled from 'styled-components'
import circleImg01 from './images/cilcle_icon01.png';
import circleImg02 from './images/cilcle_icon02.png';
import circleImg03 from './images/cilcle_icon03.png';
import circleImg04 from './images/cilcle_icon04.png';
import info2Img01 from './images/info2_icon01.png';
import info2Img02 from './images/info2_icon02.png';
import info2Img03 from './images/info2_icon03.png';

const SectionTop: React.FC = () => {

const Usewrap = styled.ul`
  background-color: ${({ theme }) => theme.colors.background};
`
const Txtcolor = styled.span`
  color: ${({ theme }) => theme.colors.logoColor};
`
const Titcolor = styled.span`
  color: ${({ theme }) => theme.colors.textSubtle};
`
const Titcolor2 = styled.p`
  color: ${({ theme }) => theme.colors.logoColor};
`
const Txtcolor3 = styled.span`
color: ${({ theme }) => theme.colors.logoColor};
border-bottom: 2px solid ${({ theme }) => theme.colors.logoColor};
`

    return (
      <div className='top_wrap'>
        <div className='cont'>
            <div className='cont_top'>
                <div>
                    <p className='home_title'>Boost your assets the way <br />you&apos;re never imagined</p>
                    <p className='home_subtit'>A multi-chain AMM protocol to safeguard and increse your assets</p>
                    <p className='current_time'><span>05/25</span><span>20:00</span><span>SGT</span></p>
                    <input type="button" value='Start' style={{cursor:'pointer'}} className="start_btn"/>
                </div>
                <div className='top_buyline'>
                    <p className='buy_name'>Current TVL</p>
                    <p className='buy_num'>$0,000,000,000</p>
                    <div className='buy_btnwrap'>
                        <input type="button" value='Buy TAL' style={{cursor:'pointer'}}/>
                    </div>
                </div>
            </div>
            <div className='input_wrap'>
                <div className='taal_info info01'>
                  <Usewrap>
                        <li>
                          <img src={circleImg01} alt="circle_icon"/>
                          <Titcolor className='info_title'>TAL price</Titcolor>
                        </li>
                        <li><Txtcolor className='info_num'>37.3051</Txtcolor><Titcolor className='info_name'>USD</Titcolor>
                        </li>
                  </Usewrap>
                </div>
                <div className='taal_info info02'>
                  <Usewrap>
                        <li>
                          <div>
                            <img src={info2Img01} alt="info_icon" />
                            <Titcolor className='img_tit'>Maximum ARP</Titcolor>
                          </div>
                            <Txtcolor className='info_num'><span>400</span>%</Txtcolor>
                        </li>
                        <li>
                          <div>
                            <img src={info2Img02} alt="info_icon" />
                            <Titcolor className='img_tit'># of Transactions (24H)</Titcolor>
                          </div>
                            <Txtcolor className='info_num'>250</Txtcolor>
                        </li>
                        <li>
                          <div>
                            <img src={info2Img03} alt="info_icon" />
                            <Titcolor className='img_tit'># of Volume USD (24H)</Titcolor>
                          </div>
                          <div>
                            <Txtcolor className='info_num'>0.2M</Txtcolor>
                            <Titcolor className='info_name'>USD</Titcolor>
                          </div>
                        </li>
                </Usewrap>
                </div>
                <div className='taal_info info03'>
                <Usewrap>
                        <li>
                          <Txtcolor className='info_title'>Halving Countdown</Txtcolor>
                          <Txtcolor className='info_num'><span>11</span>:<span>42</span>:<span>35</span></Txtcolor>
                        </li>
                        <li>
                          <div>
                            <img src={info2Img01} alt="info_icon" />
                            <Titcolor className='info_name'>Auto TAL bounty</Titcolor>
                          </div>
                          <div>
                            <div>
                              <Txtcolor className='info_num'><span>132.138</span></Txtcolor>
                              <Titcolor className='info_name'><span>-2,507.46</span>USD</Titcolor>
                            </div>
                            <input type="button" value="Claim" style={{cursor:"pointer"}}/>
                          </div>
                        </li>
                </Usewrap>
                </div>
                <div className='taal_info info04'>
                    <Usewrap>
                        <li>
                          <div>
                          <img src={circleImg02} alt="circle_icon"/>
                          <Titcolor className='info_title'>TAL market cap</Titcolor>
                          </div>
                          <div>
                          <Txtcolor className='info_num'>101.5</Txtcolor>
                          <Titcolor className='info_name'>USD</Titcolor>
                          </div>
                        </li>
                        <li>
                          <div>
                          <img src={circleImg03} alt="circle_icon"/>
                          <Titcolor className='info_title'>TAL burnt</Titcolor>
                          </div>
                          <div>
                          <Txtcolor className='info_num'>0</Txtcolor>
                          <Titcolor className='info_name'>TAL</Titcolor>
                          </div>
                        </li>
                        <li>
                          <div>
                          <img src={circleImg04} alt="circle_icon"/>
                          <Titcolor className='info_title'>TAL circ. supply</Titcolor>
                          </div>
                          <div>
                          <Txtcolor className='info_num'>2,21212</Txtcolor>
                          <Titcolor className='info_name'>TAL</Titcolor>
                          </div>
                        </li>
                    </Usewrap>
                </div>
                <div className='taal_info info_portfolio'>
                <Usewrap>
                        <li>
                          <Txtcolor className='info_title'>MY PORTFOLIO</Txtcolor>
                          <input type="button" value='Harvest All' style={{cursor:"pointer"}}/>
                        </li>
                        <li className='list_progressbar'>
                            <div>
                                <Titcolor className='progressbar_title'>My Average APR</Titcolor>
                                <div>
                                  <Txtcolor3 className='info_num'><span>345.54854%</span></Txtcolor3>
                                </div>
                            </div>
                        </li>
                        <li className='list_date'>
                            <ul>
                                <li>
                                    <div><Titcolor className='date_title'>My Total Deposit</Titcolor></div>
                                    <div><Txtcolor className='date_num'>-</Txtcolor><Titcolor className='date_name'>USD</Titcolor></div>
                                </li>
                                <li>
                                    <div><Titcolor className='date_title'>TAL Earned</Titcolor></div>
                                    <div><Txtcolor className='date_num'>-</Txtcolor><Titcolor className='date_name'>TAL</Titcolor></div>
                                </li>
                            </ul>
                        </li>
                    </Usewrap>
                </div>
            </div>
        </div>
      </div>
    )
  }

  export default SectionTop
