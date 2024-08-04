/* eslint-disable no-nested-ternary */
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import theme from '@Themes/theme'
import { SelectDropdown } from '@Components/SelectDropdown'
import { useGetGameStatsQuery } from '@Stores/index'
import type { GameStatsDataType, GameStatsPeriodType } from '@Models/GameModels/Game'
import useFetchError from '@Hooks/useFetchError'
import { Loader } from '@Components/Loader'
import { Error } from '@Components/Error'
import { useStyles } from './style'

const getData = ({
  firstPosition,
  secondPosition,
  thirdPosition,
  fourthPosition,
  unrankedGames,
}: GameStatsDataType) => [
  { id: 0, value: firstPosition, label: '1st Ranked', color: '#DA1D1D' },
  { id: 1, value: secondPosition, label: '2nd Ranked', color: '#D1CE1F' },
  { id: 2, value: thirdPosition, label: '3rd Ranked', color: '#5BE01F' },
  { id: 3, value: fourthPosition, label: '4th Ranked', color: '#1D96DE' },
  { id: 4, value: unrankedGames, label: 'Unranked', color: '#301A47' },
]

const timeWithValue: {
  value: GameStatsPeriodType
  text: string
}[] = [
  {
    value: 'allTime',
    text: 'All Time',
  },
  {
    value: 'yearly',
    text: 'This Year',
  },
  {
    value: 'monthly',
    text: 'This Month',
  },
  {
    value: 'weekly',
    text: 'This Week',
  },
  {
    value: 'daily',
    text: 'Today',
  },
]

export function PlayerStats({ username }: { username: string }) {
  const match380 = useMediaQuery(theme.breakpoints.down(380))
  const match650 = useMediaQuery('@media (min-height: 650px)')
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'))
  const { classes } = useStyles()
  const [period, setPeriod] = useState(timeWithValue[0].value)
  const { data, isFetching, isSuccess, error, isError } = useGetGameStatsQuery({ username, period })
  const gameStats = data?.data
  const { errorMsg } = useFetchError('Game', error, isError, gameStats, isSuccess)

  const { totalGames = 0 } = gameStats ?? {}

  return (
    <Grid container className={classes.statsContainer}>
      <Grid
        item
        container
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        className={classes.topBar}
      >
        <Typography className={classes.heading}>
          Games Played: {isSuccess ? totalGames : 0}
        </Typography>

        <SelectDropdown
          selected={period}
          setSelected={setPeriod}
          options={timeWithValue}
          tooltipTitle='Period'
        />
      </Grid>
      <Grid item container className={classes.chart} alignItems='center'>
        {isFetching ? (
          <Loader />
        ) : isSuccess ? (
          totalGames === 0 ? (
            <Error errorMsg='No data found' />
          ) : (
            <PieChart
              series={[
                {
                  data: gameStats ? getData(gameStats) : [],
                },
              ]}
              height={match650 && !matchSm ? 220 : 160}
              width={match380 ? 350 : undefined}
              sx={{
                [`& .MuiChartsLegend-root`]: {
                  width: '100%',
                  fill: theme.palette.primary.contrastText,
                  fontWeight: 'bold',
                  '& .MuiChartsLegend-series text': {
                    fontWeight: '400 !important',
                    fill: `${theme.palette.primary.contrastText} !important`,
                    color: theme.palette.primary.contrastText,
                    fontSize: 'clamp(8px, 6px + 0.8vw + 0.5vh, 17px) !important',
                  },
                },
                color: theme.palette.primary.contrastText,
              }}
            />
          )
        ) : isError ? (
          <Error errorMsg={errorMsg} />
        ) : null}
      </Grid>
    </Grid>
  )
}
