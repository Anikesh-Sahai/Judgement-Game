import { useState } from 'react'
import { Button } from '@Components/Button'
import type { GameStateDataType } from '@Models/GameModels/Game'
import { Paper } from '@mui/material'
import { ScorecardModal } from '@Components/ScorecardModal'
import { ROUTES } from '@Constants/router.constants'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { NavLink } from 'react-router-dom'
import { useStyles } from './style'

export function GameEnd({ game }: { game: GameStateDataType }) {
  const { classes } = useStyles()

  const [dialogOpen, setDialogOpen] = useState(false)

  if (!game) return null

  const handleOpen = () => setDialogOpen(true)
  const handleClose = () => setDialogOpen(false)

  const { numberOfRounds, playerIds, currentRound, scorecard, players, winner, status } = game

  return (
    <>
      <Paper elevation={10} className={classes.finishedContainer}>
        <h3 className={classes.finishedText}>Game Finished</h3>
        <Button onClick={handleOpen}>Scorecard</Button>
        <NavLink to={ROUTES.AUTH_HOME} className={classes.backToHomeLink}>
          <ArrowBack fontSize='inherit' />
          <span className={classes.backToHomeText}>Back to Home</span>
        </NavLink>
      </Paper>
      <ScorecardModal
        numberOfRounds={numberOfRounds}
        playerIds={playerIds}
        players={players}
        scorecard={scorecard}
        currentRound={currentRound}
        winner={winner}
        status={status}
        open={dialogOpen}
        handleClose={handleClose}
      />
    </>
  )
}
