import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { type LoginFormData, loginSchema } from '@Schemas/login/'
import { Button } from '@Components/Button'
import { Paper, Typography, Box } from '@mui/material'
import { useAuthFormStyles } from '@Containers/AuthenticationForm/style'
import { ROUTES } from '@Constants/router.constants'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '@Stores/index'
import useFormErrors from '@Hooks/useFormErrors'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { FormField } from '@Components/FormField'
import clsx from 'clsx'

export function LoginForm() {
  const { classes: authFormClasses } = useAuthFormStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    defaultValues: {
      loginID: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  const [login, { isLoading, isError, error }] = useLoginMutation()
  const { errorMsg } = useFormErrors(setError, isError, error)

  const onSubmit = useCallback(
    (loginData: LoginFormData) => {
      login(loginData)
        .unwrap()
        .then(() => {
          const { returnRoute } = location.state ?? {}
          if (returnRoute) navigate(returnRoute, { replace: true })
        })
    },
    [login, location, navigate],
  )

  return (
    <Paper variant='outlined' className={authFormClasses.container}>
      <Typography className={authFormClasses.heading} variant='h3'>
        Login
      </Typography>
      <span className={clsx(authFormClasses.formResponse, authFormClasses.formError)}>
        {errorMsg}
      </span>
      <form className={authFormClasses.form} onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name='loginID'
          control={control}
          label='Username/Email'
          errors={errors}
          inputProps={{ maxLength: INPUT_LENGTH.LOGIN_ID.MAX }}
          autoFocus
        />
        <FormField
          name='password'
          control={control}
          label='Password'
          errors={errors}
          type='password'
          inputProps={{ maxLength: INPUT_LENGTH.PASSWORD.MAX }}
        />
        <Box className={authFormClasses.btnSubmit}>
          <Button type='submit' variant='contained' loading={isLoading}>
            Log In
          </Button>
        </Box>
        <span className={clsx(authFormClasses.question, authFormClasses.firstQuestion)}>
          <NavLink className={authFormClasses.link} to={ROUTES.FORGOT_PASSWORD}>
            Forgot Password?
          </NavLink>
        </span>
        <span className={authFormClasses.question}>
          {`Don't have an account? `}
          <NavLink className={authFormClasses.link} to={ROUTES.SIGNUP}>
            Sign Up
          </NavLink>
        </span>
      </form>
    </Paper>
  )
}
