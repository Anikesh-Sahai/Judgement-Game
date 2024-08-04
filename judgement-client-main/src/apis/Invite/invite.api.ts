import { mainApi } from '@Apis/Api'
import { API } from '@Constants/api.constants'
import type {
  ConfirmInviteActionDataType,
  GetGroupInvitesRequestDataType,
  GetGroupInvitesResponseType,
  InviteActionDataType,
  InviteCreateResponseType,
  InviteRequestDataType,
  SendGroupInvitesRequestDataType,
  SendGroupInvitesResponseDataType,
  UserInvitesResponseType,
} from '@Models/InviteModels'
import { initiateRefetch } from '@Utils/helpers'

const extendedInviteApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvites: builder.query<UserInvitesResponseType, void>({
      providesTags: (result) =>
        result?.data.invites
          ? [
              ...result.data.invites.map(({ _id }) => ({ type: 'Invite' as const, id: _id })),
              'Invite',
            ]
          : ['Invite'],
      query: () => ({
        url: API.INVITES,
      }),
    }),
    sendInvite: builder.mutation<InviteCreateResponseType, InviteRequestDataType>({
      invalidatesTags: (_, error, { receiver }) =>
        !error?.status
          ? ['Invite', { type: 'Player', id: receiver }, { type: 'Relation', id: receiver }]
          : [],
      query: (inviteRequestData) => ({
        url: API.INVITES,
        method: 'POST',
        body: inviteRequestData,
      }),
    }),
    sendGroupInvites: builder.mutation<
      SendGroupInvitesResponseDataType,
      SendGroupInvitesRequestDataType
    >({
      invalidatesTags: (_, error, { group }) => (!error?.status ? [{ type: 'Invite', group }] : []),
      query: (inviteRequestData) => ({
        url: `${API.INVITES}/group`,
        method: 'POST',
        body: inviteRequestData,
      }),
    }),
    unsendInvite: builder.mutation<void, InviteActionDataType>({
      invalidatesTags: (_, error, { inviteId }) =>
        !error?.status ? [{ type: 'Invite', id: inviteId }] : [],
      query: ({ inviteId }) => ({
        url: `${API.INVITES}/${inviteId}`,
        method: 'DELETE',
      }),
    }),
    acceptInvite: builder.mutation<void, ConfirmInviteActionDataType>({
      invalidatesTags: (_, error, { inviteId, inviteType = 'friend', username }) =>
        !error?.status
          ? [
              inviteType === 'friend' ? { type: 'Friend', username } : { type: 'Group', username },
              { type: 'Invite', id: inviteId },
              { type: 'Notification', id: inviteId },
              { type: 'User', id: username },
            ]
          : ['Invite'],
      query: ({ inviteId }) => ({
        url: `${API.INVITES}/${inviteId}/accept`,
        method: 'POST',
      }),
      onQueryStarted: initiateRefetch('notifications', 'friends', 'groups'),
    }),
    rejectInvite: builder.mutation<void, InviteActionDataType>({
      invalidatesTags: (_, error, { inviteId }) =>
        !error?.status
          ? [
              { type: 'Invite', id: inviteId },
              { type: 'Notification', id: inviteId },
            ]
          : [],
      query: ({ inviteId }) => ({
        url: `${API.INVITES}/${inviteId}/reject`,
        method: 'POST',
      }),
      onQueryStarted: initiateRefetch('notifications'),
    }),
    getGroupInvites: builder.query<GetGroupInvitesResponseType, GetGroupInvitesRequestDataType>({
      providesTags: (result, _, { group }) =>
        result?.data.invites
          ? [
              ...result.data.invites.map(({ _id }) => ({ type: 'Invite' as const, id: _id })),
              { type: 'Invite', group },
            ]
          : [{ type: 'Invite', group }],
      query: ({ group }) => ({
        url: `${API.INVITES}/group?group=${group}`,
      }),
    }),
  }),
})

export { extendedInviteApi }
