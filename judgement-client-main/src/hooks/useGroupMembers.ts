import { useMemo } from 'react'
import { useLazyGetGroupMembersQuery } from '@Stores/index'
import { RESPONSE } from '@Constants/response.constants'
import type { GroupMemberType, GroupSlugType } from '@Models/GroupModels'
import useFetchError from './useFetchError'
import { useLazyLoading } from './useLazyLoading'
import { useAppSelector } from './redux.hooks'

export function useGroupMembers(
  slug: GroupSlugType,
  page = 1,
  limit = RESPONSE.GROUP_MEMBERS_LIMIT,
) {
  const requestArgs = useMemo(() => ({ slug }), [slug])
  const { members: membersKey } = useAppSelector((store) => store.refetch)

  const { trackedRef, showDetector, results, state } = useLazyLoading(
    useLazyGetGroupMembersQuery,
    requestArgs,
    page,
    limit,
    membersKey,
  )

  const { pages, isFetching, isSuccess, loadErrorMsg } = state
  const { isError, error } = results

  const members: GroupMemberType[] = []
  pages.forEach((curPage) => {
    members.push(...curPage.data.members)
  })

  const { errorMsg } = useFetchError('Group Members', error, isError, members, isSuccess)

  const errorMessage = errorMsg || loadErrorMsg

  return {
    members,
    errorMessage,
    state: { isError, isFetching, isSuccess },
    trackedRef,
    showDetector,
  }
}
