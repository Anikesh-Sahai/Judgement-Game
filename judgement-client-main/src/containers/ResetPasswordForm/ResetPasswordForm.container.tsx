import clsx from 'clsx'
import { useCallback } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Paper, Typography, Box } from '@mui/material'
import { useResetPasswordMutation } from '@Stores/index'
import { type ResetPasswordFormData, resetPasswordSchema } from '@Schemas/resetPassword'
import { Button } from '@Components/Button'
import { useAuthFormStyles } from '@Containers/AuthenticationForm/style'
import { ROUTES } from '@Constants/router.constants'
import useFormErrors from '@Hooks/useFormErrors'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { FormField } from '@Components/FormField'
import { useStyles } from './style'

export function ResetPasswordForm() {
  const { classes: authFormClasses } = useAuthFormStyles()
  const { classes } = useStyles()
  const { token } = useParams()

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<ResetPasswordFormData>({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(resetPasswordSchema),
  })

  const [resetPassword, { isLoading, isError, error }] = useResetPasswordMutation()
  const { errorMsg } = useFormErrors(setError, isError, error)

  const onSubmit = useCallback(
    (resetPasswordData: ResetPasswordFormData) => {
      if (token) resetPassword({ resetPasswordData, token })
    },
    [resetPassword, token],
  )

  return (
    <Paper variant='outlined' className={authFormClasses.container}>
      <Box className={classes.heading}>
        <Typography className={authFormClasses.heading} variant='h3'>
          Update Password
        </Typography>
      </Box>
      <span className={clsx(authFormClasses.formResponse, authFormClasses.formError)}>
        {errorMsg}
      </span>
      <form className={authFormClasses.form} onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name='password'
          control={control}
          label='Password'
          errors={errors}
          type='password'
          inputProps={{ maxLength: INPUT_LENGTH.PASSWORD.MAX }}
          autoFocus
        />
        <FormField
          name='passwordConfirm'
          control={control}
          label='Confirm Password'
          errors={errors}
          type='password'
          inputProps={{ maxLength: INPUT_LENGTH.PASSWORD.MAX }}
        />
        <Box className={authFormClasses.btnSubmit}>
          <Button type='submit' variant='contained' loading={isLoading}>
            Submit
          </Button>
        </Box>
        <Box className={classes.question}>
          <span className={authFormClasses.question}>
            <NavLink className={authFormClasses.link} to={ROUTES.FORGOT_PASSWORD}>
              Click here
            </NavLink>
            {' to resend email'}
          </span>
        </Box>
      </form>
    </Paper>
  )
}
