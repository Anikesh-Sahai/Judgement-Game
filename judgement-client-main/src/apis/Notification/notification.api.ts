import { mainApi } from '@Apis/Api'
import { API } from '@Constants/api.constants'
import { RESPONSE } from '@Constants/response.constants'
import type {
  GetNotificationRequestType,
  GetNotificationResponseType,
  GetUnreadNotificationsCountResponseType,
  GetUserNotificationsResponseType,
} from '@Models/NotificationModels'
import type { PaginatedRequestType } from '@Models/ResponseModels'
import { paginatedUrl } from '@Utils/helpers'

const extendedNotificationApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotifications: builder.query<GetUserNotificationsResponseType, PaginatedRequestType>({
      query: ({ page = 1, limit = RESPONSE.NOTIFICATIONS_LIMIT }) => ({
        url: paginatedUrl(API.NOTIFICATIONS, page, limit),
      }),
      providesTags: (result) =>
        result?.data.notifications
          ? [
              ...result.data.notifications.map(({ _id, invite }) => ({
                type: 'Notification' as const,
                id: invite ?? _id,
              })),
              { type: 'Notification' },
            ]
          : [{ type: 'Notification' }],
    }),
    getUnreadNotificationsCount: builder.query<GetUnreadNotificationsCountResponseType, void>({
      query: () => ({
        url: `${API.NOTIFICATIONS}/count`,
      }),
      providesTags: [{ type: 'Notification', id: 'count' }],
    }),
    markNotificationsRead: builder.mutation<void, void>({
      query: () => ({
        url: API.NOTIFICATIONS,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Notification', id: 'count' }],
    }),
    markNotificationRead: builder.mutation<void, GetNotificationRequestType>({
      query: ({ notificationId }) => ({
        url: `${API.NOTIFICATIONS}/${notificationId}`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Notification', id: 'count' }],
    }),
    getNotification: builder.query<GetNotificationResponseType, GetNotificationRequestType>({
      query: ({ notificationId }) => ({
        url: `${API.NOTIFICATIONS}/${notificationId}`,
      }),
    }),
  }),
})

export { extendedNotificationApi }
