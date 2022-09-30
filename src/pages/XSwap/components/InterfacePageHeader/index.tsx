import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Flex, IconButton, Text, useModal, NetworkButtons } from 'taalswap-uikit'
import { useWeb3React } from '@web3-react/core'
import OptionIcon from 'views/Swap/images/option_icon.svg'
import Disclosure from 'views/Swap/images/disclosure.svg'
import Bridge from 'views/XSwap/images/bridge.svg'
import RecentXSwapTransactionsModal from 'components/InterfacePageHeader/RecentXSwapTransactionsModal'
import SettingsModal from './SettingsModal'
import RecentTransactionsModal from './RecentTransactionsModal'
import { useTranslation } from '../../../../contexts/Localization'

import useAuth from '../../../../hooks/useAuth'

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}
/* to do */
const StyledPageHeader = styled.div`
  border-bottom: 0px solid ${({ theme }) => theme.colors.disabled};
  padding: 0px 20px 24px;
  width: 100%;
  max-width: 1280px;

  @media screen and (max-width: 960px) {
    padding: 0px 0px 24px 0px;
  }

  @media screen and (max-width: 500px) {
    padding-bottom: 0.6875rem;
  }
`

const Details = styled.div`
  flex: 1;
`

const Heading = styled.h2`
  margin-bottom: 8px;
  font-size: 30px;
  line-height: 1.1;
  font-weight: 600;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
  }
`

const IconButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { login, logout } = useAuth()

  const [onPresentSettings] = useModal(<SettingsModal />)
  const [onPresentRecentTransactions] = useModal(<RecentTransactionsModal />)
  const [onPresentRecentXSwapTransactions] = useModal(<RecentXSwapTransactionsModal />)

  return (
    <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <Heading>{title}</Heading>
          {description && (
            <Text color="#a7b2b3" fontSize="14px">
              {description}
            </Text>
          )}
        </Details>

        <ButtonWrapper>
          <div style={{ textAlign: 'end' }}>
            <NetworkButtons
              login={login}
              logout={logout}
              account={account}
              blockchain={process.env.REACT_APP_CHAIN_ID}
              klaytn={process.env.REACT_APP_KLAYTN_ID}
              binance={process.env.REACT_APP_BINANCE_ID}
            />
          </div>
          <IconButtonsWrapper>
            <IconButton style={{ marginLeft: '10px' }} variant="text" onClick={onPresentSettings} title={t('Settings')}>
              {/* <TuneIcon width='24px' color='#00ab55' /> */}
              <img src={OptionIcon} alt="option_icon" className="" />
            </IconButton>
            <IconButton variant="text" onClick={onPresentRecentTransactions} title={t('Recent transactions')}>
              {/* <HistoryIcon width='24px' color='#00ab55' /> */}
              <img src={Disclosure} alt="option_icon" className="" />
            </IconButton>
            <IconButton
              variant="text"
              onClick={onPresentRecentXSwapTransactions}
              title={t('Recent X-Swap transactions')}
            >
              {/* <HistoryIcon width='24px' color='#00ab55' /> */}
              <img src={Bridge} alt="option_icon" className="" />
            </IconButton>
          </IconButtonsWrapper>
        </ButtonWrapper>
      </Flex>
      {children && <Text mt="16px">{children}</Text>}
    </StyledPageHeader>
  )
}

export default PageHeader
