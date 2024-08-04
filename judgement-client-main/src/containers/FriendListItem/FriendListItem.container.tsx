import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Grid, Box, Typography, IconButton } from '@mui/material'
import { getName } from '@Utils/helpers'
import type { FriendDataType } from '@Models/FriendModels'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import { RelationStatusButton } from '@Containers/RelationStatusButton'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useStyles } from './style'

export function FriendListItem({ friend }: { friend: FriendDataType }) {
  const { classes } = useStyles()
  const name = getName(friend?.user)
  const [showStatus, setShowStatus] = useState(false)
  const currentUser = useAppSelector((store) => store.root.auth.user)

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
      <Link to={`/profile/${friend?.user?.username}`} className={classes.link}>
        <Box className={classes.userInfo}>
          <Grid item>
            <Avatar
              src={friend?.user?.displayImg?.smallUrl ?? profilePhotoDefault}
              className={classes.avatars}
            />
          </Grid>
          <Grid
            container
            direction='column'
            justifyContent='center'
            className={classes.userTextSection}
          >
            <Typography className={classes.username} color='primary.main'>
              {friend?.user?.username}
            </Typography>
            <Typography className={classes.name}>{name} </Typography>
          </Grid>
        </Box>
      </Link>

      <Box className={classes.statusButton}>
        {showStatus ? (
          <RelationStatusButton user={friend.user} />
        ) : (
          currentUser.username !== friend.user.username && (
            <IconButton onClick={() => setShowStatus(true)} className={classes.showMoreIconBtn}>
              <MoreHorizOutlinedIcon fontSize='inherit' />
            </IconButton>
          )
        )}
      </Box>
    </Grid>
  )
}
