import { configureStore } from '@reduxjs/toolkit'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { mainApi } from '@Apis/Api'
import { authApi } from '@Apis/Auth'
import { inviteApi } from '@Apis/Invite'
import { groupApi } from '@Apis/Group'
import { friendApi } from '@Apis/Friend'
import { playerApi } from '@Apis/Player'
import { userApi } from '@Apis/User'
import { gameApi } from '@Apis/Game'
import { fileApi } from '@Apis/File'
import { notificationApi } from '@Apis/Notification'
import rootReducer from './rootReducer'
import { refetchSlice } from './slices/refetchSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    root: persistedReducer,
    refetch: refetchSlice.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mainApi.middleware),
})
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const {
  useLoginMutation,
  useSignupMutation,
  useLazyAvailableQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi

export const {
  useLazyGetUserGroupsQuery,
  useGetUserGroupsQuery,
  useGetGroupQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupMembersQuery,
  useLazyGetGroupMembersQuery,
  useLeaveGroupMutation,
  useDeleteGroupMemberMutation,
} = groupApi

export const {
  useGetFriendsQuery,
  useLazyGetFriendsQuery,
  useUnfriendMutation,
  useGetTopFriendsQuery,
  useGetMutualFriendsQuery,
} = friendApi

export const { useGetTopPlayersQuery } = playerApi

export const {
  useGetInvitesQuery,
  useSendInviteMutation,
  useUnsendInviteMutation,
  useAcceptInviteMutation,
  useRejectInviteMutation,
  useGetGroupInvitesQuery,
  useLazyGetGroupInvitesQuery,
  useSendGroupInvitesMutation,
} = inviteApi

export const {
  useCreateGameMutation,
  useGetGameStateQuery,
  useSendGameInviteMutation,
  useSetRoundsMutation,
  useSetReadyMutation,
  useStartGameMutation,
  useSetBidMutation,
  useThrowCardMutation,
  useGetGameHistoryQuery,
  useLazyGetGameHistoryQuery,
  useGetGameStatusQuery,
  useGetGameDetailsQuery,
  useGetGameStatsQuery,
} = gameApi

export const {
  useGetUnreadNotificationsCountQuery,
  useLazyGetUserNotificationsQuery,
  useMarkNotificationsReadMutation,
  useGetNotificationQuery,
  useMarkNotificationReadMutation,
} = notificationApi

export const {
  useGetFriendshipStatusQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateEmailMutation,
  useVerifyEmailMutation,
  useDeleteUserMutation,
  useConfirmDeleteUserMutation,
  useLazySearchUsersQuery,
} = userApi

export const { useUploadFilesMutation } = fileApi
