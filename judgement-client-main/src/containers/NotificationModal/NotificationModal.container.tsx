import {
  Avatar,
  AvatarGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import groupPhotoDefault from '@Assets/images/group-default.jpg'
import { useGetNotificationQuery } from '@Stores/index'
import { Loader } from '@Components/Loader'
import type { NotificationDataType } from '@Models/NotificationModels'
import useFetchError from '@Hooks/useFetchError'
import { Error } from '@Components/Error'
import clsx from 'clsx'
import { getName } from '@Utils/helpers'
import { AcceptInviteButton, RejectInviteButton } from '@Containers/SocialButtons'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useStyles } from './styles'

interface NotificationModalPropsType {
  open: boolean
  handleClose: () => void
  notificationId: string
  updatedHandleCacheMutation: () => void
}

type FriendRequestNotificationContentPropsType = Pick<NotificationDataType, 'sender'>

type GroupInviteNotificationContentPropsType = Pick<NotificationDataType, 'sender' | 'group'>

function FriendRequestNotificationContent({ sender }: FriendRequestNotificationContentPropsType) {
  const { classes } = useStyles()

  return (
    <Grid container justifyContent='center' alignItems='center' direction='column'>
      <Avatar
        src={sender?.displayImg?.mediumUrl ?? profilePhotoDefault}
        className={classes.displayImage}
      />
      <Link
        type='secondary'
        to={`/profile/${sender?.username}`}
        target='_blank'
        rel='noreferrer'
        className={clsx(classes.userLink, classes.senderUsername)}
      >
        {sender?.username}
      </Link>
      <Typography variant='h4' textAlign='center' className={classes.senderName}>
        {getName(sender)}
      </Typography>
    </Grid>
  )
}

function GroupInviteNotificationContent({
  sender,
  group,
}: GroupInviteNotificationContentPropsType) {
  const { classes } = useStyles()

  return (
    <Grid container justifyContent='center' alignItems='center' direction='column'>
      <Avatar
        src={group?.displayImg?.mediumUrl ?? groupPhotoDefault}
        className={classes.displayImage}
      />
      <Typography variant='h4' textAlign='center' className={classes.groupName}>
        {group?.groupName}
      </Typography>
      <Typography className={classes.groupDescription}>{group?.description}</Typography>
      <AvatarGroup total={group?.memberCount} spacing={18} className={classes.avatarGroup}>
        {group.members.map((player, index) => (
          <Avatar
            key={player?.user?._id}
            alt={player?.user?.username}
            src={player?.user?.displayImg?.smallUrl ?? profilePhotoDefault}
            style={{ zIndex: index }}
          />
        ))}
      </AvatarGroup>
      <Typography variant='h4' textAlign='center' className={classes.invitedBy}>
        Invited by{' '}
        <Link
          type='secondary'
          to={`/profile/${sender?.username}`}
          target='_blank'
          rel='noreferrer'
          className={clsx(classes.userLink, classes.invitedByUsername)}
        >
          {sender?.username}
        </Link>
      </Typography>
    </Grid>
  )
}

export function NotificationModal({
  open,
  handleClose,
  notificationId,
  updatedHandleCacheMutation,
}: NotificationModalPropsType) {
  const { classes } = useStyles()

  const auth = useAppSelector((store) => store.root.auth)

  const {
    data: notificationData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotificationQuery({ notificationId })
  const notification = notificationData?.data?.notification
  const { errorMsg } = useFetchError('Notification', error, isError, notification, isSuccess)

  if (errorMsg || isLoading || !notification) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='friend-request-notification-modal'
        className={clsx(classes.dialog, classes.notificationDialog)}
      >
        <DialogContent className={classes.notificationDialogContent}>
          {isLoading ? (
            <Loader size={40} />
          ) : (
            <Error errorMsg={errorMsg ?? 'Error fetching notification data'} />
          )}
        </DialogContent>
      </Dialog>
    )
  }

  const { sender, invite, group } = notification
  const isGroupNotification = !!group?._id

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={`${
        isGroupNotification ? 'group-invite' : 'friend-request'
      }-notification-modal`}
      className={clsx(classes.dialog, classes.notificationDialog)}
    >
      <IconButton onClick={handleClose} className={classes.closeBtn}>
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
      <DialogTitle id='notification-title' className={classes.notificationTitle}>
        <Typography fontSize='inherit' textAlign='center'>
          {isGroupNotification ? 'Group Invite' : 'Friend Request'}
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.notificationDialogContent}>
        {isGroupNotification ? (
          <GroupInviteNotificationContent sender={sender} group={group} />
        ) : (
          <FriendRequestNotificationContent sender={sender} />
        )}
      </DialogContent>
      <DialogActions>
        <Grid
          container
          gap='20px'
          justifyContent='center'
          alignItems='center'
          flexDirection='row-reverse'
          className={classes.modalBtns}
        >
          <AcceptInviteButton
            className={classes.socialBtn}
            user={{ ...auth.user, invite: { _id: invite } }}
            group={group}
            handleCacheMutation={updatedHandleCacheMutation}
          />
          <RejectInviteButton
            user={{ ...auth.user, invite: { _id: invite } }}
            className={clsx(classes.socialBtn, classes.rejectBtn)}
            handleCacheMutation={updatedHandleCacheMutation}
          />
        </Grid>
      </DialogActions>
    </Dialog>
  )
}
