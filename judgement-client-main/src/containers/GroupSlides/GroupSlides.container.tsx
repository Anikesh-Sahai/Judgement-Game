import { useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { GroupCard } from '@Containers/GroupCard'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useLazyGetUserGroupsQuery } from '@Stores/index'
import { Swiper } from '@Components/Swiper'
import { GroupCardSkeleton } from '@Components/GroupCardSkeleton'

import { useLazyLoading } from '@Hooks/useLazyLoading'
import type {
  GetUserGroupsRequestDataType,
  GetUserGroupsResponseType,
  GroupInfoType,
} from '@Models/GroupModels'
import useFetchError from '@Hooks/useFetchError'
import { ROUTES } from '@Constants/router.constants'
import { NavButton } from '@Components/NavButton'
import { Error } from '@Components/Error'
import { RESPONSE } from '@Constants/response.constants'
import type { UsernameType } from '@Models/UserModels/User'
import { useStyles } from './style'

interface GroupSlidesPropsType {
  username?: UsernameType
  showPlay?: boolean
}

export function GroupSlides({ username, showPlay = true }: GroupSlidesPropsType) {
  const { classes } = useStyles()

  const { user } = useAppSelector((store) => store?.root?.auth)

  const currentUsername = user.username
  const requestUsername = username ?? currentUsername

  const requestArgs = useMemo(() => ({ username: requestUsername }), [requestUsername])
  const documentsLimit = RESPONSE.GROUPS_LIMIT

  const { groups: groupsKey } = useAppSelector((store) => store.refetch)

  const { trackedRef, showDetector, results, state } = useLazyLoading<
    GetUserGroupsRequestDataType,
    GetUserGroupsResponseType
  >(useLazyGetUserGroupsQuery, requestArgs, 1, documentsLimit, groupsKey)

  const { error } = results
  const { pages, isFetching, isSuccess, loadErrorMsg, isLoadError } = state
  const groups: GroupInfoType[] = []
  pages.forEach((page) => {
    groups.push(...page.data.groups)
  })

  const { errorMsg } = useFetchError('Groups', error, isLoadError, groups, isSuccess)

  const errorMessage = errorMsg || loadErrorMsg

  if (!isFetching && (errorMessage || !groups)) {
    return (
      <Box className={classes.noGroups}>
        <Error className={classes.errorMsg} errorMsg={errorMsg} />
      </Box>
    )
  }

  if (isSuccess && groups && groups.length === 0) {
    return (
      <Box className={classes.noGroups}>
        <Typography variant='h2' fontSize='inherit' textAlign='center'>
          {requestUsername === currentUsername
            ? 'You are not a member of any group. '
            : `${username} is not a member of any group.`}
        </Typography>
        {requestUsername === currentUsername && (
          <NavButton type='secondary' to={ROUTES.GROUPS} className={classes.createGroupLink}>
            Create one now.
          </NavButton>
        )}
      </Box>
    )
  }

  return (
    <Swiper>
      {isSuccess &&
        groups &&
        groups.map((group) => (
          <Swiper.Slide key={group._id}>
            <GroupCard group={group} showPlay={showPlay} />
          </Swiper.Slide>
        ))}
      {isFetching &&
        [...Array(documentsLimit).keys()].map((key) => (
          <Swiper.Slide key={`group-fetching-card-${key}`}>
            <GroupCardSkeleton showPlay={showPlay} />
          </Swiper.Slide>
        ))}
      {showDetector && (
        <div ref={trackedRef}>
          <Swiper.Slide>
            <GroupCardSkeleton showPlay={showPlay} />
          </Swiper.Slide>
        </div>
      )}
    </Swiper>
  )
}
