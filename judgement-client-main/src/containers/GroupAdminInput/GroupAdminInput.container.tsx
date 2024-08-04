import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { Avatar, Box, Grid, Typography } from '@mui/material'
import { AutoComplete } from '@Components/AutoComplete'
import AdminIcon from '@Assets/icons/admin.png'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import { useGetGroupMembersQuery } from '@Stores/index'
import useFetchError from '@Hooks/useFetchError'
import { Error } from '@Components/Error'
import { getName } from '@Utils/helpers'
import { INPUT_LENGTH } from '@Constants/input.constants'
import type { AutoCompleteInputPropsType } from '@Models/FormModels'
import type { UserType } from '@Models/UserModels'
import { useStyles } from './styles'

export function GroupAdminInput(props: AutoCompleteInputPropsType<UserType>) {
  const { classes } = useStyles()

  const { slug } = useParams() as { slug: string }

  const { data, error, isError, isSuccess } = useGetGroupMembersQuery({
    slug,
    limit: 50,
  })
  const members = data?.data.members?.map((member) => member.user)

  const { errorMsg } = useFetchError('Group Members', error, isError, members, isSuccess)

  if (errorMsg) {
    return <Error errorMsg={errorMsg} />
  }

  return (
    <AutoComplete
      id='group-admin-autocomplete-input'
      label='Admin'
      {...props}
      options={members ?? []}
      getOptionLabel={(option) => option?.username ?? ''}
      maxLength={INPUT_LENGTH.USERNAME.MAX}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      renderOption={(optionProps, user) => (
        <li {...optionProps} className={classes.autocompleteOption}>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            key={`search-friend-${user._id}`}
            className={classes.playerListItem}
          >
            <Box className={classes.userInfo}>
              <Grid item>
                <Avatar
                  src={user.displayImg?.smallUrl ?? profilePhotoDefault}
                  className={classes.avatars}
                />
              </Grid>
              <Grid
                container
                direction='column'
                justifyContent='center'
                className={classes.userTextSection}
              >
                <Typography className={clsx(classes.infoText, classes.username)}>
                  {user.username}
                </Typography>
                <Typography className={clsx(classes.infoText, classes.name)}>
                  {getName(user)}
                </Typography>
              </Grid>
            </Box>

            <img src={AdminIcon} alt='admin-icon' style={{ height: '30px' }} />
          </Grid>
        </li>
      )}
    />
  )
}
