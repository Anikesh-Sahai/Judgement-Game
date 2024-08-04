import { Box, Grid, Avatar, Typography, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import type { UserType } from '@Models/UserModels'
import { ROUTES } from '@Constants/router.constants'
import theme from '@Themes/theme'
import { useGetFriendshipStatusQuery, useGetUserQuery } from '@Stores/index'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import { useAppSelector } from '@Hooks/redux.hooks'
import type { PlayerSummaryPropsType, UserRelationStatusType } from '@Models/PlayerModels'
import { Loader } from '@Components/Loader'
import { userRelations } from '@Containers/SocialButtons'
import { useStyles } from './styles'

function RelationButton({
  status,
  user,
  currentUser,
}: {
  status: UserRelationStatusType
  user: UserType
  currentUser: UserType
}) {
  const { classes } = useStyles()

  if (user._id === currentUser._id) {
    return null
  }

  return (
    <>
      {userRelations.map((relation) =>
        relation.status === status && relation.btnType ? (
          <relation.btnType className={classes.btn} user={user} key={relation.text} />
        ) : null,
      )}
    </>
  )
}

export function PlayerSummary({ user }: PlayerSummaryPropsType) {
  const { classes } = useStyles()
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'))

  const auth = useAppSelector((store) => store?.root?.auth)
  const currentUser = auth?.user

  const {
    data: statusData,
    isFetching: isStatusFetching,
    isSuccess: isStatusSuccess,
  } = useGetFriendshipStatusQuery({ username: user.username })
  const { user: relationUser, status } = statusData?.data ?? {}
  const updatedUser = { ...user, ...relationUser }

  const {
    data: profileData,
    isFetching: isProfileFetching,
    isSuccess: isProfileSuccess,
  } = useGetUserQuery({ username: user.username })
  const { user: userProfile } = profileData?.data ?? {}

  const { gameCount = 0, friendCount = 0, groupCount = 0 } = userProfile ?? {}

  return (
    <Box className={classes.box}>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        className={classes.info}
        gap={{ xs: 0.5, sm: 1 }}
      >
        <Box>
          <Avatar
            alt={user.username}
            src={user.displayImg?.smallUrl ?? profilePhotoDefault}
            className={classes.avatar}
          />
        </Box>
        <Link to={`${ROUTES.PROFILE}/${user.username}`} className={classes.navbtn}>
          {user.username}
        </Link>
        {matchSm && (
          <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            gap={1}
            className={classes.btnsArea}
          >
            {isStatusFetching ? (
              <Loader size='30px' />
            ) : (
              isStatusSuccess &&
              status !== undefined && (
                <RelationButton status={status} user={updatedUser} currentUser={currentUser} />
              )
            )}
          </Grid>
        )}
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='end'
        className={classes.btnTab}
      >
        <Box className={classes.statsArea}>
          {isProfileFetching ? (
            <Loader size='30px' />
          ) : (
            isProfileSuccess && (
              <>
                <Typography variant='h5' className={classes.statsText}>
                  {`${gameCount} Game${gameCount === 1 ? '' : 's'}`}
                </Typography>
                <Typography variant='h5' className={classes.statsText}>
                  {`${friendCount} Friend${friendCount === 1 ? '' : 's'}`}
                </Typography>
                <Typography variant='h5' className={classes.statsText}>
                  {`${groupCount} Group${groupCount === 1 ? '' : 's'}`}
                </Typography>
              </>
            )
          )}
        </Box>
        {!matchSm && (
          <Grid
            item
            container
            xs={7}
            direction='column'
            justifyContent='flex-end'
            alignItems='end'
            gap={1}
            className={classes.btnsArea}
          >
            {isStatusFetching ? (
              <Loader size='30px' />
            ) : (
              isStatusSuccess &&
              status !== undefined && (
                <RelationButton status={status} user={updatedUser} currentUser={currentUser} />
              )
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
