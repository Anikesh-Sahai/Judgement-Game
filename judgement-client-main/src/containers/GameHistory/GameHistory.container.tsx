import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import moment from 'moment'
import { Table } from '@Components/Table'
import { Grid, Typography, AvatarGroup, Box } from '@mui/material'
import type {
  GameHistoryGameDataType,
  GameHistoryGamePlayerDataType,
  GameHistoryRequestDataType,
  GameHistoryRequestIdType,
  GameHistoryResponseType,
  GameStateStatusType,
} from '@Models/GameModels/Game'
import { useMemo } from 'react'
import { useLazyLoading } from '@Hooks/useLazyLoading'
import { useLazyGetGameHistoryQuery } from '@Stores/index'
import { RESPONSE } from '@Constants/response.constants'
import { Error } from '@Components/Error'
import useFetchError from '@Hooks/useFetchError'
import { useAppSelector } from '@Hooks/redux.hooks'
import { GameHistoryGameSkeleton } from '@Components/GameHistoryGameSkeleton'
import { PlayerAvatar } from '@Components/PlayerAvatar'
import { ControlledTooltip } from '@Components/ControlledTooltip'
import { getMedalSrc } from '@Utils/helpers'
import { useStyles } from './styles'

interface GameAvatarsPropsType {
  players: GameHistoryGamePlayerDataType[]
  gameStatus: GameStateStatusType
}

function GameAvatars({ players, gameStatus }: GameAvatarsPropsType) {
  const { classes } = useStyles()

  return (
    <AvatarGroup spacing={-3} className={classes.avatarGroup}>
      {players.map((player) => {
        const [medalSrc, altText] = getMedalSrc(player.position)
        return (
          <PlayerAvatar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            BadgeElement={
              medalSrc && gameStatus !== 'playing' ? (
                <img src={medalSrc} alt={altText} className={classes.medalBadge} />
              ) : undefined
            }
            user={player}
            key={`game-player-avatar-${player._id}`}
          />
        )
      })}
    </AvatarGroup>
  )
}

function getColumnPercentages(type: GameHistoryType) {
  switch (type) {
    case 'group':
      return '15% 15% 15% 15% 40%'
    case 'user':
      return '15% 15% 15% 15% 40%'
    default:
      return '15% 15% 15% 15% 40%'
  }
}

type GameHistoryType = 'user' | 'group'

export interface GameHistoryPropsType {
  id: GameHistoryRequestIdType
  type: GameHistoryType
}

export function GameHistory({ id, type }: GameHistoryPropsType) {
  const { classes } = useStyles()
  const currentPlayer = useAppSelector((store) => store.root.auth.user)
  const currentPlayerUsername = type === 'group' ? currentPlayer.username : id

  const columnPercentages = getColumnPercentages(type)

  const requestArgs = useMemo(
    () => ({
      id,
    }),
    [id],
  )
  const documentsLimit = RESPONSE.GAME_HISTORY_GAMES_LIMIT
  const { games: gamesKey } = useAppSelector((store) => store.refetch)

  const { trackedRef, showDetector, results, state } = useLazyLoading<
    GameHistoryRequestDataType,
    GameHistoryResponseType
  >(useLazyGetGameHistoryQuery, requestArgs, 1, documentsLimit, gamesKey)

  const { pages, isFetching, isSuccess, loadErrorMsg } = state
  const { isError, error } = results

  const games: GameHistoryGameDataType[] = []
  pages.forEach((page) => {
    games.push(...page.data.games)
  })

  const { errorMsg } = useFetchError('Games', error, isError, games, isSuccess)

  const errorMessage = errorMsg || loadErrorMsg

  if (isError) {
    return <Error errorMsg={errorMessage} />
  }

  return (
    <>
      <Grid item alignSelf='flex-start' className={classes.bottomHeading}>
        <Typography variant='h4' fontSize='inherit'>
          Game History
        </Typography>
      </Grid>
      <Grid
        container
        direction='row'
        alignItems='center'
        gap={2}
        className={clsx(classes.bottomScrollableComponents, classes.gameHistoryTable)}
      >
        <Table>
          <Table.Header columnPercentages={columnPercentages}>
            <div>Played</div>
            <div>Rounds</div>
            <div>Score</div>
            <div>Position</div>
            <div>Players</div>
          </Table.Header>
          <Table.Body>
            {isSuccess &&
              (games.length === 0 ? (
                <Typography variant='h6'>No games played</Typography>
              ) : (
                games.map((game) => {
                  const gamePlayer = game.players.find(
                    (player) => player.username === currentPlayerUsername,
                  )
                  return (
                    <Box key={`table-game-${game._id}`} className={classes.tableRowBox}>
                      <ControlledTooltip
                        title={moment(game.start).format(
                          game.status === 'playing'
                            ? '[Started on] D MMM YYYY, hh:mm A[. Click to go to the game.]'
                            : '[Played on] D MMM YYYY, hh:mm A[. Click for details.]',
                        )}
                      >
                        <NavLink
                          to={`/games/${game._id}`}
                          className={classes.gameHistoryGameLink}
                        />
                      </ControlledTooltip>
                      <Table.Row
                        columnPercentages={columnPercentages}
                        style={game.status === 'playing' ? { background: '#000' } : undefined}
                      >
                        <div>{moment(game.start).fromNow(true)}</div>
                        <div>{game.numberOfRounds ?? '-'}</div>
                        <div>{game.status === 'playing' ? '-' : gamePlayer?.totalScore ?? '-'}</div>
                        <div>{game.status === 'playing' ? '-' : gamePlayer?.position ?? '-'}</div>
                        <div className={classes.playerColumn}>
                          <GameAvatars players={game.players} gameStatus={game.status} />
                        </div>
                      </Table.Row>
                    </Box>
                  )
                })
              ))}
            {isFetching &&
              [...Array(documentsLimit).keys()].map((key) => (
                <GameHistoryGameSkeleton key={`table-game-skeleton-${key}`} />
              ))}
            {showDetector && (
              <Box ref={trackedRef} sx={{ width: '100%' }}>
                <GameHistoryGameSkeleton key='table-game-skeleton-track' />
              </Box>
            )}
          </Table.Body>
        </Table>
      </Grid>
    </>
  )
}
