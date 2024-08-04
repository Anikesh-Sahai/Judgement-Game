import type { ImageFileType } from '@Models/ImageFileModels'
import type { UserRelationStatusType } from '@Models/PlayerModels'
import type { ResponseType } from '@Models/ResponseModels'
import type { DeleteUserFormData, UpdateEmailFormData, UpdateUserFormData } from '@Schemas/user'

export type UsernameType = string

export interface UserType {
  _id: string
  firstName: string
  lastName: string
  username: UsernameType
  displayImg: ImageFileType
}

export interface ProfileUserType extends UserType {
  email?: string
  emailVerified?: boolean
  gameCount?: number
  friendCount?: number
  groupCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface GetUserRequestType {
  username: UsernameType
}

export interface GetUserResponseType extends ResponseType {
  data: {
    user: ProfileUserType
  }
}

export interface UpdateUserRequestDataType {
  formData: UpdateUserFormData
  username: UsernameType
}

export interface UpdateUserResponseDataType extends ResponseType {
  data: {
    user: UserType
  }
}

export interface UpdateEmailRequestDataType {
  formData: UpdateEmailFormData
}

export type UpdateEmailResponseType = ResponseType

export interface VerifyEmailRequestDataType {
  token: string
  username: UsernameType
}

export interface VerifyEmailResponseType extends ResponseType {
  data: {
    email: string
  }
}

export interface DeleteUserRequestDataType {
  formData: DeleteUserFormData
}

export type DeleteUserResponseType = ResponseType

export interface ConfirmDeleteUserRequestDataType {
  token: string
  username: UsernameType
}

export type ConfirmDeleteUserResponseType = ResponseType

export interface GetFriendshipStatusRequestType {
  username: UsernameType
}

export interface GetFriendshipStatusUserDataType {
  _id: string
  friend?: {
    _id: string
  }
  invite?: {
    _id: string
  }
}

export interface GetFriendshipStatusResponseType extends ResponseType {
  data: {
    status: UserRelationStatusType
    user: GetFriendshipStatusUserDataType
  }
}

export interface SearchUsersRequestDataType {
  searchQuery: string
}

export interface SearchUsersResponseType extends ResponseType {
  data: {
    users: UserType[]
  }
  results: number
}
