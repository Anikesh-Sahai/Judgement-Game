import { NavLink, useParams } from 'react-router-dom'
import { ProfilePhoto } from '@Components/ProfilePhoto'
import { Grid, Typography, Divider, Box } from '@mui/material'
import { useGetUserQuery } from '@Stores/index'
import { Loader } from '@Components/Loader'
import type { ComponentThatLoadsType } from '@Models/ErrorModels'
import { ERROR_STATUS_CODES } from '@Constants/errors.constants'
import useFetchError from '@Hooks/useFetchError'
import { Error } from '@Components/Error'
import { ProfileMoreButton } from '@Components/ProfileMoreButton'
import { useAppSelector } from '@Hooks/redux.hooks'
import { ProfileSettings } from '@Components/ProfileSettings'
import { useStyles } from './style'

const parentErrorCodes = [
  ERROR_STATUS_CODES.UNAUTHORIZED,
  ERROR_STATUS_CODES.BAD_REQUEST,
  ERROR_STATUS_CODES.NOT_FOUND,
]

export function ProfileInfo({ onLoadError }: ComponentThatLoadsType) {
  const { classes } = useStyles()
  const { username } = useParams() as { username: string }
  const currentUser = useAppSelector((store) => store.root.auth.user)
  const { data, isFetching, isError, error, isSuccess } = useGetUserQuery({ username })
  const { user } = data?.data || {}

  const { errorMsg } = useFetchError(
    'User',
    error,
    isError,
    user,
    isSuccess,
    parentErrorCodes,
    onLoadError,
  )

  return (
    <Grid
      container
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      className={classes.profileSection}
    >
      {isFetching ? (
        <Loader />
      ) : isError || !user || errorMsg ? (
        <Error errorMsg={errorMsg} />
      ) : (
        <>
          <Grid
            container
            item
            direction='column'
            alignItems='center'
            justifyContent='center'
            className={classes.profilePart}
          >
            <Grid item container className={classes.profilePhoto}>
              <Box className={classes.profileMoreBtn}>
                {currentUser.username === user.username ? (
                  <ProfileSettings />
                ) : (
                  <ProfileMoreButton user={user} />
                )}
              </Box>
              <ProfilePhoto src={user.displayImg?.mediumUrl} />
            </Grid>

            <Grid
              container
              item
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              className={classes.nameSection}
            >
              <Typography className={classes.username}>{user.username}</Typography>
              <Typography className={classes.name}>
                {user.firstName} {user.lastName}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation='horizontal' className={classes.divider} />
          <Grid item container flexDirection='column' justifyContent='center' alignItems='center'>
            <NavLink to='games' className={classes.buttons}>
              <Box className={classes.btnCount}>
                <Typography className={classes.btnCountText}>{user.gameCount ?? 0}</Typography>
              </Box>
              <Typography className={classes.btnText}>Games</Typography>
            </NavLink>
            <NavLink to='friends' className={classes.buttons}>
              <Box className={classes.btnCount}>
                <Typography className={classes.btnCountText}>{user.friendCount ?? 0}</Typography>
              </Box>
              <Typography className={classes.btnText}>Friends</Typography>
            </NavLink>
            <NavLink to='groups' className={classes.buttons}>
              <Box className={classes.btnCount}>
                <Typography className={classes.btnCountText}>{user.groupCount ?? 0}</Typography>
              </Box>
              <Typography className={classes.btnText}>Groups</Typography>
            </NavLink>
          </Grid>
        </>
      )}
    </Grid>
  )
}
