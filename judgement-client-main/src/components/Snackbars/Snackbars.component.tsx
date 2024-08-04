import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { type SnackbarKey, useSnackbar } from 'notistack'
import Check from '@mui/icons-material/Check'
import Close from '@mui/icons-material/Close'
import { Avatar, IconButton } from '@mui/material'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import type { ImageFileType } from '@Models/ImageFileModels'
import type { UsernameType } from '@Models/UserModels/User'
import type { AppSocketNotificationEventDataType } from '@Models/NotificationModels'
import { useMarkNotificationReadMutation } from '@Stores/index'
import { NotificationModal } from '@Containers/NotificationModal'
import { useStyles } from './style'

interface SnackbarCloseButtonPropsType {
  snackbarKey: SnackbarKey
}

export function SnackbarCloseButton({ snackbarKey }: SnackbarCloseButtonPropsType) {
  const { classes } = useStyles()
  const { closeSnackbar } = useSnackbar()

  return (
    <IconButton
      className={clsx(classes.snackbarCloseButton, classes.snackbarActionButton)}
      onClick={() => closeSnackbar(snackbarKey)}
    >
      <Close fontSize='inherit' />
    </IconButton>
  )
}

interface SnackbarButtonPropsType {
  children: React.ReactNode
  onClick: () => void
}

export function SnackbarButton({ children, onClick }: SnackbarButtonPropsType) {
  const { classes } = useStyles()

  return (
    <IconButton
      className={clsx(classes.snackbarActionButton, classes.snackbarMessageButton)}
      onClick={onClick}
    >
      {children}
    </IconButton>
  )
}

interface GameInviteSnackbarMessagePropsType {
  displayImg: ImageFileType
  username: UsernameType
}

export function GameInviteSnackbarMessage({
  displayImg,
  username,
}: GameInviteSnackbarMessagePropsType) {
  const { classes } = useStyles()

  return (
    <div className={classes.gameInviteContainer}>
      <Avatar
        src={displayImg?.smallUrl ?? profilePhotoDefault}
        className={classes.gameInviteAvatar}
      />
      <p className={classes.snackbarMessageText}>
        <span className={classes.gameInviteMessageUsername}>{username}</span> invited you to join a
        game
      </p>
    </div>
  )
}

interface AppNotificationSnackbarMessagePropsType
  extends Pick<AppSocketNotificationEventDataType, '_id' | 'message' | 'displayImg'> {
  onClick?: () => void
}

export function AppNotifiactionSnackbarMessage({
  displayImg,
  message,
  _id,
  onClick,
}: AppNotificationSnackbarMessagePropsType) {
  const { classes } = useStyles()

  const [dialogOpen, setDialogOpen] = useState(false)
  const handleOpen = () => setDialogOpen(true)
  const handleClose = () => setDialogOpen(false)
  const [markRead] = useMarkNotificationReadMutation()

  const updatedHandleClose = () => {
    markRead({ notificationId: _id })
    handleClose()
    onClick?.()
  }

  return (
    <>
      <button
        type='button'
        onClick={handleOpen}
        className={classes.appNotificationMessageContainer}
      >
        <Avatar
          src={displayImg?.smallUrl ?? profilePhotoDefault}
          className={classes.gameInviteAvatar}
        />
        <p className={classes.snackbarMessageText}>{message}</p>
      </button>
      {dialogOpen && (
        <NotificationModal
          open={dialogOpen}
          handleClose={updatedHandleClose}
          notificationId={_id}
          updatedHandleCacheMutation={updatedHandleClose}
        />
      )}
    </>
  )
}

interface GameInviteSnackbarActionComponentPropsType {
  snackbarKey: SnackbarKey
  onAccept: () => void
  onDecline: () => void
}

export function GameInviteSnackbarActionComponent({
  snackbarKey,
  onAccept,
  onDecline,
}: GameInviteSnackbarActionComponentPropsType) {
  const { closeSnackbar } = useSnackbar()

  const onActionComplete = useCallback(
    (func: () => void, snackbarKeyValue: SnackbarKey) => () => {
      func()
      closeSnackbar(snackbarKeyValue)
    },
    [closeSnackbar],
  )

  return (
    <>
      <SnackbarButton onClick={onActionComplete(onAccept, snackbarKey)}>
        <Check />
      </SnackbarButton>
      <SnackbarButton onClick={onActionComplete(onDecline, snackbarKey)}>
        <Close />
      </SnackbarButton>
    </>
  )
}
