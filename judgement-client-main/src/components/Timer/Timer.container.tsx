/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { CircularProgressWithLabel } from '@Components/CircularProgressWithLabel'
import { GAME } from '@Constants/game.constants'

type TimerType = 'chance' | 'bid'

interface TimerProps {
  timestamp?: number
  userId: string
  type?: TimerType
  fullSize?: boolean
}

const getPeriod = (type: TimerType) => {
  switch (type) {
    case 'chance':
      return GAME.CHANCE_TIME
    case 'bid':
      return GAME.BIDDING_TIME
    default:
      return GAME.CHANCE_TIME
  }
}

export function Timer({ timestamp, userId, type = 'chance', fullSize = false }: TimerProps) {
  const match300 = useMediaQuery('@media (max-height: 300px)')

  const [chanceTimeRemaining, setChanceTimeRemaining] = useState(
    Math.floor(((timestamp ?? 0) + getPeriod(type) - Date.now()) / 1000),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = Math.floor(((timestamp ?? 0) + getPeriod(type) - Date.now()) / 1000)
      setChanceTimeRemaining(newTime >= 0 ? newTime : 0)
    })
    return () => clearInterval(interval)
  }, [timestamp, userId, type])

  if (!userId || chanceTimeRemaining <= 0) return null

  return (
    <CircularProgressWithLabel
      size={fullSize ? '100%' : match300 ? 30 : 45}
      value={(100 * chanceTimeRemaining) / 30}
      label={`${chanceTimeRemaining}`}
      fullSize={fullSize}
    />
  )
}
