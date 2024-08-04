import { useParams } from 'react-router-dom'
import { Grid, Box, Typography, useMediaQuery } from '@mui/material'
import { ProfilePhoto } from '@Components/ProfilePhoto'
import { NavButton } from '@Components/NavButton'
import { ROUTES } from '@Constants/router.constants'
import theme from '@Themes/theme'
import { useGetGroupQuery } from '@Stores/index'
import useFetchError from '@Hooks/useFetchError'
import { ERROR_STATUS_CODES } from '@Constants/errors.constants'
import type { ComponentThatLoadsType } from '@Models/ErrorModels'
import { Error } from '@Components/Error'
import { Loader } from '@Components/Loader'
import { GroupSettings } from '@Components/GroupSettings'
import { useStyles } from './styles'

function ProfileSection({ imageUrl }: { imageUrl: string }) {
  const { classes } = useStyles()

  return (
    <Grid container justifyContent='center' alignItems='center' className={classes.profileSection}>
      <ProfilePhoto src={imageUrl} />
    </Grid>
  )
}

function GroupDescription({ description }: { description: string }) {
  const { classes } = useStyles()

  return (
    <Grid item className={classes.groupDescription}>
      <Typography fontSize='inherit'>{description}</Typography>
    </Grid>
  )
}

const parentErrorCodes = [
  ERROR_STATUS_CODES.UNAUTHORIZED,
  ERROR_STATUS_CODES.BAD_REQUEST,
  ERROR_STATUS_CODES.NOT_FOUND,
]

export function GroupInfo({ onLoadError }: ComponentThatLoadsType) {
  const { classes } = useStyles()
  const down500 = useMediaQuery(theme.breakpoints.down(500))

  const { slug } = useParams() as { slug: string }

  const { data: groupData, isFetching, isError, error, isSuccess } = useGetGroupQuery({ slug })
  const group = groupData?.data?.group

  const { errorMsg } = useFetchError(
    'Group',
    error,
    isError,
    group,
    isSuccess,
    parentErrorCodes,
    onLoadError,
  )

  if (isFetching) {
    return <Loader />
  }

  if (isError || !group) {
    return <Error errorMsg={errorMsg} />
  }

  return (
    <>
      <Box className={classes.settingsIcon}>
        <GroupSettings group={group} />
      </Box>
      <ProfileSection imageUrl={group.displayImg?.mediumUrl} />
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        className={classes.contentSection}
      >
        <Grid item container justifyContent='left' className={classes.groupHeading}>
          <Typography fontSize='inherit'>{group.groupName}</Typography>
        </Grid>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='flex-end'
          className={classes.bottomContent}
        >
          {!down500 && <GroupDescription description={group.description} />}
          <Grid item>
            <NavButton to={ROUTES.PLAY} type='primary' className={classes.playBtn}>
              Play Now
            </NavButton>
          </Grid>
        </Grid>
      </Grid>
      {down500 && <GroupDescription description={group.description} />}
    </>
  )
}
