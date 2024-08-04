/* eslint-disable react/require-default-props */
import clsx from 'clsx'
import { Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import scorecardIcon from '@Assets/icons/scorecard.png'
import CloseIcon from '@mui/icons-material/Close'
import { Table } from '@Components/Table'
import type {
  CurrentRoundDataType,
  GamePlayerIdsType,
  GamePlayersType,
  RoundScoreDataType,
} from '@Models/GameModels/Game'
import Trophy from '@Assets/icons/Trophy'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useStyles } from './style'

type ScorecardType = (number | string)[][]

function getScorecard(
  numberOfRounds: number,
  scorecard: RoundScoreDataType[],
  currentRound: CurrentRoundDataType,
  playerIds: GamePlayerIdsType,
  status: string,
): ScorecardType {
  const scorecardTable: ScorecardType = Array.from({ length: numberOfRounds }, () =>
    Array.from({ length: 4 }, () => '-'),
  )

  return scorecardTable.map((curScores, index) => {
    const isCurrentRound = index + 1 === currentRound.roundNumber && status !== 'gameEnd'
    const roundScores = scorecard?.at(index)

    return roundScores
      ? playerIds.map((playerId) => {
          if (!playerId) {
            return '-'
          }
          const made = roundScores[playerId]?.made
          const bid = roundScores[playerId]?.bid
          if ((!made && made !== 0) || !bid) return '-'
          let score = 10 * made
          if (made > bid) {
            score = bid * 10 + (made - bid)
          }
          if (!isCurrentRound && bid > made) {
            score = -10 * bid
          }
          return score
        })
      : curScores
  })
}

function getTotalScores(scorecard: ScorecardType) {
  const totalScores = [0, 0, 0, 0]
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < scorecard.length; j += 1) {
      const score = scorecard[j][i]
      if (typeof score === 'number') totalScores[i] += score
    }
  }

  return totalScores
}

interface ScorecardModalProps {
  numberOfRounds: number
  currentRound: CurrentRoundDataType
  playerIds: GamePlayerIdsType
  players: GamePlayersType
  scorecard: RoundScoreDataType[]
  status?: string
  winner?: string[]
  open: boolean
  handleClose: () => void
}

export function ScorecardModal({
  numberOfRounds,
  currentRound,
  playerIds,
  players,
  scorecard,
  status = 'playing',
  winner = [],
  open,
  handleClose,
}: ScorecardModalProps) {
  const { classes } = useStyles()

  // this scorecard modal display is totally dependent on playerIds,
  // so if game ends and players leave then whoever leaves, their score won't be visible, which is bad for future
  // will bring in some other way to get scorecard display option in future
  const scorecardTable = getScorecard(numberOfRounds, scorecard, currentRound, playerIds, status)
  const totalScores = getTotalScores(scorecardTable)
  const auth = useAppSelector((store) => store.root.auth)
  const userId = auth.user?._id

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='game-scorecard'
      className={clsx(classes.dialog, classes.scorecardDialog)}
    >
      <IconButton onClick={handleClose} className={classes.closeBtn}>
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
      <DialogTitle id='game-scorecard' className={classes.scorecardTitle}>
        <img src={scorecardIcon} alt='scorecard-icon' className={classes.scorecardIcon} />
        <Typography fontSize='inherit'>Scorecard</Typography>
      </DialogTitle>
      <DialogContent className={classes.scorecardDialogContent}>
        <Table>
          <Table.Header className={classes.scorecardTableRow}>
            <div>Round</div>
            {playerIds.map((playerId) => (
              <div
                key={`heading-${playerId}`}
                className={clsx({ [classes.currentPlayerText]: playerId === userId })}
              >
                {playerId === userId
                  ? 'You'
                  : playerId
                  ? players[playerId]?.user?.username ?? '-'
                  : '-'}
              </div>
            ))}
          </Table.Header>
          <Table.Body>
            {scorecardTable.map((roundScore, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Table.Row key={`roundscore-${index}`} className={classes.scorecardTableRow}>
                <div>{index + 1}</div>
                {roundScore.map((score, i) => (
                  <div key={`roundScore-round-${index + 1}-${playerIds[i]}`}>{score}</div>
                ))}
              </Table.Row>
            ))}

            <Table.Row key='roundscore-total' className={classes.scorecardTableRow}>
              <div>Total</div>
              {totalScores.map((score, index) => (
                <div key={`roundScore-total-${playerIds[index]}`}>{score}</div>
              ))}
            </Table.Row>

            {winner.length ? (
              <Table.Row key='game-position' className={classes.scorecardTableRow}>
                <div>Winner</div>
                {playerIds.map((playerId) =>
                  winner.some((id) => id === playerId) ? (
                    <div key={`game-winner-${playerId}`}>
                      <Trophy />
                    </div>
                  ) : (
                    <div />
                  ),
                )}
              </Table.Row>
            ) : null}
          </Table.Body>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
