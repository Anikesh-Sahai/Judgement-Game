import { Grid, Typography } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { Loader } from '@Components/Loader'
import { Error } from '@Components/Error'
import type { UserListPropsType } from '@Models/UserListModels'
import { UserListItem } from '@Containers/UserListItem'
import { useStyles } from './style'

const ListType = [
  {
    title: 'Top Players',
    icon: EmojiEventsIcon,
  },
  {
    title: 'Friends',
    icon: GroupIcon,
  },
  {
    title: 'Suggested',
    icon: GroupIcon,
  },
]

export function UserList(props: UserListPropsType) {
  const { classes } = useStyles()

  const {
    title = 'Top Players',
    users,
    isFetching = false,
    isSuccess = true,
    errorMsg = '',
  } = props

  return (
    <Grid container alignItems='center' className={classes.mainboxstyling} direction='column'>
      {ListType.map((type) =>
        type.title === title ? (
          <Grid
            container
            className={classes.headingContainer}
            justifyContent='center'
            alignItems='center'
            key={title}
          >
            <type.icon className={classes.icon} />
            <Typography className={classes.mainheading}>{type.title}</Typography>
          </Grid>
        ) : null,
      )}
      <Grid
        container
        direction='column'
        alignItems='center'
        className={classes.itemsContainer}
        justifyContent={!isFetching && !isSuccess && errorMsg ? 'center' : 'flex-start'}
      >
        {isFetching ? (
          <Loader />
        ) : isSuccess ? (
          users.length ? (
            users?.map((user) => <UserListItem user={user} key={user.user._id} />)
          ) : (
            <Error errorMsg={`No ${title} found`} />
          )
        ) : errorMsg ? (
          <Error errorMsg={errorMsg} />
        ) : null}
      </Grid>
    </Grid>
  )
}
