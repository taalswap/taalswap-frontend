import React from 'react';
import { Link } from 'taalswap-uikit';
import circleImg01 from './images/cilcle_icon01.png';
import circleImg02 from './images/cilcle_icon02.png';
import circleImg03 from './images/cilcle_icon03.png';
import circleImg04 from './images/cilcle_icon04.png';

const Section_Top = () => {
    return (
      <div className='top_wrap'>
        <div className='cont'>
            <div className='cont_top'>
                <div>
                    <p className='home_title'>Boost your assets the way <br />you&apos;re never imagined</p>
                    <p className='home_subtit'>A multi-chain AMM protocol to safeguard and increse your assets</p>
                    <p className='current_time'><span>05/25</span><span>20:00</span><span>SGT</span></p>
                    <input type="button" value='Start!' style={{cursor:'pointer'}} className="start_btn"/>
                </div>
                <div className='top_buyline'>
                    <p className='buy_name'>Current TVL</p>
                    <p className='buy_num'>$0,000,000,000</p>
                    <div className='buy_btnwrap'>
                        <input type="button" value='BUY TAL' style={{cursor:'pointer'}}/>
                    </div>
                </div>
            </div>
            <div className='input_wrap'>
                <div className='taal_info'>
                    <ul>
                        <li><img src={circleImg01} alt="circle_icon"/>
                            <span className='info_title'>TAL price</span>
                        </li>
                        <li><span className='info_num'>37.3051</span>
                        </li>
                        <li><span className='info_name'>USD</span>
                        </li>
                    </ul>
                </div>
                <div className='taal_info'>
                    <ul>
                        <li><img src={circleImg02} alt="circle_icon"/>
                            <span className='info_title'>TAL market cap</span>
                        </li>
                        <li><span className='info_num'>101.5M</span>
                        </li>
                        <li><span className='info_name'>USD</span>
                        </li>
                    </ul>
                </div>
                <div className='taal_info'>
                    <ul>
                        <li><img src={circleImg03} alt="circle_icon"/>
                            <span className='info_title'>TAL burnt</span>
                        </li>
                        <li><span className='info_num'>59,566.5887</span>
                        </li>
                        <li><span className='info_name'>TAL</span>
                        </li>
                    </ul>
                </div>
                <div className='taal_info'>
                    <ul>
                        <li><img src={circleImg04} alt="circle_icon"/>
                            <span className='info_title'>TAL circ. supply</span>
                        </li>
                        <li><span className='info_num'>2,709,061</span>
                        </li>
                        <li className='list_name'><span className='info_name'>TAL</span><span className='info_subname'>= <span>BSC 2.3M</span>/<span>HECO 0.2M</span>/<span>OTHERS 0.2M</span></span>
                        </li>
                    </ul>
                </div>
                <div className='taal_info info_portfolio'>
                    <ul>
                        <li><span className='info_title'>MY PORTFOLIO</span>
                        </li>
                        <li className='list_progressbar'>
                            <div>
                                <p className='progressbar_title'>My Average APR</p>
                                <p className='progressbar'>progressbar</p>
                                <p className='progressbar_num'><span>-</span>%</p>
                            </div>
                        </li>
                        <li className='list_date'>
                            <ul>
                                <li>
                                    <div><span className='date_title'>My Total Deposit</span></div>
                                    <div><span className='date_num'>-</span><span className='date_name'>USD</span></div>
                                </li>
                                <li>
                                    <div><span className='date_title'>TAL Earned</span></div>
                                    <div><span className='date_num'>-</span><span className='date_name'>TAL</span></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    );
  };

  export default Section_Top;
