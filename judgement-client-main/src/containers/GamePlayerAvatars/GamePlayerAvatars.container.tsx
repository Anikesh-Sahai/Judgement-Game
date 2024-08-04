import clsx from 'clsx'
import { Box, Avatar, type BadgeOrigin } from '@mui/material'
import { PlayerAvatar } from '@Components/PlayerAvatar'
import { SpeakerButton } from '@Containers/GameButtons'
import type {
  CurrentRoundDataType,
  GamePlayerIdsType,
  GamePlayersType,
} from '@Models/GameModels/Game'
import { Timer } from '@Components/Timer'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useStyles } from './styles'

const badgeOrigins: BadgeOrigin[] = [
  {
    vertical: 'bottom',
    horizontal: 'right',
  },
  {
    vertical: 'bottom',
    horizontal: 'right',
  },
  {
    vertical: 'top',
    horizontal: 'right',
  },
  {
    vertical: 'bottom',
    horizontal: 'left',
  },
]

interface GamePlayerAvatarsProps {
  playerIds: GamePlayerIdsType
  players: GamePlayersType
  currentRound?: CurrentRoundDataType
}

export function GamePlayerAvatars({ playerIds, players, currentRound }: GamePlayerAvatarsProps) {
  const { classes } = useStyles()

  const avatarClasses = [
    classes.playerZero,
    classes.playerOne,
    classes.playerTwo,
    classes.playerThree,
  ]

  const auth = useAppSelector((store) => store.root.auth)

  if (!playerIds || !players) return null

  return (
    <>
      {playerIds.map(
        (playerId, index) =>
          !(index === 0 && auth.user._id === playerIds[0]) &&
          (playerId ? (
            <Box
              key={`game-player-avatar-${playerId}`}
              className={clsx(classes.avatars, avatarClasses[index])}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: '1',
                  pointerEvents: 'none',
                }}
              >
                {currentRound?.state === 'playing' &&
                  currentRound?.currentPlayerChanceTime?.userId === playerId && (
                    <Timer
                      type='chance'
                      timestamp={currentRound?.currentPlayerChanceTime?.timestamp}
                      userId={playerId}
                      fullSize
                    />
                  )}
                {currentRound?.state === 'bidding' &&
                  currentRound?.currentPlayerBiddingTime?.userId === playerId && (
                    <Timer
                      type='bid'
                      timestamp={currentRound?.currentPlayerBiddingTime?.timestamp}
                      userId={playerId}
                      fullSize
                    />
                  )}
              </Box>
              <PlayerAvatar
                anchorOrigin={badgeOrigins[index]}
                BadgeElement={<SpeakerButton className={classes.badgeBtn} />}
                user={players[playerId]?.user}
                className={classes.playerAvatar}
                sizeOverride
              />
            </Box>
          ) : (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={`player-avatar-${index}`}
              className={clsx(classes.avatars, avatarClasses[index])}
            >
              <Avatar className={classes.playerAvatar} />
            </Box>
          )),
      )}
    </>
  )
}
