import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { type SnackbarOrigin, useSnackbar } from 'notistack'
import { Loader } from '@Components/Loader'
import { useVerifyEmailMutation } from '@Stores/index'
import { useAppSelector } from '@Hooks/redux.hooks'
import { ROUTES } from '@Constants/router.constants'
import { useStyles } from './style'

export function VerifyEmail() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { token } = useParams() as { token: string }
  const { user } = useAppSelector((store) => store.root.auth)

  const [verifyEmail] = useVerifyEmailMutation()
  const anchorOrigin: SnackbarOrigin = { vertical: 'top', horizontal: 'center' }

  useEffect(() => {
    verifyEmail({ token, username: user.username })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Email verified', {
          variant: 'success',
          anchorOrigin,
        })
      })
      .catch((error) => {
        enqueueSnackbar(error?.data?.nonFieldError ?? `Email couldn't be verified`, {
          variant: 'error',
          anchorOrigin,
        })
      })
      .finally(() => {
        navigate(ROUTES.PROFILE)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyEmail, token, user.username])

  return (
    <Box className={classes.container}>
      <Loader />
    </Box>
  )
}
