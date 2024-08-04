import { useParams } from 'react-router-dom'
import { useCallback } from 'react'
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import clsx from 'clsx'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { FormField } from '@Components/FormField'
import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@Components/Button'
import { useGetUserQuery, useUpdateEmailMutation } from '@Stores/index'
import useFormErrors from '@Hooks/useFormErrors'
import useFetchError from '@Hooks/useFetchError'
import { Loader } from '@Components/Loader'
import { Error } from '@Components/Error'
import type { UsernameType } from '@Models/UserModels/User'
import { type UpdateEmailFormData, updateEmailSchema } from '@Schemas/user'
import useFieldAvailability from '@Hooks/useFieldAvailability'
import { useMutationRequest } from '@Hooks/useMutationRequest'
import { useStyles } from './style'

interface EditEmailPropsType {
  open: boolean
  handleClose: () => void
}

interface EditEmailFormPropsType {
  handleClose: () => void
  email: string
  emailVerified: boolean
}

const formUnchanged = (
  initial: UpdateEmailFormData,
  current: UpdateEmailFormData,
  isVerified: boolean,
) => initial.email === current.email && isVerified

function EditEmailForm({ handleClose, email, emailVerified }: EditEmailFormPropsType) {
  const { classes } = useStyles()

  // react use form hook
  const {
    control,
    formState: { errors },
    reset,
    trigger,
    setError,
    handleSubmit,
  } = useForm<UpdateEmailFormData>({
    mode: 'onBlur',
    defaultValues: {
      email,
      password: '',
    },
    resolver: yupResolver(updateEmailSchema),
  })

  const { checkFieldAvailability } = useFieldAvailability(setError, trigger)

  const { handleMutationRequest, results } = useMutationRequest(
    'update email',
    useUpdateEmailMutation,
    true,
    {
      successMsg: 'Verification link sent to your email',
      errorMsg: `Couldn't send verification mail`,
    },
    () => {
      handleClose()
    },
  )
  const { isLoading, isError, error } = results

  const { errorMsg } = useFormErrors(setError, isError, error)

  const onSubmit = useCallback(
    (data: UpdateEmailFormData) => {
      if (emailVerified && !data.password) {
        setError(
          'password',
          { type: 'validate', message: 'Password is required' },
          { shouldFocus: true },
        )
        return
      }
      if (formUnchanged({ email }, data, emailVerified)) {
        return
      }
      handleMutationRequest({ formData: data })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleMutationRequest, handleClose, email],
  )

  const { dirtyFields } = useFormState({ control, name: 'email' })

  // reset form
  const resetForm = useCallback(() => {
    reset({ email })
  }, [reset, email])

  return (
    <form className={classes.editEmailForm} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column' alignItems='center' className={classes.formErrorBox}>
        <Typography className={classes.formError} variant='body1'>
          {errorMsg}
        </Typography>
      </Grid>

      <FormField
        name='email'
        control={control}
        label='Email'
        errors={errors}
        inputProps={{ maxLength: INPUT_LENGTH.EMAIL.MAX }}
        onBlur={(e) => checkFieldAvailability('email', e.target.value, email)}
      />
      {emailVerified && (
        <FormField
          name='password'
          control={control}
          label='Password'
          errors={errors}
          type='password'
          inputProps={{ maxLength: INPUT_LENGTH.PASSWORD.MAX }}
        />
      )}
      <Grid
        container
        flexDirection='row-reverse'
        justifyContent='space-evenly'
        alignItems='center'
        className={classes.formActionBtns}
      >
        <Button type='submit' loading={isLoading}>
          {!emailVerified && !dirtyFields.email ? 'Verify' : 'Submit'}
        </Button>
        <Button type='reset' onClick={resetForm} className={classes.btnCancel}>
          Reset
        </Button>
      </Grid>
    </form>
  )
}

export function EditEmail({ open, handleClose }: EditEmailPropsType) {
  const { classes } = useStyles()

  const { username } = useParams() as { username: UsernameType }
  const { data, isFetching, isError, error, isSuccess } = useGetUserQuery({ username })
  const { user } = data?.data || {}

  const { errorMsg } = useFetchError('User', error, isError, user, isSuccess)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='edit-email-dialog'
      className={clsx(classes.dialog, classes.editEmailDialog)}
    >
      <IconButton onClick={handleClose} className={classes.closeBtn}>
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
      <DialogTitle id='edit-email-dialog-title' className={classes.dialogTitle}>
        <Typography fontSize='inherit' textAlign='center'>
          Update Email
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {isFetching ? (
          <Loader size={40} />
        ) : isError || !user?.email ? (
          <Error errorMsg={errorMsg} />
        ) : (
          <EditEmailForm
            email={user.email}
            emailVerified={!!user.emailVerified}
            handleClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
