import { Link } from 'react-router-dom'
import { Avatar, Grid, Box, Typography } from '@mui/material'
import type { TopPlayersType } from '@Models/PlayerModels'
import { userRelations } from '@Containers/SocialButtons'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import { getName } from '@Utils/helpers'
import { useStyles } from './style'

interface UserListItemPropsType {
  user: TopPlayersType
}

export function UserListItem({ user }: UserListItemPropsType) {
  const { classes } = useStyles()
  const name = getName(user?.user)
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
      <Link to={`/profile/${user?.user?.username}`} className={classes.link}>
        <Box className={classes.userInfo}>
          <Grid item>
            <Avatar
              src={user?.user?.displayImg?.smallUrl ?? profilePhotoDefault}
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
              {user?.user?.username}
            </Typography>
            <Typography className={classes.name}>{name} </Typography>
          </Grid>
        </Box>
      </Link>

      <Box>
        {userRelations.map((relation) =>
          relation.status === user?.status && relation.btnType ? (
            <relation.btnType
              iconClass={classes.iconClass}
              className={classes.inviteBtn}
              user={user.user}
              key={relation.text}
            />
          ) : null,
        )}
      </Box>
    </Grid>
  )
}
