import clsx from 'clsx'
import { Avatar, Badge } from '@mui/material'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import { ControlledPopper } from '@Components/ControlledPopper'
import { ControlledTooltip } from '@Components/ControlledTooltip'
import { PlayerSummary } from '@Containers/PlayerSummary'
import type { PlayerAvatarType } from '@Models/PlayerAvatarModels'
import { useStyles } from './styles'

export function PlayerAvatar({
  user,
  BadgeElement,
  anchorOrigin,
  className = '',
  sizeOverride = false,
  style = {},
}: PlayerAvatarType) {
  const { classes } = useStyles()

  return (
    <Badge
      anchorOrigin={anchorOrigin}
      badgeContent={BadgeElement}
      overlap='circular'
      className={clsx({ [classes.sizeOverride]: sizeOverride })}
    >
      <ControlledPopper
        ClickElement={
          <ControlledTooltip title={`${user?.firstName} ${user?.lastName}`}>
            <Avatar
              alt='profile-photo'
              srcSet={user?.displayImg?.mediumUrl ?? profilePhotoDefault}
              className={clsx(classes.avatar, className)}
              style={{ ...style }}
            />
          </ControlledTooltip>
        }
        PopElement={<PlayerSummary user={user} />}
        className={classes.btn}
        sizeOverride={sizeOverride}
      />
    </Badge>
  )
}
