import React from 'react'
import { Link } from 'taalswap-uikit'
import footerlogo_img from './images/footer_Logo.png'
// import messege_icon from './images/messege_icon.png'//
// import page_icon from './images/page_icon.png'//
// import twitter_icon from './images/twitter_icon.png'//
import messege_icon from './images/messege_icon.svg'
import page_icon from './images/page_icon.svg'
import twitter_icon from './images/twitter_icon.svg'
import gitbook_icon from './images/gitbook_icon.svg'
import github_icon from './images/github_icon.svg'
import mail_icon from './images/mail_icon.svg'

const Footer = () => {
  return (
    <div className="footer_wrap">
      <div className="footer_cont">
        <div className="footer_left">
          <img src={footerlogo_img} alt="logo_img" className="footer_logo" />
          {/* <p>&copy; All rights reserved. Made by TaalSwap. </p> */}
        </div>
        <div className="footer_menu">
          <div style={{ marginLeft: '30px' }}>
            <Link href="https://twitter.com/taal_fi" target="_blank">
              <img src={twitter_icon} alt="twitter_icon" />
            </Link>
          </div>
          <div style={{ marginLeft: '30px' }}>
            <Link href="https://t.me/TaalSwapOfficial" target="_blank">
              <img src={page_icon} alt="page_icon" />
            </Link>
          </div>
          <div style={{ marginLeft: '30px' }}>
            <Link href="https://taalswap.medium.com" target="_blank">
              <img src={messege_icon} alt="messege_icon" />
            </Link>
          </div>
          <div style={{ marginLeft: '30px' }}>
            <Link href="https://taalswap.gitbook.io/taalswap-docs-v-2-0/" target="_blank">
              <img src={gitbook_icon} alt="gitbook_icon" />
            </Link>
          </div>
          <div style={{ marginLeft: '30px' }}>
            <Link href="https://github.com/taalswap" target="_blank">
              <img src={github_icon} alt="github_icon" />
            </Link>
          </div>
          <div style={{ marginLeft: '30px' }}>
            <Link href="mailto:https://taalswap.finance@gmail.com/" target="_blank">
              <img src={mail_icon} alt="github_icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
