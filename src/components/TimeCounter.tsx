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
    flexWrap: 'wrap',
  },

  countdownItem: {
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '40px',
    '& span': {
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
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

        const thenMnt = moment('2022-01-05 12:00:00')

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
      <div className={classes.countdownWrapper} style={{ border: '1px solid red' }}>
        <CountDownItem className={classes.countdownItem}>
          {fillZero(2, days)}
          {/* <span>DD</span> */}
        </CountDownItem>
        <CountDownItem>:</CountDownItem>
        <CountDownItem className={classes.countdownItem}>
          {fillZero(2, hours)}
          {/* <span>HH</span> */}
        </CountDownItem>
        <CountDownItem>:</CountDownItem>
        <CountDownItem className={classes.countdownItem}>
          {fillZero(2, minutes)}
          {/* <span>MM</span> */}
        </CountDownItem>
        <CountDownItem>:</CountDownItem>
        <CountDownItem className={classes.countdownItem}>
          {fillZero(2, seconds)}
          {/* <span>SS</span> */}
        </CountDownItem>
      </div>
    </>
  )
}

export default TimeCounter
