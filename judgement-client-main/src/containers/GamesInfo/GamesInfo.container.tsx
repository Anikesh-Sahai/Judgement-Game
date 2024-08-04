import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import { PlayerStats } from '@Containers/PlayerStats'
import { GameHistory } from '@Containers/GameHistory'
import { useStyles } from './style'

export function GamesInfo() {
  const { classes } = useStyles()
  const { username } = useParams() as { username: string }

  return (
    <Grid container item flexDirection='column' className={classes.gameInfoContainer}>
      <Grid item container className={classes.stats}>
        <PlayerStats username={username} />
      </Grid>
      <Grid item container className={classes.gameHistory}>
        <GameHistory type='user' id={username} />
      </Grid>
    </Grid>
  )
}
