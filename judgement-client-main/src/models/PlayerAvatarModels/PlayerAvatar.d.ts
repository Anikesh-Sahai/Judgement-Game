import type { UserType } from '@Models/UserModels'
import type { BadgeOrigin } from '@mui/material'

export interface PlayerAvatarType {
  user: UserType
  BadgeElement?: JSX.Element
  anchorOrigin?: BadgeOrigin
  className?: string
  sizeOverride?: boolean
  style?: React.CSSProperties
}
