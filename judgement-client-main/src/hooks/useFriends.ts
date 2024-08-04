import { useMemo } from 'react'
import { RESPONSE } from '@Constants/response.constants'
import type { FriendDataType, GetFriendsRequestDataType } from '@Models/FriendModels'
import type { UsernameType } from '@Models/UserModels/User'
import { useLazyGetFriendsQuery } from '@Stores/index'
import { useAppSelector } from './redux.hooks'
import { useLazyLoading } from './useLazyLoading'
import useFetchError from './useFetchError'

export function useFriends(
  username: UsernameType,
  searchQuery: UsernameType,
  page = 1,
  limit = RESPONSE.FRIENDS_LIMIT,
) {
  const requestArgs: GetFriendsRequestDataType = useMemo(
    () => ({ username, searchQuery }),
    [username, searchQuery],
  )

  const { friends: friendsKey } = useAppSelector((store) => store.refetch)

  const { trackedRef, showDetector, results, state } = useLazyLoading(
    useLazyGetFriendsQuery,
    requestArgs,
    page,
    limit,
    friendsKey,
  )

  const { pages, isFetching, isSuccess, loadErrorMsg } = state
  const { isError, error } = results

  const friends: FriendDataType[] = []
  pages.forEach((curPage) => {
    friends.push(...curPage.data.friends)
  })

  const { errorMsg } = useFetchError('Friends', error, isError, friends, isSuccess)

  const errorMessage = errorMsg || loadErrorMsg

  return {
    friends,
    errorMessage,
    state: { isFetching, isError, isSuccess },
    trackedRef,
    showDetector,
  }
}
