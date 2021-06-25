import React from 'react'
import { Link } from 'taalswap-uikit'
import footerlogo_img from './images/footer_Logo.png'
import messege_icon from './images/messege_icon.png'
import page_icon from './images/page_icon.png'
import twitter_icon from './images/twitter_icon.png'

const Footer = () => {
  return (
    <div className="footer_wrap">
      <div className="footer_cont">
        <div className="footer_left">
          <img src={footerlogo_img} alt="logo_img" className="footer_logo" />
          <p>&copy; All rights reserved. Made by TaalSwap. <Link href="/" style={{color:"#00ab55",display:"inline-block",textDecoration:"underline",fontSize:"13px"}}>Audited by HAECHI AUDIT</Link></p>
        </div>
        <div className="footer_menu">
          <div style={{ marginLeft: '30px' }}>
            <Link href="/">
              <img src={twitter_icon} alt="twitter_icon"/>
            </Link>
          </div>
          <div style={{ marginLeft: '30px' }}>
            <Link href="/">
              <img src={page_icon} alt="page_icon"/>
            </Link>
          </div>
          <div style={{ marginLeft: '30px' }}>
            <Link href="/">
              <img src={messege_icon} alt="messege_icon"  />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
