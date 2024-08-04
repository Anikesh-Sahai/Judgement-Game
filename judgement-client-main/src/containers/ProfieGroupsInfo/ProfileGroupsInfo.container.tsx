import { Grid, Typography } from '@mui/material'
import { GroupCard } from '@Containers/GroupCard'
import { SearchBar } from '@Components/SearchBar'
import { useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useLazyGetUserGroupsQuery } from '@Stores/index'
import { RESPONSE } from '@Constants/response.constants'
import type {
  GetUserGroupsRequestDataType,
  GetUserGroupsResponseType,
  GroupInfoType,
} from '@Models/GroupModels'
import { useLazyLoading } from '@Hooks/useLazyLoading'
import { GroupCardSkeleton } from '@Components/GroupCardSkeleton'
import useFetchError from '@Hooks/useFetchError'
import { Error } from '@Components/Error'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useStyles } from './style'

export function ProfileGroupsInfo() {
  const { classes } = useStyles()
  const { username } = useParams() as { username: string }
  const [searchQuery, setSearchQuery] = useState('')

  const currentUser = useAppSelector((store) => store.root.auth.user)
  const isSameUser = currentUser.username === username

  const requestArgs = useMemo(() => ({ username, searchQuery }), [username, searchQuery])
  const documentsLimit = RESPONSE.GROUPS_LIMIT

  const { groups: groupsKey } = useAppSelector((store) => store.refetch)

  const { trackedRef, showDetector, state, results } = useLazyLoading<
    GetUserGroupsRequestDataType,
    GetUserGroupsResponseType
  >(useLazyGetUserGroupsQuery, requestArgs, 1, documentsLimit, groupsKey)

  const { pages, isFetching, isSuccess, loadErrorMsg } = state
  const { isError, error } = results

  const groups: GroupInfoType[] = []
  pages.forEach((page) => {
    groups.push(...page.data.groups)
  })

  const { errorMsg } = useFetchError('Friends', error, isError, groups, isSuccess)

  const errorMessage = errorMsg || loadErrorMsg

  if (isError) {
    return <Error errorMsg={errorMessage} />
  }

  return (
    <Grid container className={classes.outletContainer}>
      {isSuccess && groups.length === 0 && searchQuery === '' ? (
        <Typography variant='h6'>
          {isSameUser
            ? 'You are not a member of any group'
            : `${username} is not a member of any group`}
        </Typography>
      ) : (
        <Grid container item flexDirection='column' className={classes.rightContent}>
          <SearchBar
            placeholder='Groups'
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
          {isSuccess && searchQuery !== '' && groups.length === 0 ? (
            <Typography variant='h6'>No group for the given search</Typography>
          ) : (
            <Grid item container className={classes.parentList}>
              <Grid item container className={classes.list}>
                {isSuccess &&
                  groups &&
                  groups.map((group) => (
                    <Grid key={group._id} item container className={classes.cardContainer}>
                      <GroupCard group={group} showPlay={isSameUser} />
                    </Grid>
                  ))}
                {isFetching &&
                  [...Array(documentsLimit).keys()].map((key) => (
                    <Grid
                      key={`group-skeleton-${key}`}
                      item
                      container
                      className={classes.cardContainer}
                    >
                      <GroupCardSkeleton showPlay={isSameUser} />
                    </Grid>
                  ))}
                {showDetector && (
                  <div ref={trackedRef}>
                    <Grid
                      key='group-skeleton-track'
                      item
                      container
                      className={classes.cardContainer}
                    >
                      <GroupCardSkeleton showPlay={isSameUser} />
                    </Grid>
                  </div>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  )
}
