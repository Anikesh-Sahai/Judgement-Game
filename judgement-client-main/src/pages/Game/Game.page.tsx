import { Grid } from '@mui/material'
import { GameLayout } from '@Containers/GameLayout'
import { useParams } from 'react-router-dom'
import { useGetGameStatusQuery } from '@Stores/index'
import useFetchError from '@Hooks/useFetchError'
import { Error } from '@Components/Error'
import { Loader } from '@Components/Loader'
import { GameDetails } from '@Containers/GameDetails'
import { useStyles } from './style'

export function Game() {
  const { classes } = useStyles()

  const { gameId } = useParams() as { gameId: string }
  const { data, isLoading, error, isError, isSuccess } = useGetGameStatusQuery(gameId, {
    refetchOnMountOrArgChange: true,
  })

  const { errorMsg } = useFetchError('Game', error, isError, data?.data, isSuccess)

  if (isLoading) {
    return (
      <Grid justifyContent='center' alignItems='center' className={classes.gamePage}>
        <Loader />
      </Grid>
    )
  }

  if (errorMsg) {
    return (
      <Grid justifyContent='center' alignItems='center' className={classes.gamePage}>
        <Error errorMsg={errorMsg} />
      </Grid>
    )
  }

  const { status } = data?.data ?? {}

  return (
    <>
      {status && <GameLayout />}
      {!status && <GameDetails />}
    </>
  )
}
