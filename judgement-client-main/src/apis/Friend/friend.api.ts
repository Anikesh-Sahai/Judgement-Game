import { mainApi } from '@Apis/Api'
import { API } from '@Constants/api.constants'
import { RESPONSE } from '@Constants/response.constants'
import {
  type GetMutualFriendsResponseType,
  type FriendsResponseType,
  type GetFriendsRequestDataType,
  type TopFriendsResponseType,
  type UnfriendRequestDataType,
} from '@Models/FriendModels'
import type { PaginatedRequestType } from '@Models/ResponseModels'
import { initiateRefetch, paginatedUrl } from '@Utils/helpers'

const extendedFriendApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriends: builder.query<
      FriendsResponseType,
      GetFriendsRequestDataType & PaginatedRequestType
    >({
      providesTags: (result, _, { username }) =>
        result?.data.friends
          ? [
              ...result.data.friends.map(({ _id }) => ({
                type: 'Friend' as const,
                id: _id,
              })),
              { type: 'Friend', username },
            ]
          : [{ type: 'Friend', username }],
      query: ({ username, page = 1, limit = RESPONSE.DOCUMENTS_LIMIT, searchQuery = '' }) => ({
        url: `${API.FRIENDS}?searchQuery=${searchQuery}&username=${username}&page=${page}&limit=${limit}`,
      }),
    }),
    unfriend: builder.mutation<void, UnfriendRequestDataType>({
      invalidatesTags: (_, error, { friendshipId, username }) =>
        !error?.status
          ? [
              { type: 'Friend', id: friendshipId },
              { type: 'Friend', username },
              { type: 'User', id: username },
            ]
          : [],
      query: ({ friendshipId }) => ({
        url: `${API.FRIENDS}/${friendshipId}`,
        method: 'DELETE',
      }),
      onQueryStarted: initiateRefetch('friends'),
    }),
    getTopFriends: builder.query<
      TopFriendsResponseType,
      GetFriendsRequestDataType & PaginatedRequestType
    >({
      providesTags: (result, _, { username }) =>
        result?.data.friends
          ? [
              ...result.data.friends.flatMap((player) => {
                const tags = []
                tags.push({ type: 'Player' as const, id: player.user._id })
                if (player.user.friend)
                  tags.push({ type: 'Friend' as const, id: player.user.friend._id })
                return tags
              }),
              { type: 'Friend', username },
            ]
          : [{ type: 'Friend', username }],
      query: ({ page = 1, limit = RESPONSE.TOP_FRIENDS_LIMIT }) => ({
        url: paginatedUrl(API.TOP_FRIENDS, page, limit),
      }),
    }),
    getMutualFriends: builder.query<GetMutualFriendsResponseType, PaginatedRequestType | void>({
      query: ({ page = 1, limit = RESPONSE.MUTUAL_FRIENDS_LIMIT } = {}) => ({
        url: paginatedUrl(API.MUTUAL_FRIENDS, page, limit),
      }),
    }),
  }),
})

export { extendedFriendApi }
