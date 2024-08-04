import { Navbar } from '@Containers/Navbar'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { TopPlayers } from '@Containers/TopPlayers'
import { TopFriends } from '@Containers/TopFriends'
import diamondIcon from '@Assets/icons/diamond-icon.png'
import { useGetMutualFriendsQuery } from '@Stores/index'
import { UserList } from '@Containers/UserList'
import { HomepageFooter } from '@Containers/HomepageFooter'
import useFetchError from '@Hooks/useFetchError'
import type { TopPlayersType } from '@Models/PlayerModels'
import { RESPONSE } from '@Constants/response.constants'
import theme from '@Themes/theme'
import { useStyles } from './style'

function FriendsAndPlayers() {
  const { classes } = useStyles()
  return (
    <Box className={classes.section}>
      <Box className={classes.titleArea}>
        <img src={diamondIcon} alt='spade icon' className={classes.diamondIcon} />
        <Typography className={classes.title}>Players</Typography>
      </Box>
      <Grid
        container
        direction='row'
        justifyContent='space-evenly'
        gap={4}
        className={classes.playersListArea}
      >
        <Grid item sm={8} md={5.6} lg={5} className={classes.playersList}>
          <Box className={classes.playersListContent}>
            <TopPlayers />
          </Box>
        </Grid>
        <Grid item sm={8} md={5.6} lg={5} className={classes.playersList}>
          <Box className={classes.playersListContent}>
            <TopFriends />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

function FindFriends() {
  const { classes } = useStyles()
  const matchMd = useMediaQuery(theme.breakpoints.down('md'))

  const { data, isFetching, isError, error, isSuccess } = useGetMutualFriendsQuery()

  const { errorMsg } = useFetchError('Mutual Friends', error, isError, data, isSuccess)

  const documentsLimit = RESPONSE.MUTUAL_FRIENDS_LIMIT
  const documentsPerColumn = (documentsLimit + 1) / 2

  const friends = data?.data?.friends ?? []
  const friendsArr: TopPlayersType[] = friends.map((friend) => ({ user: friend, status: null }))
  const column1 = friendsArr.length ? friendsArr.slice(0, documentsPerColumn) : []
  const column2 =
    friendsArr.length > documentsPerColumn
      ? friendsArr.slice(documentsPerColumn, documentsLimit)
      : []

  if (!errorMsg && friendsArr.length === 0) {
    return null
  }

  return (
    <Grid container className={classes.section}>
      <Box className={classes.titleArea}>
        <img src={diamondIcon} alt='spade icon' className={classes.diamondIcon} />
        <Typography className={classes.title}>Find Friends</Typography>
      </Box>
      <Grid
        container
        direction='row'
        justifyContent='space-evenly'
        gap={4}
        className={classes.playersListArea}
      >
        <Grid item sm={8} md={5.6} lg={5} className={classes.playersList}>
          <Box className={classes.playersListContent}>
            <UserList
              key='Suggested'
              title='Suggested'
              users={matchMd ? friendsArr : column1}
              isFetching={isFetching}
              isSuccess={isSuccess}
              errorMsg={errorMsg}
            />
          </Box>
        </Grid>
        {!matchMd && column2.length > 0 && (
          <Grid item sm={8} md={5.6} lg={5} className={classes.playersList}>
            <Box className={classes.playersListContent}>
              <UserList
                key='Suggested2'
                title='Suggested'
                users={column2}
                isFetching={isFetching}
                isSuccess={isSuccess}
                errorMsg={errorMsg}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export function Players() {
  const { classes } = useStyles()
  return (
    <Grid container className={classes.mainContainer}>
      <Navbar auth />
      <FriendsAndPlayers />
      <FindFriends />
      <HomepageFooter />
    </Grid>
  )
}
