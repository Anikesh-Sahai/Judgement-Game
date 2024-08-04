import type { GameStateDataType } from '@Models/GameModels/Game'
import { MiniScorecard } from '@Components/MiniScorecard'
import { CardsRemaining } from '@Containers/CardsRemaining'
import { Bidding } from '@Containers/Bidding'
import { CardsOnTable } from '@Components/CardsOnTable'
import { Timer } from '@Components/Timer'
import { Box } from '@mui/material'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useStyles } from './style'

export function GamePlay({ game }: { game: GameStateDataType }) {
  const { classes } = useStyles()
  const auth = useAppSelector((store) => store.root.auth)

  if (!game) return null

  const { _id: gameId, numberOfRounds, playerIds, currentRound, scorecard, players } = game
  const userId = playerIds.at(0)
  const currentUserPlaying = auth.user?._id === userId

  if (!userId) return null

  const bid = scorecard[currentRound.roundNumber - 1]?.[userId]?.bid || 1

  return (
    <>
      <MiniScorecard
        numberOfRounds={numberOfRounds}
        playerIds={playerIds}
        currentRound={currentRound}
        scorecard={scorecard}
        players={players}
      />
      <CardsOnTable playerIds={playerIds} currentRound={currentRound} />
      <CardsRemaining gameId={gameId} playerIds={playerIds} currentRound={currentRound} />
      {currentRound?.state === 'playing' &&
        userId === currentRound?.currentPlayerChanceTime?.userId && (
          <Box className={classes.bottomBtns}>
            <Timer
              type='chance'
              timestamp={currentRound?.currentPlayerChanceTime?.timestamp}
              userId={userId}
            />
          </Box>
        )}
      {currentUserPlaying && (
        <Bidding gameId={gameId} playerIds={playerIds} currentRound={currentRound} bid={bid} />
      )}
    </>
  )
}
