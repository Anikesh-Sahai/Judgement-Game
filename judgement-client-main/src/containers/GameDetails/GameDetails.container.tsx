/* eslint-disable react/no-array-index-key */
import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import moment from 'moment'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useGetGameDetailsQuery } from '@Stores/index'
import { AppLayout } from '@Containers/AppLayout'
import { PlayerAvatar } from '@Components/PlayerAvatar'
import useFetchError from '@Hooks/useFetchError'
import { Error } from '@Components/Error'
import type { RoundDetailsDataType } from '@Models/GameModels/Game'
import type { UserType } from '@Models/UserModels'
import { getMedalSrc, getName, getOrdinalSuffixOf } from '@Utils/helpers'
import theme from '@Themes/theme'
import { Table } from '@Components/Table'
import { Loader } from '@Components/Loader'
import { useStyles } from './style'

interface TotalScoresType {
  [key: string]: number
}

interface RankingType {
  [key: string]: number
}

interface ScoreType {
  [key: string]: number
}

interface ScorecardPropsType {
  players: UserType[]
  scorecard: ScorecardType
  currentUser: UserType
  totalScores: TotalScoresType
}

interface PlayerRankingAvatarPropsType {
  player: UserType
  ranking: RankingType
}

type ScorecardType = ScoreType[]

function getScorecard(rounds: RoundDetailsDataType[]) {
  const scorecard: ScorecardType = []
  rounds.forEach(({ scores }, i) => {
    scorecard.push({})
    scores.forEach(({ user, score }) => {
      scorecard[i][user] = score
    })
  })
  return scorecard
}

function getTotalScores(rounds: RoundDetailsDataType[]) {
  const totalScores: TotalScoresType = {}
  rounds.forEach(({ scores }) => {
    scores.forEach(({ user, score }) => {
      if (!totalScores[user]) {
        totalScores[user] = 0
      }
      totalScores[user] += score
    })
  })
  return totalScores
}

function getRanking(rounds: RoundDetailsDataType[]) {
  const totalScores = getTotalScores(rounds)
  const totalScoresArr = Object.keys(totalScores).map((_id) => ({
    userId: _id,
    score: totalScores[_id],
  }))
  const sortedTotalScoresArr = totalScoresArr.sort((a, b) => b.score - a.score)
  const ranking: RankingType = {}
  let currentPosition = 1
  let skip = 0 // will keep count of how many people have same score continously
  let currentScore = sortedTotalScoresArr[0].score

  sortedTotalScoresArr.forEach(({ userId }) => {
    // if a player with different score is found
    // update currentScore & currentPosition
    if (totalScores[userId] !== currentScore) {
      currentScore = totalScores[userId]
      currentPosition += skip
      skip = 0
    }
    ranking[userId] = currentPosition
    skip += 1
  })

  return ranking
}

function PlayerRankingAvatar({ player, ranking }: PlayerRankingAvatarPropsType) {
  const { classes } = useStyles()
  const rank = ranking[player?._id]
  const [medalSrc, medalName] = getMedalSrc(rank)
  const avatarWidths = [112, 90, 70, 48]
  const avatarWidthsSm = [88, 70, 55, 38]
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      direction='column'
      style={{
        width: matchSm ? avatarWidthsSm[rank - 1] : avatarWidths[rank - 1],
      }}
      className={classes.playerAvatarBox}
    >
      <Grid container justifyContent='center' alignItems='flex-end' className={classes.avatarBox}>
        <PlayerAvatar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          BadgeElement={
            <img
              src={medalSrc}
              alt={medalName}
              className={classes.medalBadge}
              style={{
                height: matchSm ? avatarWidthsSm[rank - 1] / 2 : avatarWidths[rank - 1] / 2,
              }}
            />
          }
          user={player}
          key={`game-player-avatar-${player._id}`}
          style={{
            width: matchSm ? avatarWidthsSm[rank - 1] : avatarWidths[rank - 1],
            height: matchSm ? avatarWidthsSm[rank - 1] : avatarWidths[rank - 1],
          }}
        />
      </Grid>
      <Grid
        container
        justifyContent='flex-start'
        alignItems='center'
        direction='column'
        className={classes.rankBox}
      >
        <Typography variant='h6' className={clsx(classes.text, classes.rankText)}>
          {rank}
          <sup>{getOrdinalSuffixOf(rank)}</sup>
        </Typography>
        <Typography variant='h6' className={clsx(classes.text, classes.nameText)}>
          {getName(player)}
        </Typography>
      </Grid>
    </Grid>
  )
}

