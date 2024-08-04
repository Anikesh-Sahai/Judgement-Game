import { useParams } from 'react-router-dom'
import { Box, Grid } from '@mui/material'
import heroImg from '@Assets/images/hero-img.png'
import { useAppSelector } from '@Hooks/redux.hooks'
import { AddPlayerButton, ExitButton, MicButton, SpeakerButton } from '@Containers/GameButtons'
import { useGetGameStateQuery } from '@Stores/index'
import { GameLobby } from '@Containers/GameLobby'
import { GamePlay } from '@Containers/GamePlay'
import type { GamePlayerIdsType, GameStateDataType } from '@Models/GameModels/Game'
import { GamePlayerAvatars } from '@Containers/GamePlayerAvatars'
import { GameEnd } from '@Containers/GameEnd'
import useFetchError from '@Hooks/useFetchError'
import { Loader } from '@Components/Loader'
import { Error } from '@Components/Error'
import { useStyles } from './style'

function rotatePlayerIds(playerIds: GamePlayerIdsType, userId: string) {
  const index = playerIds.indexOf(userId)
  return [...playerIds.slice(index, 4), ...playerIds.slice(0, index)]
}

export function GameLayout() {
  const { classes } = useStyles()

  const { gameId } = useParams() as { gameId: string }
  const auth = useAppSelector((store) => store.root.auth)
  const { data: gameData, error, isError, isLoading, isSuccess } = useGetGameStateQuery(gameId)
  const { errorMsg } = useFetchError('Game', error, isError, gameData?.data, isSuccess)
  const gameResponse = gameData?.data.game

  if (isLoading) {
    return (
      <Grid container justifyContent='center' alignItems='center' className={classes.gameScreen}>
        <Loader />
      </Grid>
    )
  }

  if (errorMsg) {
    return (
      <Grid container justifyContent='center' alignItems='center' className={classes.gameScreen}>
        <Error errorMsg={errorMsg} />
      </Grid>
    )
  }

  if (!gameResponse) return null

  const userId = auth.user._id
  const playerIds = gameResponse.playerIds ? rotatePlayerIds(gameResponse.playerIds, userId) : []
  const game: GameStateDataType = {
    ...gameResponse,
    playerIds,
  }

  return (
    <Grid container justifyContent='center' alignItems='center' className={classes.gameScreen}>
      <Box className={classes.gameArea}>
        <figure className={classes.heroFigure}>
          <img src={heroImg} alt='Judgement' className={classes.heroImg} />
        </figure>

        <GamePlayerAvatars
          playerIds={game.playerIds}
          players={game.players}
          currentRound={game.currentRound}
        />

        <Box className={classes.btns}>
          <AddPlayerButton
            gameId={game._id}
            players={game.players}
            invites={game.invites}
            groupId={game.group}
          />
          <MicButton />
          <SpeakerButton />
          <ExitButton />
        </Box>

        {game.status === 'lobby' && auth.user._id === playerIds[0] && <GameLobby game={game} />}
        {game.status === 'playing' && <GamePlay game={game} />}
        {game.status === 'gameEnd' && <GameEnd game={game} />}
      </Box>
    </Grid>
  )
}
