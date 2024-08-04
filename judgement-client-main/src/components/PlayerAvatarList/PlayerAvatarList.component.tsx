import clsx from 'clsx'
import { Box, Grid, IconButton } from '@mui/material'
import { PlayerAvatar } from '@Components/PlayerAvatar'
import type { UserType } from '@Models/UserModels'
import crossBadgeIcon from '@Assets/icons/crossBadge.png'
import { GroupMemberAvatarSkeleton } from '@Components/GroupMemberAvatarSkeleton'
import { useStyles } from './style'

interface PlayerAvatarListPropsType {
  users: (UserType | null)[]
  listClassName?: string
  avatarClassName?: string
  showDetector?: boolean
  trackedRef?: (node?: Element | null | undefined) => void
  onRemoveUser?: (user: UserType) => void
  componentHeight?: string
  badgeHiddenUsers?: string[]
}

export function PlayerAvatarList({
  users,
  listClassName = '',
  avatarClassName = '',
  showDetector = false,
  trackedRef,
  onRemoveUser,
  componentHeight = 'auto',
  badgeHiddenUsers = [],
}: PlayerAvatarListPropsType) {
  const { classes } = useStyles()

  return (
    <Grid
      container
      style={{ height: componentHeight }}
      className={clsx(classes.avatarList, listClassName)}
    >
      {users.map((user, index) =>
        user ? (
          <Box key={`avatar-list-avatar-${user._id}`}>
            <PlayerAvatar
              BadgeElement={
                onRemoveUser && !badgeHiddenUsers.includes(user._id) ? (
                  <IconButton onClick={() => onRemoveUser(user)} className={classes.btn}>
                    <img src={crossBadgeIcon} alt='remove' className={classes.btnIcon} />
                  </IconButton>
                ) : undefined
              }
              user={user}
              className={clsx(classes.avatar, avatarClassName)}
              sizeOverride
            />
          </Box>
        ) : (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={`member-skeleton-${index}`}>
            <GroupMemberAvatarSkeleton className={classes.avatar} />
          </Box>
        ),
      )}
      {showDetector && (
        <Box ref={trackedRef} key='member-skeleton-tracked-ref'>
          <GroupMemberAvatarSkeleton className={classes.avatar} />
        </Box>
      )}
    </Grid>
  )
}
