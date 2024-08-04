import type { TopPlayersType } from '@Models/PlayerModels'
import type { PaginatedResponseType, ResponseType } from '@Models/ResponseModels'
import type { UserType } from '@Models/UserModels'
import type { UsernameType } from '@Models/UserModels/User'

export type FriendshipIdType = string

export interface FriendDataType {
  _id: FriendshipIdType
  updatedAt?: string
  user: UserType
}

export interface FriendsResponseType extends ResponseType {
  data: {
    friends: FriendDataType[]
  }
  results: number
}

export interface GetFriendsRequestDataType {
  username: UsernameType
  searchQuery?: UsernameType
}

export interface UnfriendRequestDataType {
  friendshipId: FriendshipIdType
  username: UsernameType
}

export interface FriendType extends UserType {
  friend?: {
    _id: string
  }
}

export interface TopFriendsType extends TopPlayersType {
  status: 'friend'
  user: FriendType
}

export interface TopFriendsResponseType extends PaginatedResponseType {
  data: {
    friends: TopFriendsType[]
  }
}

export interface GetMutualFriendsResponseType extends PaginatedResponseType {
  data: {
    friends: UserType[]
  }
}
