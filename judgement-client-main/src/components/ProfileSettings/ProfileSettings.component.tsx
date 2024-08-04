import { useCallback, useState } from 'react'
import { ListItemIcon } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'
import { Dropdown } from '@Components/Dropdown'
import EditIcon from '@mui/icons-material/Edit'
import useModalState from '@Hooks/useModalState'
import { EditProfile } from '@Containers/EditProfile'
import { EditEmail } from '@Containers/EditEmail'
import { DeleteAccount } from '@Containers/DeleteAccount'
import { useStyles } from './styles'

export function ProfileSettings() {
  const { classes } = useStyles()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])
  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const {
    dialogOpen: editProfileDialogOpen,
    handleDialogOpen: handleEditProfileDialogOpen,
    handleDialogClose: handleEditProfileDialogClose,
  } = useModalState(handleClose)

  const {
    dialogOpen: editEmailDialogOpen,
    handleDialogOpen: handleEditEmailDialogOpen,
    handleDialogClose: handleEditEmailDialogClose,
  } = useModalState(handleClose)

  const {
    dialogOpen: deleteAccountDialogOpen,
    handleDialogOpen: handleDeleteAccountDialogOpen,
    handleDialogClose: handleDeleteAccountDialogClose,
  } = useModalState(handleClose)

  return (
    <>
      <Dropdown>
        <Dropdown.MenuTip open={open} onClick={handleClick}>
          <SettingsIcon fontSize='inherit' className={classes.profileSettingsIcon} />
        </Dropdown.MenuTip>
        <Dropdown.MenuBar
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          className={classes.profileSettingsMenuBar}
        >
          <Dropdown.MenuBarItem
            onClick={handleEditProfileDialogOpen}
            className={classes.profileSettingsMenuBarItem}
          >
            <ListItemIcon className={classes.itemIcon}>
              <EditIcon fontSize='inherit' color='inherit' className={classes.editIcon} />
            </ListItemIcon>
            <span className={classes.profileSettingsMenuBarBtnText}>Profile</span>
          </Dropdown.MenuBarItem>
          <Dropdown.MenuBarItem
            onClick={handleEditEmailDialogOpen}
            className={classes.profileSettingsMenuBarItem}
          >
            <ListItemIcon className={classes.itemIcon}>
              <EditIcon fontSize='inherit' color='inherit' className={classes.editIcon} />
            </ListItemIcon>
            <span className={classes.profileSettingsMenuBarBtnText}>Email</span>
          </Dropdown.MenuBarItem>
          <Dropdown.MenuBarItem
            onClick={handleDeleteAccountDialogOpen}
            className={classes.profileSettingsMenuBarItem}
          >
            <ListItemIcon className={classes.itemIcon}>
              <DeleteIcon fontSize='inherit' color='inherit' className={classes.editIcon} />
            </ListItemIcon>
            <span className={classes.profileSettingsMenuBarBtnText}>Account</span>
          </Dropdown.MenuBarItem>
        </Dropdown.MenuBar>
      </Dropdown>
      <EditProfile open={editProfileDialogOpen} handleClose={handleEditProfileDialogClose} />
      <EditEmail open={editEmailDialogOpen} handleClose={handleEditEmailDialogClose} />
      <DeleteAccount open={deleteAccountDialogOpen} handleClose={handleDeleteAccountDialogClose} />
    </>
  )
}
