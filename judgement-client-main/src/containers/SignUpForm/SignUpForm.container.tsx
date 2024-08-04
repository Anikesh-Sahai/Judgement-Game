import { useState, useEffect, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { type SnackbarOrigin, useSnackbar } from 'notistack'
import clsx from 'clsx'
import { signUpSchema, type SignUpFormData } from '@Schemas/signUp'
import { Button } from '@Components/Button'
import { Box, IconButton, MobileStepper, Paper, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { FormField } from '@Components/FormField'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@Constants/router.constants'
import useFormErrors from '@Hooks/useFormErrors'
import { useSignupMutation } from '@Stores/index'
import { useAuthFormStyles } from '@Containers/AuthenticationForm/style'
import useFieldAvailability from '@Hooks/useFieldAvailability'

export function SignUpForm() {
  const { classes: authFormClasses } = useAuthFormStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    trigger,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(signUpSchema),
  })

  // current form step
  const [step, setStep] = useState<number>(0)

  // rtk methods and results for signup api call
  const [signup, { isLoading, isError, error }] = useSignupMutation()

  const { enqueueSnackbar } = useSnackbar()
  const anchorOrigin: SnackbarOrigin = useMemo(
    () => ({ vertical: 'top', horizontal: 'center' }),
    [],
  )

  const { checkFieldAvailability } = useFieldAvailability(setError, trigger)

  const { errorMsg } = useFormErrors(setError, isError, error)

  const onSubmit = useCallback(
    (signUpData: SignUpFormData) => {
      signup(signUpData)
        .unwrap()
        .then(() => {
          enqueueSnackbar('Welcome to Judgement! Email verification link sent', {
            variant: 'success',
            anchorOrigin,
          })
          const { returnRoute } = location.state ?? {}
          if (returnRoute) navigate(returnRoute, { replace: true })
        })
    },
    [signup, enqueueSnackbar, anchorOrigin, navigate, location.state],
  )

  useEffect(() => {
    if (
      step === 1 &&
      (errors.email?.message || errors.password?.message || errors.passwordConfirm?.message)
    ) {
      setStep(0)
    }
  }, [step, errors, isError])

  return (
    <Paper variant='outlined' className={authFormClasses.container}>
      {step === 1 && (
        <IconButton
          aria-label='back-button'
          className={authFormClasses.btnBack}
          onClick={() => setStep(0)}
        >
          <ArrowBackIcon fontSize='inherit' />
        </IconButton>
      )}
      <Typography className={authFormClasses.heading} variant='h3'>
        Sign Up
      </Typography>
      <MobileStepper
        className={authFormClasses.stepper}
        variant='dots'
        steps={2}
        position='static'
        activeStep={step}
        nextButton={null}
        backButton={null}
      />
      <span className={clsx(authFormClasses.formResponse, authFormClasses.formError)}>
        {errorMsg}
      </span>
      <form className={authFormClasses.form} onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <>
            <FormField
              name='email'
              control={control}
              label='Email'
              errors={errors}
              type='email'
              inputProps={{ maxLength: INPUT_LENGTH.EMAIL.MAX }}
              onBlur={(e) => checkFieldAvailability('email', e.target.value)}
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
            <FormField
              name='passwordConfirm'
              control={control}
              label='Confirm Password'
              errors={errors}
              type='password'
              inputProps={{ maxLength: INPUT_LENGTH.PASSWORD.MAX }}
            />
          </>
        )}
        {step === 1 && (
          <>
            <FormField
              name='username'
              control={control}
              label='Username'
              errors={errors}
              inputProps={{ maxLength: INPUT_LENGTH.USERNAME.MAX }}
              onBlur={(e) => checkFieldAvailability('username', e.target.value)}
              autoFocus
            />
            <FormField
              name='firstName'
              control={control}
              label='First Name'
              errors={errors}
              inputProps={{ maxLength: INPUT_LENGTH.FIRST_NAME.MAX }}
            />
            <FormField
              name='lastName'
              control={control}
              label='Last Name'
              errors={errors}
              inputProps={{ maxLength: INPUT_LENGTH.LAST_NAME.MAX }}
            />
          </>
        )}
        {step === 0 && (
          <Box className={clsx(authFormClasses.btnSubmit, authFormClasses.btnNext)}>
            <Button
              type='submit'
              variant='contained'
              onClick={() => {
                trigger(['email', 'password', 'passwordConfirm'])
                setStep(1)
              }}
            >
              Next
            </Button>
          </Box>
        )}
        {step === 1 && (
          <Box className={authFormClasses.btnSubmit}>
            <Button type='submit' variant='contained' loading={isLoading}>
              Sign Up
            </Button>
          </Box>
        )}
        <span className={authFormClasses.question}>
          {`Have an account? `}
          <NavLink className={authFormClasses.link} to={ROUTES.LOGIN}>
            Log In
          </NavLink>
        </span>
      </form>
    </Paper>
  )
}
