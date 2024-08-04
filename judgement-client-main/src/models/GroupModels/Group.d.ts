import type { ImageFileType } from '@Models/ImageFileModels'
import type { ResponseType } from '@Models/ResponseModels'
import type { UserType } from '@Models/UserModels'
import type { UsernameType } from '@Models/UserModels/User'
import type { CreateGroupFormData, UpdateGroupFormData } from '@Schemas/group'

export type GroupIdType = string
export type GroupMembershipIdType = string
export type GroupSlugType = string

export interface GroupMemberType {
  _id: GroupMembershipIdType
  updatedAt?: string
  user: UserType
}

export interface GroupDataType {
  _id: GroupIdType
  groupName: string
  description: string
  memberCount: number
  admin: UserType
  slug: GroupSlugType
  createdAt: string
  updatedAt?: string
  displayImg: ImageFileType
}

interface GroupMutationRequestType {
  username?: UsernameType
}

export interface GroupInfoType extends GroupDataType {
  members: GroupMemberType[]
}

export interface GroupInfoRequestType extends GroupMutationRequestType {
  slug: GroupSlugType
}

export interface GetGroupMembersRequestType {
  slug?: GroupSlugType
  id?: string
  searchQuery?: UsernameType
}

export interface GroupMemberInfoRequestType extends GroupInfoRequestType, GroupMutationRequestType {
  membershipId: string
}

export interface GroupInfoResponseType extends ResponseType {
  data: {
    group: GroupInfoType
  }
}

export interface GetUserGroupsResponseType extends ResponseType {
  data: {
    groups: GroupInfoType[]
  }
  results: number
}

export interface GetUserGroupsRequestDataType {
  username: string
  searchQuery?: string
}

export interface GroupCreateRequestDataType {
  formData: CreateGroupFormData
  username: string
}

export interface GroupUpdateRequestDataType {
  formData: UpdateGroupFormData
  slug: GroupSlugType
}

export interface GetGroupMembersResponseType extends ResponseType {
  data: {
    members: GroupMemberType[]
  }
  results: number
}
