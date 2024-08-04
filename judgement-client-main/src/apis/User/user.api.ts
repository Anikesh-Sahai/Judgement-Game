import { mainApi } from '@Apis/Api'
import { API } from '@Constants/api.constants'
import { RESPONSE } from '@Constants/response.constants'
import type { PaginatedRequestType } from '@Models/ResponseModels'
import type {
  ConfirmDeleteUserRequestDataType,
  ConfirmDeleteUserResponseType,
  DeleteUserRequestDataType,
  DeleteUserResponseType,
  GetFriendshipStatusRequestType,
  GetFriendshipStatusResponseType,
  GetUserRequestType,
  GetUserResponseType,
  UpdateEmailRequestDataType,
  UpdateEmailResponseType,
  UpdateUserRequestDataType,
  UpdateUserResponseDataType,
  SearchUsersRequestDataType,
  SearchUsersResponseType,
  VerifyEmailResponseType,
  VerifyEmailRequestDataType,
} from '@Models/UserModels/User'
import type { RootState } from '@Stores/index'
import { authActions } from '@Stores/slices/authSlice'
import { updateKeys } from '@Utils/helpers'

const extendedUserApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriendshipStatus: builder.query<
      GetFriendshipStatusResponseType,
      GetFriendshipStatusRequestType
    >({
      providesTags: (result) => {
        if (!result?.data.user) return []
        const user = result?.data.user
        const tags = []
        tags.push({ type: 'Relation' as const, id: user._id })
        if (user.friend?._id) tags.push({ type: 'Friend' as const, id: user.friend?._id })
        if (user.invite?._id) tags.push({ type: 'Invite' as const, id: user.invite?._id })
        return tags
      },
      query: ({ username }) => ({
        url: `${API.FRIENDSHIP_STATUS}?username=${username}`,
      }),
    }),
    searchUsers: builder.query<
      SearchUsersResponseType,
      SearchUsersRequestDataType & PaginatedRequestType
    >({
      query: ({ searchQuery = '', page = 1, limit = RESPONSE.USER_SEARCH_LIMIT }) => ({
        url: `${API.USER_SEARCH}?searchQuery=${searchQuery}&page=${page}&limit=${limit}`,
      }),
    }),
    getUser: builder.query<GetUserResponseType, GetUserRequestType>({
      providesTags: (_, error, { username }) =>
        !error?.status
          ? [
              { type: 'Group', id: username },
              { type: 'Friend', id: username },
              { type: 'User', id: username },
            ]
          : [],
      query: ({ username }) => ({
        url: `${API.USERS}/${username}`,
      }),
    }),
    updateUser: builder.mutation<UpdateUserResponseDataType, UpdateUserRequestDataType>({
      query: ({ formData }) => ({
        url: API.USERS,
        method: 'PATCH',
        body: formData,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled, getState }) => {
        try {
          const { data } = await queryFulfilled
          const { user } = data.data
          const { auth } = (getState() as RootState).root
          if (user._id) {
            dispatch(authActions.setToken({ ...auth, user: { ...user } }))
            updateKeys(dispatch, ['groups', 'members', 'games'])
          }
        } catch (err) {
          // digest error
        }
      },
      invalidatesTags: (_, error, { username }) =>
        !error?.status ? [{ type: 'User', id: username }, 'Player', 'Group', 'Member', 'Game'] : [],
    }),
    updateEmail: builder.mutation<UpdateEmailResponseType, UpdateEmailRequestDataType>({
      query: ({ formData }) => ({
        url: `${API.USERS}/email`,
        method: 'PATCH',
        body: formData,
      }),
    }),
    verifyEmail: builder.mutation<VerifyEmailResponseType, VerifyEmailRequestDataType>({
      query: ({ token }) => ({
        url: `${API.USERS}/email/${token}`,
        method: 'POST',
      }),
      invalidatesTags: (_, error, { username }) =>
        !error?.status ? [{ type: 'User', id: username }] : [],
    }),
    deleteUser: builder.mutation<DeleteUserResponseType, DeleteUserRequestDataType>({
      query: ({ formData }) => ({
        url: `${API.USERS}/delete`,
        method: 'PATCH',
        body: formData,
      }),
    }),
    confirmDeleteUser: builder.mutation<
      ConfirmDeleteUserResponseType,
      ConfirmDeleteUserRequestDataType
    >({
      query: ({ token }) => ({
        url: `${API.USERS}/delete/${token}`,
        method: 'POST',
      }),
      onQueryStarted: async (_id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(authActions.resetToken())
          dispatch(mainApi.util.resetApiState())
        } catch (err) {
          // digesting this error because handled already while calling
        }
      },
    }),
  }),
})

export { extendedUserApi }
