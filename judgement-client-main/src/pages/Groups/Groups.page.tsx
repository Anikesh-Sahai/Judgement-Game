import { useCallback, useEffect, useState } from 'react'
import diamondIcon from '@Assets/icons/diamond-icon.png'
import { Box, Grid, Typography } from '@mui/material'
import { Error } from '@Components/Error'
import { GroupSlides } from '@Containers/GroupSlides'
import { Button } from '@Components/Button'
import { GroupCard } from '@Containers/GroupCard'
import { useGetTopFriendsQuery, useLazyGetUserGroupsQuery } from '@Stores/index'
import { useAppSelector } from '@Hooks/redux.hooks'
import { NewGroup } from '@Containers/NewGroup'
import type { GroupInfoType } from '@Models/GroupModels'
import type { TopFriendsType } from '@Models/FriendModels'
import { GroupCardSkeleton } from '@Components/GroupCardSkeleton'
import type { ProfileUserType } from '@Models/UserModels/User'
import useFetchError from '@Hooks/useFetchError'
import { Loader } from '@Components/Loader'
import { RESPONSE } from '@Constants/response.constants'
import { Navbar } from '@Containers/Navbar'
import { HomepageFooter } from '@Containers/HomepageFooter'
import { useStyles } from './style'

function UserGroups() {
  const { classes } = useStyles()
  const currentUser: ProfileUserType = useAppSelector((store) => store.root.auth.user)

  const [page, setPage] = useState(1)
  const limit = RESPONSE.USER_GROUPS_LIMIT
  const [userGroups, setUserGroups] = useState<GroupInfoType[]>([])
  const [trigger, results] = useLazyGetUserGroupsQuery()
  const { data, isFetching, isError, error, isSuccess } = results

  const { errorMsg } = useFetchError('Groups', error, isError, data, isSuccess)

  const handleShowMore = useCallback(() => {
    setPage((p) => p + 1)
    trigger({ username: currentUser.username, page: page + 1, limit })
      .unwrap()
      .then((curData) => {
        const newGroups = curData.data.groups
        setUserGroups((groups) => [...groups, ...newGroups])
      })
  }, [currentUser.username, trigger, page, limit])

  const handleHide = () => {
    setPage(1)
    const filteredGroups = userGroups.slice(0, limit)
    setUserGroups([...filteredGroups])
  }

  useEffect(() => {
    setPage(1)
    trigger({ username: currentUser.username, page: 1, limit })
      .unwrap()
      .then((curData) => {
        const newGroups = curData.data.groups
        setUserGroups([...newGroups])
      })
  }, [currentUser.username, trigger, limit])

  return (
    <Box className={classes.userSection}>
      <Box className={classes.titleArea}>
        <Box className={classes.groupsTitle}>
          <img src={diamondIcon} alt='spade icon' className={classes.diamondIcon} />
          <Typography className={classes.titleFont}>My Groups</Typography>
        </Box>
        <NewGroup className={classes.newGroup} />
      </Box>

      <Box className={classes.userGroupSection}>
        {isError && <Error errorMsg={errorMsg} />}
        {!isFetching && isSuccess && userGroups.length === 0 && (
          <Typography variant='h2' className={classes.noGroupsText}>
            You are not a member of any group.
          </Typography>
        )}
        {userGroups?.map((group) => (
          <Box>
            <GroupCard group={group} />
          </Box>
        ))}
        {isFetching &&
          [...Array(limit).keys()].map(() => (
            <Box>
              <GroupCardSkeleton />
            </Box>
          ))}
      </Box>
      {isSuccess && (
        <Grid container className={classes.buttonContainer}>
          {data.results >= limit && <Button onClick={handleShowMore}>Show More</Button>}
          {userGroups.length > limit && <Button onClick={handleHide}>Hide</Button>}
        </Grid>
      )}
    </Box>
  )
}

function FriendGroups() {
  const { classes } = useStyles()

  const currentUser: ProfileUserType = useAppSelector((store) => store.root.auth.user)

  const { data, isFetching, isError, isSuccess, error } = useGetTopFriendsQuery({
    username: currentUser.username,
  })
  const { errorMsg } = useFetchError('Groups of your friends', error, isError, data, isSuccess)

  if (isFetching) {
    return <Loader />
  }
  if (isError) {
    return (
      <Box className={classes.errorBox}>
        <Error errorMsg={errorMsg} />
      </Box>
    )
  }
  const friends: TopFriendsType[] = data?.data.friends || []

  return (
    <Box width='100%'>
      {friends?.map((friend) => (
        <Box className={classes.section}>
          <Box className={classes.titleArea}>
            <Box className={classes.groupsTitle}>
              <img src={diamondIcon} alt='spade icon' className={classes.diamondIcon} />
              <Typography className={classes.titleFont}>
                {friend.user.username}&apos;s Groups
              </Typography>
            </Box>
          </Box>
          <GroupSlides username={friend.user.username} showPlay={false} />
        </Box>
      ))}
    </Box>
  )
}
export function Groups() {
  const { classes } = useStyles()
  return (
    <Grid container className={classes.mainContainer}>
      <Navbar auth />
      <Grid container className={classes.container}>
        <UserGroups />
        <FriendGroups />
      </Grid>
      <Box>
        <HomepageFooter />
      </Box>
    </Grid>
  )
}
