import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

const CountDownItem = styled.div`
  color: ${({ theme }) => theme.colors.text};
`

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: 'theme.palette.warning.main',
  },
  countdownWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    maxWidth: '150px',
  },

  countdownItem: {
    // border: '1px solid black',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // minWidth: '20px',
    // width: '40px',
    margin: '0px 2px',
  },
}))

const TimeCounter = () => {
  const classes = useStyles()
  const [days, setDays] = useState('00')
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')

  function fillZero(width, str) {
    return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str
  }

  useEffect(() => {
    try {
      const interval = setInterval(() => {
        const now = new Date()

        const thenMnt = moment('2021-07-21 12:00:00')

        setDays(parseInt(moment.duration(thenMnt.diff(now)).asDays().toString()).toString())
        setHours(moment.duration(thenMnt.diff(now)).hours().toString())
        setMinutes(moment.duration(thenMnt.diff(now)).minutes().toString())
        setSeconds(moment.duration(thenMnt.diff(now)).seconds().toString())
      }, 1000)
      return () => clearInterval(interval)
    } catch (error) {
      return null
    }
  }, [])

  return (
    <>
      <div className={classes.countdownWrapper} style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
        <div style={{marginBottom:'5px'}} className='count_Box'>
        <CountDownItem className={classes.countdownItem}>
          {fillZero(2, days)}
          {/* <span>DD</span> */}
        </CountDownItem>
        <CountDownItem className={classes.countdownItem}>days</CountDownItem>
        </div>
        <div className='count_Box'>
        <CountDownItem className={classes.countdownItem}>
          {fillZero(2, hours)}
          {/* <span>HH</span> */}
        </CountDownItem>
        <CountDownItem className={classes.countdownItem}>:</CountDownItem>
        <CountDownItem className={classes.countdownItem}>
          {fillZero(2, minutes)}
          {/* <span>MM</span> */}
        </CountDownItem>
        <CountDownItem className={classes.countdownItem}>:</CountDownItem>
        <CountDownItem className={classes.countdownItem}>
          {fillZero(2, seconds)}
          {/* <span>SS</span> */}
        </CountDownItem>
        </div>
      </div>
    </>
  )
}

export default TimeCounter
