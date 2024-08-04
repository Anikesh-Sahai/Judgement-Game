import type { ResponseType } from '@Models/ResponseModels'
import type { UserType, UsernameType } from '@Models/UserModels/User'

export type InviteModelType = 'Friend' | 'GroupMember'

export type InviteType = 'friend' | 'group'

export type InviteIdType = string

export interface InviteDataType {
  _id: InviteIdType
  host: string
  modelType: InviteModelType
  sender: string
  receiver: string
  createdAt: string
  updatedAt?: string
}

export interface UserInvitesDataType {
  _id: InviteModelType
  invites: InviteDataType[]
  count: number
}

export interface UserInvitesResponseType extends ResponseType {
  data: {
    invites: UserInvitesDataType[]
  }
}

export interface InviteCreateResponseType extends ResponseType {
  data: {
    invite: InviteDataType
  }
}

export interface InviteRequestDataType {
  receiver: string
  group?: string
}

export interface SendGroupInvitesRequestDataType {
  receivers: string[]
  group: string
}

export interface SendGroupInvitesResponseDataType {
  data: {
    invites: InviteDataType[]
  }
}

export interface InviteActionDataType {
  inviteId: InviteIdType
  inviteType?: InviteType
}

export interface ConfirmInviteActionDataType extends InviteActionDataType {
  username: UsernameType
}

export interface GetGroupInvitesRequestDataType {
  group: string
}

interface SentGroupInviteDataType {
  _id: string
  receiver: UserType
  createdAt: string
  sender: string | null
}

export interface GetGroupInvitesResponseType extends ResponseType {
  data: {
    invites: SentGroupInviteDataType[]
  }
  results: number
}
