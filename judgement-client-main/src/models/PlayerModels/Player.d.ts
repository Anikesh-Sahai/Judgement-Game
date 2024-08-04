import type { PaginatedResponseType } from '@Models/ResponseModels'
import type { UserType } from '@Models/UserModels'

export interface PlayerType extends UserType {
  friend?: {
    _id: string
  }
  invite?: {
    _id: string
  }
}

export type UserRelationStatusType = 'friend' | 'requested' | 'received' | null

export interface TopPlayersType {
  totalWins?: number
  status: 'friend' | 'requested' | 'received' | null
  user: PlayerType
}

export interface TopPlayersResponseType extends PaginatedResponseType {
  data: {
    players: TopPlayersType[]
  }
}

export interface PlayerAvatarType {
  user: UserType
  className?: string
}

export interface PlayerSummaryPropsType {
  user: UserType
}
