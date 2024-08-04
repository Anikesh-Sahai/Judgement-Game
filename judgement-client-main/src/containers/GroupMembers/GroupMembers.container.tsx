import clsx from 'clsx'
import { useMemo } from 'react'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import theme from '@Themes/theme'
import { useParams } from 'react-router-dom'
import { useGetGroupQuery, useLazyGetGroupMembersQuery } from '@Stores/index'
import useFetchError from '@Hooks/useFetchError'
import { Error } from '@Components/Error'
import type { ComponentThatLoadsType } from '@Models/ErrorModels'
import { ERROR_STATUS_CODES } from '@Constants/errors.constants'
import { useLazyLoading } from '@Hooks/useLazyLoading'
import type {
  GetGroupMembersRequestType,
  GetGroupMembersResponseType,
  GroupMemberType,
} from '@Models/GroupModels'
import { RESPONSE } from '@Constants/response.constants'
import { GroupMemberAvatarSkeleton } from '@Components/GroupMemberAvatarSkeleton'
import { PlayerAvatar } from '@Components/PlayerAvatar'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useStyles } from './styles'

const parentErrorCodes = [ERROR_STATUS_CODES.UNAUTHORIZED]

export function GroupMembers({ onLoadError }: ComponentThatLoadsType) {
  const { classes } = useStyles()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))

  const { slug } = useParams() as { slug: string }

  const requestArgs = useMemo(() => ({ slug }), [slug])
  const { members: membersKey } = useAppSelector((store) => store.refetch)

  const { trackedRef, showDetector, results, state } = useLazyLoading<
    GetGroupMembersRequestType,
    GetGroupMembersResponseType
  >(useLazyGetGroupMembersQuery, requestArgs, 1, RESPONSE.GROUP_MEMBERS_LIMIT, membersKey)

  const { pages, isFetching, isSuccess, loadErrorMsg } = state
  const { isError, error } = results

  const members: GroupMemberType[] = []
  pages.forEach((page) => {
    members.push(...page.data.members)
  })

  const { errorMsg } = useFetchError(
    'Group Members',
    error,
    isError,
    members,
    isSuccess,
    parentErrorCodes,
    onLoadError,
  )

  const errorMessage = errorMsg || loadErrorMsg

  const { data: groupData } = useGetGroupQuery({ slug })
  const group = groupData?.data?.group

  if (isError || !members) {
    return <Error errorMsg={errorMessage} />
  }

  return (
    <>
      <Grid item alignSelf='flex-start' className={classes.bottomHeading}>
        <Typography variant='h4' fontSize='inherit'>
          Members: {group?.memberCount || members.length}
        </Typography>
      </Grid>
      <Grid
        container
        direction='row'
        alignItems='center'
        gap={downMd ? 1 : 2}
        className={clsx(classes.bottomScrollableComponents, classes.memberAvatars)}
      >
        {isSuccess &&
          members &&
          members.map((member) => (
            <Grid item key={member._id}>
              <PlayerAvatar user={member.user} />
            </Grid>
          ))}
        {isFetching &&
          [...Array(15).keys()].map((key) => (
            <Grid item key={`member-skeleton-${key}`}>
              <GroupMemberAvatarSkeleton className={classes.avatarSkeleton} />
            </Grid>
          ))}
        {showDetector && (
          <Grid ref={trackedRef} item key='member-skeleton-track'>
            <GroupMemberAvatarSkeleton className={classes.avatarSkeleton} />
          </Grid>
        )}
      </Grid>
    </>
  )
}
