import type { GroupDataType, GroupInfoType } from '@Models/GroupModels'
import type { ImageFileType } from '@Models/ImageFileModels'
import type { PaginatedResponseType } from '@Models/ResponseModels'
import type { UserType } from '@Models/UserModels/User'

export interface AppSocketNotificationEventDataType {
  notificationType: 'friendInvite' | 'groupInvite'
  message: string
  displayImg: ImageFileType
  _id: string
}

export interface NotificationListItemType {
  _id: string
  message: string
  notificationType: 'friendInvite' | 'groupInvite'
  createdAt: string
  displayImg: ImageFileType
  invite: string
  group: Pick<GroupDataType, '_id' | 'groupName' | 'displayImg'>
  sender: UserType
}

export interface GetUserNotificationsResponseType extends PaginatedResponseType {
  data: {
    notifications: NotificationListItemType[]
  }
}

export interface GetUnreadNotificationsCountResponseType extends ResponseType {
  data: {
    count: number
  }
}

export interface GetNotificationRequestType {
  notificationId: string
}

type NotificationGroupDataType = Pick<
  GroupInfoType,
  '_id' | 'description' | 'displayImg' | 'groupName' | 'memberCount' | 'members' | 'slug'
>

export interface NotificationDataType {
  _id: string
  message: string
  invite: string
  sender: UserType
  group: NotificationGroupDataType
}

export interface GetNotificationResponseType extends ResponseType {
  data: {
    notification: NotificationDataType
  }
}
