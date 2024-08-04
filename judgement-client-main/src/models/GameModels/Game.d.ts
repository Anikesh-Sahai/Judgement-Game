import type { GroupSlugType } from '@Models/GroupModels'
import type { ResponseType } from '@Models/ResponseModels'
import type { UserType } from '@Models/UserModels'
import type { UsernameType } from '@Models/UserModels/User'

export interface GameInviteStateDataType {
  [key: string]: number
}

export interface ScoreDataType {
  bid: number
  made: number
}

export interface RoundScoreDataType {
  [key: string]: ScoreDataType
}

export interface CardsRemainingDataType {
  [key: string]: number[]
}

export interface CurrentPlayerChanceDataType {
  userId: string
  timestamp: number
}

export interface CardsOnTableDataType {
  [key: string]: number
}

export interface CurrentPlayerBiddingTimeDataType {
  userId: string
  timestamp: number
}

export interface CurrentChanceDataType {
  chanceNumber: number
  suit?: number
}

export type GameRoundStateType = 'bidding' | 'playing' | 'end'

export interface CurrentRoundDataType {
  roundNumber: number
  currentChance: CurrentChanceDataType
  roundId: string
  cardsRemaining: CardsRemainingDataType
  state: GameRoundStateType
  currentPlayerChanceTime: CurrentPlayerChanceDataType
  cardsOnTable: CardsOnTableDataType
  currentPlayerBiddingTime: CurrentPlayerBiddingTimeDataType
}

export interface GamePlayerType {
  tablePosition: number
  ready?: boolean
  addedAt?: number
  disconnected?: boolean
  user: UserType
}

export interface GamePlayersType {
  [key: string]: GamePlayerType
}

export type GameStateStatusType = 'lobby' | 'playing' | 'gameEnd'

export type GameDetailsStatusType = 'ranked' | 'unranked'

export type GamePlayerIdsType = (string | null)[]

export interface GameStateDataType {
  _id: string
  status: GameStateStatusType
  players: GamePlayersType
  playerIds: GamePlayerIdsType
  invites: GameInviteStateDataType
  scorecard: RoundScoreDataType[]
  admin: string
  numberOfRounds: number
  group?: string
  trump?: number
  currentRound: CurrentRoundDataType
  winner?: string[]
}

export interface ScoreDetailsDataType {
  _id: string
  user: string
  bid: number
  made: number
  score: number
}

export interface RoundDetailsDataType {
  _id: string
  roundNumber: string
  createdAt: string
  scores: ScoreDetailsDataType[]
}

export interface GameDetailsDataType {
  _id: string
  status: GameDetailsStatusType
  players: UserType[]
  scorecard: RoundScoreDataType[]
  admin: string
  numberOfRounds: number
  group?: string
  winner?: string[]
  start: string
  createdAt: string
  updatedAt: string
  rounds: RoundDetailsDataType[]
}

export interface GameStatusResponseType extends ResponseType {
  data: {
    status: boolean
  }
}

export interface GameStateResponseType extends ResponseType {
  data: {
    game: GameStateDataType
  }
}

export interface GameDetailsResponseType extends ResponseType {
  data: {
    game: GameDetailsDataType
  }
}

export type GameHistoryRequestIdType = UsernameType | GroupSlugType

export interface GameHistoryRequestDataType {
  id: GameHistoryRequestIdType
}

export interface GameHistoryGamePlayerDataType extends UserType {
  totalScore: number
  position: number
}

export interface GameHistoryGameDataType {
  _id: string
  players: GameHistoryGamePlayerDataType[]
  winner: string[]
  admin: string
  status: GameStateStatusType
  start: string
  group: string | null
  numberOfRounds: number
  updatedAt: string
}

export interface GameHistoryResponseType extends ResponseType {
  data: {
    games: GameHistoryGameDataType[]
  }
  results: number
}

export type GameStatsPeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'allTime'

export interface GameStatsRequestType {
  username: UsernameType
  period: GameStatsPeriodType
}

export interface GameStatsDataType {
  totalGames: number
  unrankedGames: number
  firstPosition: number
  secondPosition: number
  thirdPosition: number
  fourthPosition: number
}

export interface GameStatsResponseType extends ResponseType {
  data: GameStatsDataType
}

export interface GameCreateRequestDataType {
  requestData?: {
    group: string
  }
}

export interface SendGameInviteRequestDataType {
  gameId: string
  userId: string
}

export interface SendGameInviteResponseType {
  invitedBy: UserType
  timestamp: number
  gameId: string
}

export interface SetRoundsRequestDataType {
  gameId: string
  numberOfRounds: number
}

export interface SetReadyRequestDataType {
  gameId: string
  ready: boolean
}

export interface StartGameRequestDataType {
  gameId: string
}

export interface SetBidRequestDataType {
  gameId: string
  bid: number
}

export interface ThrowCardRequestDataType {
  gameId: string
  card: number
}

export interface GameSocketSendInviteEventDataType {
  timestamp: number
  userId: string
}

export interface GameSocketUserJoinedEventDataType {
  player: GamePlayerType
}

export interface GameSocketSetRoundsEventDataType {
  numberOfRounds: number
}

export interface GameSocketSetReadyEventDataType {
  userId: string
  ready: boolean
}

export interface GameSocketStartGameEventDataType {
  status: GameStateStatusType
  trump: number
}

export interface GameSocketRoundChangedEventDataType {
  currentRound: CurrentRoundDataType
}

export interface GameSocketBiddingTurnEventDataType {
  currentPlayerBiddingTime: CurrentPlayerBiddingTimeDataType
}

export interface GameSocketSetBidEventDataType {
  bid: ScoreDataType
  userId: string
}

export interface GameSocketBiddingDoneEventDataType {
  currentPlayerBiddingTime: CurrentPlayerBiddingTimeDataType
  state: GameRoundStateType
}

export interface GameSocketChanceTurnEventDataType {
  currentPlayerChanceTime: CurrentPlayerChanceDataType
  currentChance: CurrentChanceDataType
}

export interface GameSocketCardsOnTableEventDataType {
  cardsOnTable: CardsOnTableDataType
}

export interface GameSocketThrowCardEventDataType {
  cardsRemaining: CardsRemainingDataType
}

export interface GameSocketChanceChangeEventDataType {
  currentRoundData: Pick<
    CurrentRoundDataType,
    'cardsOnTable' | 'currentPlayerChanceTime' | 'currentChance'
  >
  scorecard: RoundScoreDataType[]
}

export interface GameSocketGameEndEventDataType {
  winner?: string[]
  scorecard?: RoundScoreDataType[]
  status: GameStateStatusType
}

export interface GameSocketUserLeftEventDataType {
  player: GamePlayerType
}

export interface GameSocketUserDisconnectedEventDataType {
  player: GamePlayerType
}

export interface GameSocketAdminChangedEventDataType {
  admin: string
}

export interface AppSocketGameInviteEventDataType {
  invitedBy: UserType
  timestamp: number
  gameId: string
}
