import clsx from 'clsx'
import { useState } from 'react'
import { Grid, IconButton, Paper, Typography, useMediaQuery } from '@mui/material'
import type {
  CurrentRoundDataType,
  GamePlayerIdsType,
  GamePlayersType,
  RoundScoreDataType,
} from '@Models/GameModels/Game'
import scorecardIcon from '@Assets/icons/scorecard.png'
import CloseIcon from '@mui/icons-material/Close'
import popOutIcon from '@Assets/icons/pop-out.png'
import theme from '@Themes/theme'
import { ScorecardModal } from '@Components/ScorecardModal'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useStyles } from './style'

function PlayerScore({
  made,
  bid,
  current,
}: {
  made: number | null
  bid: number | null
  current: boolean
}) {
  const { classes } = useStyles()

  return (
    <div
      className={clsx(classes.playerScoreArea, classes.playerScore, {
        [classes.currentPlayerScore]: current,
      })}
    >
      <Typography variant='h6' className={clsx(classes.score, classes.madeScore)}>
        {made || made === 0 ? made : '-'}
      </Typography>
      <div
        className={clsx(classes.scoreSlash, {
          [classes.scoreSlashCurrent]: current,
          [classes.scoreSlashOther]: !current,
        })}
      />
      <Typography variant='h6' className={clsx(classes.score, classes.bidScore)}>
        {bid || bid === 0 ? bid : '-'}
      </Typography>
    </div>
  )
}

interface MiniScorecardProps {
  numberOfRounds: number
  playerIds: GamePlayerIdsType
  currentRound: CurrentRoundDataType
  scorecard: RoundScoreDataType[]
  players: GamePlayersType
}

export function MiniScorecard({
  numberOfRounds,
  playerIds,
  currentRound,
  scorecard,
  players,
}: MiniScorecardProps) {
  const { classes } = useStyles()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [miniCardOpen, setMiniCardOpen] = useState(false)
  const match450 = useMediaQuery(theme.breakpoints.down(450))
  const auth = useAppSelector((store) => store.root.auth)
  const handleOpen = () => setDialogOpen(true)
  const handleClose = () => setDialogOpen(false)

  if (!playerIds || !currentRound || !scorecard || !players) return null

  const { roundNumber } = currentRound
  const currentRoundScorecard = scorecard.at(roundNumber - 1)
  const userId = auth.user?._id

  return (
    <Paper elevation={8}>
      {!miniCardOpen && match450 && (
        <IconButton className={classes.miniScorecardBtn} onClick={() => setMiniCardOpen(true)}>
          <img src={scorecardIcon} alt='scorecard-icon' className={classes.scorecardIcon} />
          <Typography>Score</Typography>
        </IconButton>
      )}
      {(miniCardOpen || !match450) && (
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          className={classes.miniScorecard}
        >
          {match450 && (
            <IconButton onClick={() => setMiniCardOpen(false)} className={classes.closeBtn}>
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          )}
          <IconButton onClick={handleOpen} className={classes.popOutBtn}>
            <img src={popOutIcon} alt='pop-out' className={classes.popOutIcon} />
          </IconButton>
          <Grid item>
            <Typography variant='h5' className={classes.miniScorecardTitle}>
              Round {roundNumber} of {numberOfRounds}
            </Typography>
          </Grid>
          <Grid item container justifyContent='space-around' alignItems='center'>
            {playerIds?.map(
              (playerId) =>
                currentRoundScorecard && (
                  <Grid
                    item
                    xs={2.4}
                    key={`player-score-${playerId}`}
                    container
                    direction='column'
                    alignItems='center'
                    className={classes.scoreColumn}
                  >
                    <Typography
                      variant='h6'
                      className={clsx(classes.playerScore, classes.playerScoreName, {
                        [classes.currentPlayerScore]: playerId === userId,
                      })}
                    >
                      {playerId === userId
                        ? 'You'
                        : playerId
                        ? players[playerId]?.user?.username ?? '-'
                        : '-'}
                    </Typography>
                    <PlayerScore
                      made={playerId ? currentRoundScorecard[playerId]?.made : null}
                      bid={playerId ? currentRoundScorecard[playerId]?.bid : null}
                      current={playerId === userId}
                    />
                  </Grid>
                ),
            )}
          </Grid>
        </Grid>
      )}
      <ScorecardModal
        numberOfRounds={numberOfRounds}
        playerIds={playerIds}
        players={players}
        scorecard={scorecard}
        currentRound={currentRound}
        open={dialogOpen}
        handleClose={handleClose}
      />
    </Paper>
  )
}
