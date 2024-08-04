import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { AppSocketNotificationEventDataType } from '@Models/NotificationModels'
import type { AppSocketGameInviteEventDataType } from '@Models/GameModels/Game'
import { type SnackbarKey, useSnackbar } from 'notistack'
import {
  AppNotifiactionSnackbarMessage,
  GameInviteSnackbarActionComponent,
  GameInviteSnackbarMessage,
} from '@Components/Snackbars'
import { getAppSocket } from '@Sockets/appSocket'
import { mainApi } from '@Apis/Api'
import { refetchActions } from '@Stores/slices/refetchSlice'
import { useAppDispatch, useAppSelector } from './redux.hooks'

export default function useAppSocketEventListeners() {
  const { token } = useAppSelector((store) => store.root.auth)
  const dispatch = useAppDispatch()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const getSocket = useCallback(() => {
    if (token) {
      return getAppSocket(token)
    }
    return null
  }, [token])

  const onAcceptInvite = useCallback((gameId: string) => {
    navigate(`/games/${gameId}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const appSocket = getSocket()

    if (appSocket) {
      appSocket.on(
        'notification',
        ({ message, displayImg, _id }: AppSocketNotificationEventDataType) => {
          dispatch(
            mainApi.util.invalidateTags([
              { type: 'Notification', id: 'count' },
              { type: 'Notification' },
            ]),
          )
          dispatch(refetchActions.setValue('notifications'))
          const key: SnackbarKey = enqueueSnackbar(
            <AppNotifiactionSnackbarMessage
              onClick={() => closeSnackbar(key)}
              message={message}
              _id={_id}
              displayImg={displayImg}
            />,
            {
              anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
              autoHideDuration: 6000,
              style: {
                background: '#000',
              },
            },
          )
        },
      )

      appSocket.on('gameInvite', ({ invitedBy, gameId }: AppSocketGameInviteEventDataType) => {
        enqueueSnackbar(
          <GameInviteSnackbarMessage
            displayImg={invitedBy?.displayImg}
            username={invitedBy?.username}
          />,
          {
            action: (snackbarKey) => (
              <GameInviteSnackbarActionComponent
                snackbarKey={snackbarKey}
                onAccept={() => onAcceptInvite(gameId)}
                onDecline={() => {}}
              />
            ),
            anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            autoHideDuration: 30000,
            style: {
              background: '#000',
            },
          },
        )
      })

      return () => {
        appSocket.close()
      }
    }
    return () => {}
  }, [enqueueSnackbar, closeSnackbar, getSocket, onAcceptInvite, dispatch])
}
