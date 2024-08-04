import { useMemo, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Avatar, Box, Grid, Typography } from '@mui/material'
import { ControlledPopper } from '@Components/ControlledPopper'
import {
  useGetUnreadNotificationsCountQuery,
  useLazyGetUserNotificationsQuery,
  useMarkNotificationsReadMutation,
} from '@Stores/index'
import { Loader } from '@Components/Loader'
import { useLazyLoading } from '@Hooks/useLazyLoading'
import { RESPONSE } from '@Constants/response.constants'
import type { NotificationListItemType } from '@Models/NotificationModels'
import useFetchError from '@Hooks/useFetchError'
import { Error } from '@Components/Error'
import clsx from 'clsx'
import { logDevError } from '@Utils/helpers'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import { AcceptInviteButton, RejectInviteButton } from '@Containers/SocialButtons'
import { useAppSelector } from '@Hooks/redux.hooks'
import { NotificationListItemSkeleton } from '@Components/NotificationListItemSkeleton'
import { NotificationModal } from '@Containers/NotificationModal'
import { useStyles } from './styles'

interface NotificationListItemPropsType {
  notification: NotificationListItemType
}

function NotificationListItem({ notification }: NotificationListItemPropsType) {
  const { classes } = useStyles()

  const auth = useAppSelector((store) => store.root.auth)

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, displayImg, message, invite, sender, group } = notification

  const [dialogOpen, setDialogOpen] = useState(false)
  const handleOpen = () => setDialogOpen(true)
  const handleClose = () => setDialogOpen(false)

  const updatedHandleCacheMutation = () => {
    handleClose()
  }

  return (
    <Box className={classes.itemContainer}>
      <button type='button' onClick={handleOpen} className={classes.modalOpenBtn}>
        <div />
      </button>
      {dialogOpen && (
        <NotificationModal
          open={dialogOpen}
          handleClose={handleClose}
          notificationId={_id}
          updatedHandleCacheMutation={updatedHandleCacheMutation}
        />
      )}
      <Grid
        container
        item
        direction='column'
        justifyContent='flex-start'
        alignItems='center'
        className={classes.notificationListItem}
      >
        <Box className={classes.notificationInfo}>
          <Grid item>
            <Avatar src={displayImg?.smallUrl ?? profilePhotoDefault} className={classes.avatars} />
          </Grid>
          <Grid
            container
            justifyContent='flex-start'
            alignItems='center'
            className={classes.notificationTextSection}
          >
            <Typography className={clsx(classes.infoText, classes.message)}>{message}</Typography>
          </Grid>
        </Box>
        <Grid
          container
          item
          justifyContent='flex-end'
          alignItems='center'
          className={classes.actionBtnSection}
        >
          <RejectInviteButton
            iconClass={classes.socialBtnIconSmall}
            user={{ ...auth.user, invite: { _id: invite } }}
            className={clsx(classes.socialBtnSmall, classes.rejectBtnSmall)}
            handleCacheMutation={updatedHandleCacheMutation}
          />
          <AcceptInviteButton
            iconClass={classes.socialBtnIconSmall}
            className={classes.socialBtnSmall}
            user={{ ...sender, invite: { _id: invite } }}
            group={group}
            handleCacheMutation={updatedHandleCacheMutation}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

function NotificationPanel() {
  const { classes } = useStyles()
  const documentsLimit = RESPONSE.NOTIFICATIONS_LIMIT
  const requestArgs = useMemo(() => ({}), [])

  const { notifications: notificationsKey } = useAppSelector((store) => store.refetch)

  const { state, results, trackedRef, showDetector } = useLazyLoading(
    useLazyGetUserNotificationsQuery,
    requestArgs,
    1,
    documentsLimit,
    notificationsKey,
  )

  const { pages, isFetching, isSuccess, loadErrorMsg } = state
  const { isError, error } = results

  const notifications: NotificationListItemType[] = []
  pages.forEach((page) => {
    notifications.push(...page.data.notifications)
  })

  const { errorMsg } = useFetchError('Notifications', error, isError, notifications, isSuccess)

  const errorMessage = errorMsg || loadErrorMsg

  if (isError || errorMessage) {
    return <Error errorMsg={errorMessage} />
  }

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='space-between'
      flexDirection='column'
      className={classes.notificationsContainer}
    >
      <Box className={classes.listWrapper}>
        {isSuccess && notifications.length === 0 ? (
          <Typography variant='h6' className={classes.defaultText}>
            No new activity
          </Typography>
        ) : (
          <Grid
            container
            flexDirection='column'
            alignItems='center'
            className={classes.notificationList}
          >
            {isSuccess &&
              notifications &&
              notifications.map((notification) => (
                <NotificationListItem
                  key={`notification-${notification._id}`}
                  notification={notification}
                />
              ))}
            {isFetching &&
              [...Array(documentsLimit).keys()].map((key) => (
                <NotificationListItemSkeleton
                  key={`notification-list-item-skeleton-${key}`}
                  className={clsx(classes.itemContainer, classes.notificationListItem)}
                />
              ))}
            {showDetector && (
              <Box ref={trackedRef} sx={{ width: '100%' }}>
                <NotificationListItemSkeleton
                  key='notification-list-item-skeleton-track'
                  className={clsx(classes.itemContainer, classes.notificationListItem)}
                />
              </Box>
            )}
          </Grid>
        )}
      </Box>
    </Grid>
  )
}

export function Notifications() {
  const { classes } = useStyles()
  const { data, isFetching, isSuccess } = useGetUnreadNotificationsCountQuery()
  const [markRead, { isLoading: isMarkingRead }] = useMarkNotificationsReadMutation()
  const notificationCount = data?.data?.count ?? 0

  const handleMarkRead = () => {
    if (notificationCount > 0) {
      markRead()
        .unwrap()
        .catch((err) => {
          logDevError(err)
        })
    }
  }

  return (
    <ControlledPopper
      ClickElement={
        <Box className={classes.notification}>
          <NotificationsIcon color='inherit' fontSize='inherit' />
          {(isFetching || isMarkingRead || (isSuccess && notificationCount > 0)) && (
            <span className={classes.notificationCount}>
              {isFetching || isMarkingRead ? (
                <Loader size={15} sx={{ color: 'white', padding: '1px' }} />
              ) : (
                notificationCount
              )}
            </span>
          )}
        </Box>
      }
      onClick={handleMarkRead}
      PopElement={<NotificationPanel />}
    />
  )
}
