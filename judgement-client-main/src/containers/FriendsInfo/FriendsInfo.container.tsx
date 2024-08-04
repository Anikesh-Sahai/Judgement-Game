import { Box, Grid, Typography } from '@mui/material'
import { UserListItem } from '@Containers/UserListItem'
import { SearchBar } from '@Components/SearchBar'
import { useParams } from 'react-router-dom'
import { useLazyGetFriendsQuery } from '@Stores/index'
import { useMemo, useState } from 'react'
import type { TopPlayersType } from '@Models/PlayerModels'
import { useLazyLoading } from '@Hooks/useLazyLoading'
import type {
  FriendDataType,
  FriendsResponseType,
  GetFriendsRequestDataType,
} from '@Models/FriendModels'
import { FriendSkeleton } from '@Components/FriendSkeleton'
import useFetchError from '@Hooks/useFetchError'
import { Error } from '@Components/Error'
import { useAppSelector } from '@Hooks/redux.hooks'
import { FriendListItem } from '@Containers/FriendListItem'
import { RESPONSE } from '@Constants/response.constants'
import { useStyles } from './style'

export function FriendsInfo() {
  const { classes } = useStyles()
  const currentUser = useAppSelector((store) => store.root.auth.user)
  const { username } = useParams() as { username: string }
  const [searchQuery, setSearchQuery] = useState('')

  const requestArgs = useMemo(() => ({ username, searchQuery }), [username, searchQuery])
  const documentsLimit = RESPONSE.FRIENDS_LIMIT

  const { friends: friendsKey } = useAppSelector((store) => store.refetch)

  const { trackedRef, showDetector, results, state } = useLazyLoading<
    GetFriendsRequestDataType,
    FriendsResponseType
  >(useLazyGetFriendsQuery, requestArgs, 1, documentsLimit, friendsKey)

  const { pages, isFetching, isSuccess, loadErrorMsg } = state
  const { isError, error } = results

  const friends: FriendDataType[] = []
  pages.forEach((page) => {
    friends.push(...page.data.friends)
  })

  const { errorMsg } = useFetchError('Friends', error, isError, friends, isSuccess)

  const errorMessage = errorMsg || loadErrorMsg

  if (isError) {
    return <Error errorMsg={errorMessage} />
  }

  const updatedFriends: TopPlayersType[] = friends.map((friend) => ({
    ...friend,
    status: 'friend',
    user: {
      ...friend.user,
      friend: {
        _id: friend._id,
      },
    },
  }))

  return (
    <Grid container className={classes.outletContainer}>
      {isSuccess && updatedFriends.length === 0 && searchQuery === '' ? (
        <Typography variant='h6'>You have no friends in Judgement</Typography>
      ) : (
        <Grid container item flexDirection='column' className={classes.friendsContainer}>
          <Grid item height='10%'>
            <SearchBar
              placeholder='Friends'
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
            />
          </Grid>
          {isSuccess && searchQuery !== '' && updatedFriends.length === 0 ? (
            <Typography variant='h6'>No friend for the given search</Typography>
          ) : (
            <Grid item container gap={2} className={classes.friendsSection}>
              <Grid item container className={classes.list} gap={2}>
                {isSuccess && friends && currentUser.username === username
                  ? updatedFriends.map((friend) => (
                      <UserListItem user={friend} key={friend.user._id} />
                    ))
                  : friends.map((friend) => (
                      <FriendListItem friend={friend} key={friend.user._id} />
                    ))}
                {isFetching &&
                  [...Array(documentsLimit).keys()].map((key) => (
                    <FriendSkeleton key={`friend-skeleton-${key}`} />
                  ))}
                {showDetector && (
                  <Box ref={trackedRef} sx={{ width: '100%' }}>
                    <FriendSkeleton key='friend-skeleton-track' />
                  </Box>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  )
}
