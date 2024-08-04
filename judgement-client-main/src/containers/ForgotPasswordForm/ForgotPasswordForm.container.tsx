import clsx from 'clsx'
import { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Paper, Typography, Box } from '@mui/material'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@Schemas/forgotPassword'
import { useForgotPasswordMutation } from '@Stores/index'
import { Button } from '@Components/Button'
import { useAuthFormStyles } from '@Containers/AuthenticationForm/style'
import { ROUTES } from '@Constants/router.constants'
import useFormErrors from '@Hooks/useFormErrors'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { FormField } from '@Components/FormField'
import { useStyles } from './style'

export function ForgotPasswordForm() {
  const { classes: authFormClasses } = useAuthFormStyles()
  const { classes } = useStyles()

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<ForgotPasswordFormData>({
    mode: 'onBlur',
    defaultValues: {
      loginID: '',
    },
    resolver: yupResolver(forgotPasswordSchema),
  })

  const [forgotPassword, { isLoading, isError, error, data, isSuccess }] =
    useForgotPasswordMutation()
  const { errorMsg } = useFormErrors(setError, isError, error)
  const successMsg = data?.message

  const onSubmit = useCallback(
    (forgotPasswordData: ForgotPasswordFormData) => {
      forgotPassword(forgotPasswordData)
    },
    [forgotPassword],
  )

  return (
    <Paper variant='outlined' className={authFormClasses.container}>
      <Box className={classes.heading}>
        <Typography className={authFormClasses.heading} variant='h3'>
          Reset Password
        </Typography>
      </Box>
      {isError ? (
        <span className={clsx(authFormClasses.formResponse, authFormClasses.formError)}>
          {errorMsg}
        </span>
      ) : (
        <span className={clsx(authFormClasses.formResponse, authFormClasses.formMessage)}>
          {successMsg}
        </span>
      )}
      <form className={authFormClasses.form} onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name='loginID'
          control={control}
          label='Username/Email'
          errors={errors}
          inputProps={{ maxLength: INPUT_LENGTH.LOGIN_ID.MAX }}
          autoFocus
        />
        <Box className={authFormClasses.btnSubmit}>
          <Button type='submit' variant='contained' loading={isLoading}>
            {isSuccess ? 'Send again' : 'Reset'}
          </Button>
        </Box>
        <Box className={classes.question}>
          <span className={authFormClasses.question}>
            {`Go back to login? `}
            <NavLink className={authFormClasses.link} to={ROUTES.LOGIN}>
              Click here
            </NavLink>
          </span>
        </Box>
      </form>
    </Paper>
  )
}
