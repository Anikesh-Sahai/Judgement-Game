import { useCallback } from 'react'
import { Button } from '@Components/Button'
import { Paper, Typography, Box } from '@mui/material'
import { useAuthFormStyles } from '@Containers/AuthenticationForm/style'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useConfirmDeleteUserMutation } from '@Stores/index'
import { useMutationRequest } from '@Hooks/useMutationRequest'
import { useAppSelector } from '@Hooks/redux.hooks'
import clsx from 'clsx'
import { ROUTES } from '@Constants/router.constants'
import { useStyles } from './style'

export function ConfirmDeleteAccount() {
  const { classes: authFormClasses } = useAuthFormStyles()
  const { classes } = useStyles()
  const { token } = useParams() as { token: string }
  const { user } = useAppSelector((store) => store.root.auth)
  const navigate = useNavigate()

  const { handleMutationRequest, results } = useMutationRequest(
    'confirm delete account',
    useConfirmDeleteUserMutation,
    true,
    { successMsg: 'Your account is deleted', errorMsg: `Couldn't delete your account` },
    () => {
      navigate('/')
    },
  )
  const { isLoading } = results

  const handleConfirmDelete = useCallback(() => {
    handleMutationRequest({ token, username: user.username })
  }, [token, user.username, handleMutationRequest])

  return (
    <Paper variant='outlined' className={authFormClasses.container}>
      <Typography className={classes.question} variant='h3'>
        Are you sure you want to delete your account?
      </Typography>
      <Box className={authFormClasses.form}>
        <Box className={authFormClasses.btnSubmit}>
          <Button
            type='submit'
            variant='contained'
            loading={isLoading}
            onClick={handleConfirmDelete}
          >
            Yes, Delete
          </Button>
        </Box>
        <span className={clsx(authFormClasses.question, authFormClasses.firstQuestion)}>
          <NavLink className={authFormClasses.link} to={ROUTES.AUTH_HOME}>
            Home
          </NavLink>
        </span>
        <span className={authFormClasses.question}>
          <NavLink className={authFormClasses.link} to={ROUTES.PROFILE}>
            Profile
          </NavLink>
        </span>
      </Box>
    </Paper>
  )
}
