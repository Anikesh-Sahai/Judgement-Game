import clsx from 'clsx'
import { RejectInviteButton, userRelations } from '@Containers/SocialButtons'
import { useGetFriendshipStatusQuery } from '@Stores/index'
import { Loader } from '@Components/Loader'
import type { UserType } from '@Models/UserModels'
import { useStyles } from './style'

interface RelationStatusButtonPropsType {
  user: UserType
}

export function RelationStatusButton({ user }: RelationStatusButtonPropsType) {
  const { classes } = useStyles()

  const { data, isFetching, isSuccess } = useGetFriendshipStatusQuery({
    username: user.username,
  })
  const { user: statusUser, status } = data?.data ?? {}
  const updatedUser = { ...user, ...statusUser }

  if (isFetching) {
    return <Loader size='30px' />
  }

  if (isSuccess) {
    return (
      <>
        {userRelations.map((relation) =>
          relation.status === status && relation.btnType ? (
            <relation.btnType
              className={classes.play}
              user={updatedUser}
              key={`${updatedUser.username}-${relation.text}-button`}
            />
          ) : null,
        )}
        {status === 'received' && (
          <RejectInviteButton
            className={clsx(classes.play, classes.rejectBtn)}
            user={updatedUser}
            key={`${user.username}-reject-button`}
          />
        )}
      </>
    )
  }

  return null
}
