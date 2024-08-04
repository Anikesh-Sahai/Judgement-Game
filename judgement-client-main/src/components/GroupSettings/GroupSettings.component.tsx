import { useCallback, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { Dropdown } from '@Components/Dropdown'
import { EditGroup } from '@Containers/EditGroup'
import type { GroupInfoType } from '@Models/GroupModels'
import { useAppSelector } from '@Hooks/redux.hooks'
import EditIcon from '@mui/icons-material/Edit'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { ListItemIcon } from '@mui/material'
import { GroupInvite } from '@Containers/GroupInvite'
import { useStyles } from './styles'

interface GroupSettingsPropsType {
  group: GroupInfoType
}

function useGroupSettingsModal(handleClose: () => void) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true)
  }, [])
  const handleDialogClose = useCallback(() => {
    setDialogOpen(false)
    handleClose()
  }, [handleClose])

  return { dialogOpen, handleDialogOpen, handleDialogClose }
}

export function GroupSettings({ group }: GroupSettingsPropsType) {
  const { classes } = useStyles()

  const { user } = useAppSelector((store) => store.root.auth)
  const isUserGroupAdmin = group?.admin?._id && group?.admin?._id === user?._id
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])
  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const {
    dialogOpen: editGroupDialogOpen,
    handleDialogOpen: handleEditGroupDialogOpen,
    handleDialogClose: handleEditGroupDialogClose,
  } = useGroupSettingsModal(handleClose)

  const {
    dialogOpen: inviteDialogOpen,
    handleDialogOpen: handleInviteDialogOpen,
    handleDialogClose: handleInviteDialogClose,
  } = useGroupSettingsModal(handleClose)

  return (
    <>
      <Dropdown>
        <Dropdown.MenuTip open={open} onClick={handleClick}>
          <SettingsIcon fontSize='inherit' className={classes.groupSettingsIcon} />
        </Dropdown.MenuTip>
        <Dropdown.MenuBar
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          className={classes.groupSettingsMenuBar}
        >
          {isUserGroupAdmin && (
            <Dropdown.MenuBarItem
              onClick={handleEditGroupDialogOpen}
              className={classes.groupSettingsMenuBarItem}
            >
              <ListItemIcon className={classes.itemIcon}>
                <EditIcon
                  fontSize='inherit'
                  color='inherit'
                  className={classes.groupDetailsEditIcon}
                />
              </ListItemIcon>
              <span className={classes.groupSettingsMenuBarBtnText}>Edit</span>
            </Dropdown.MenuBarItem>
          )}
          <Dropdown.MenuBarItem
            onClick={handleInviteDialogOpen}
            className={classes.groupSettingsMenuBarItem}
          >
            <ListItemIcon className={classes.itemIcon}>
              <GroupAddIcon
                fontSize='inherit'
                color='inherit'
                className={classes.groupDetailsEditIcon}
              />
            </ListItemIcon>
            <span className={classes.groupSettingsMenuBarBtnText}>
              {isUserGroupAdmin ? 'Manage' : 'Invite'}
            </span>
          </Dropdown.MenuBarItem>
        </Dropdown.MenuBar>
      </Dropdown>
      <EditGroup open={editGroupDialogOpen} handleClose={handleEditGroupDialogClose} />
      <GroupInvite open={inviteDialogOpen} handleClose={handleInviteDialogClose} />
    </>
  )
}