function getRankedPlayersInOrder(ranking: RankingType, players: UserType[]) {
  const arr: UserType[] = new Array(players.length)
  const avaialable = players.map(() => true)
  players.forEach((player) => {
    let index = ranking[player._id] - 1
    while (!avaialable[index] && index + 1 < arr.length) {
      index += 1
    }
    arr[index] = player
    avaialable[index] = false
  })
  ;[arr[0], arr[1]] = [arr[1], arr[0]]

  return arr
}

function Scorecard({ players, scorecard, currentUser, totalScores }: ScorecardPropsType) {
  const { classes } = useStyles()

  return (
    <Table>
      <Table.Header className={classes.scorecardTableRow}>
        <div>Round</div>
        {players.map(({ _id, username }) => (
          <div
            key={`heading-${_id}`}
            className={clsx({ [classes.currentPlayerText]: currentUser?._id === _id })}
          >
            {username}
          </div>
        ))}
      </Table.Header>
      <Table.Body>
        {scorecard.map((score, index) => (
          <Table.Row key={`roundscore-${index}`} className={classes.scorecardTableRow}>
            <div>{index + 1}</div>
            {players.map(({ _id }) => (
              <div key={`roundScore-round-${index + 1}-${_id}`}>{score[_id]}</div>
            ))}
          </Table.Row>
        ))}

        <Table.Row key='roundscore-total' className={classes.scorecardTableRow}>
          <div>Total</div>
          {players.map(({ _id }) => (
            <div key={`roundScore-total-${_id}`}>{totalScores[_id]}</div>
          ))}
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export function GameDetails() {
  const { classes } = useStyles()

  const { gameId } = useParams() as { gameId: string }
  const auth = useAppSelector((store) => store.root.auth)

  const { data: gameData, error, isError, isLoading, isSuccess } = useGetGameDetailsQuery(gameId)
  const { errorMsg } = useFetchError('Game', error, isError, gameData?.data, isSuccess)
  const { game } = gameData?.data ?? {}

  if (isLoading || errorMsg) {
    return (
      <AppLayout auth={!!auth.token} navbar mainClassName={classes.mainClassName}>
        {isLoading ? <Loader size={60} /> : <Error errorMsg={errorMsg} />}
      </AppLayout>
    )
  }

  if (!game) return null

  const ranking = getRanking(game.rounds)
  const scorecard = getScorecard(game.rounds)
  const totalScores = getTotalScores(game.rounds)
  const rankedPlayersInOrder = getRankedPlayersInOrder(ranking, game.players)

  return (
    <AppLayout
      auth={!!auth.token}
      navbar
      className={classes.appLayout}
      mainClassName={classes.mainClassName}
    >
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        className={classes.container}
      >
        <Grid
          container
          direction='column'
          alignItems='center'
          className={classes.contentArea}
          gap={3}
        >
          <Grid
            container
            justifyContent='space-between'
            alignItems='center'
            className={classes.headerSection}
          >
            <Typography variant='h6' className={classes.headerText}>
              {`${game.numberOfRounds} Rounds`}
            </Typography>
            <Typography variant='h6' className={classes.headerText}>
              {moment(game.start).format('MMMM Do, YYYY')}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            className={classes.avatarRankingSection}
          >
            {rankedPlayersInOrder.map((player) => (
              <PlayerRankingAvatar
                player={player}
                ranking={ranking}
                key={`player-ranking-avatar-${player._id}`}
              />
            ))}
          </Grid>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            className={classes.scorecardTable}
          >
            <Scorecard
              scorecard={scorecard}
              players={rankedPlayersInOrder}
              currentUser={auth.user}
              totalScores={totalScores}
            />
          </Grid>
        </Grid>
      </Grid>
    </AppLayout>
  )
}
