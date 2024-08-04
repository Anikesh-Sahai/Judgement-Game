import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { Button } from '@Components/Button'
import type { GameStateDataType } from '@Models/GameModels/Game'
import { GameSlider } from '@Components/GameSlider'
import { useSetReadyMutation, useSetRoundsMutation, useStartGameMutation } from '@Stores/index'
import { ControlledTooltip } from '@Components/ControlledTooltip'
import { useStyles } from './style'

export function GameLobby({ game }: { game: GameStateDataType }) {
  const { classes } = useStyles()

  const [setRounds, { isSuccess, isLoading }] = useSetRoundsMutation()
  const [setReady, { isLoading: isReadyLoading }] = useSetReadyMutation()
  const [startGame, { isLoading: isStartLoading }] = useStartGameMutation()

  const [dialogOpen, setDialogOpen] = useState(false)
  const handleOpen = () => setDialogOpen(true)
  const handleClose = () => setDialogOpen(false)

  const handleRoundsUpdate = (value: number) => {
    setRounds({ gameId: game._id, numberOfRounds: value })
  }

  const readyToStart = game.playerIds.filter((id) => !!id).length === 4

  const currentPlayerId = game.playerIds?.at(0)

  useEffect(() => {
    if (isSuccess) {
      handleClose()
    }
  }, [isSuccess])

  if (!game || !currentPlayerId) return null

  return (
    <>
      <Box className={classes.bottomBtns}>
        {game.admin === game.playerIds.at(0) ? (
          <Button onClick={handleOpen} className={clsx(classes.roundDisplay, classes.roundBtn)}>
            <Typography fontSize='inherit'>{game.numberOfRounds} Rounds</Typography>
            <ModeEditOutlineOutlinedIcon className={classes.editIcon} />
          </Button>
        ) : (
          <Box className={classes.roundDisplay}>
            <Typography fontSize='inherit'>{game.numberOfRounds} Rounds</Typography>
          </Box>
        )}
        {currentPlayerId === game.admin ? (
          <ControlledTooltip title='Need 4 players to start game' style={{ display: 'block' }}>
            <Box>
              <Button
                onClick={() => startGame({ gameId: game._id })}
                disabled={!readyToStart}
                loading={isStartLoading}
                className={classes.startBtn}
              >
                Start
              </Button>
            </Box>
          </ControlledTooltip>
        ) : game.players[currentPlayerId]?.ready ? (
          <Button
            onClick={() => setReady({ gameId: game._id, ready: false })}
            loading={isReadyLoading}
            className={clsx(classes.startBtn, classes.notReadyBtn)}
          >
            You are Ready
          </Button>
        ) : (
          <Button
            onClick={() => setReady({ gameId: game._id, ready: true })}
            loading={isReadyLoading}
            className={classes.startBtn}
          >
            Ready
          </Button>
        )}
      </Box>
      {game.admin === game.playerIds.at(0) && (
        <GameSlider
          type='round'
          open={dialogOpen}
          value={game.numberOfRounds}
          loading={isLoading}
          min={2}
          max={10}
          handleUpdate={handleRoundsUpdate}
          handleClose={handleClose}
        />
      )}
    </>
  )
}
