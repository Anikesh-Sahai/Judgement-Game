import { ControlledPopper } from '@Components/ControlledPopper'
import { ControlledTooltip } from '@Components/ControlledTooltip'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import { Box } from '@mui/material'
import { RelationStatusButton } from '@Containers/RelationStatusButton'
import type { ProfileUserType } from '@Models/UserModels/User'
import { useStyles } from './style'

interface ProfileMoreButtonPropsType {
  user: ProfileUserType
}

export function ProfileMoreButton({ user }: ProfileMoreButtonPropsType) {
  const { classes } = useStyles()

  return (
    <ControlledPopper
      ClickElement={
        <ControlledTooltip title='Know More'>
          <div className={classes.showMoreIconBtn}>
            <MoreHorizOutlinedIcon fontSize='inherit' />
          </div>
        </ControlledTooltip>
      }
      PopElement={
        <Box className={classes.popperBox}>
          <RelationStatusButton user={user} />
        </Box>
      }
    />
  )
}
