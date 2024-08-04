import { useCallback } from 'react'
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import clsx from 'clsx'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { FormField } from '@Components/FormField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@Components/Button'
import { useDeleteUserMutation } from '@Stores/index'
import useFormErrors from '@Hooks/useFormErrors'
import { type DeleteUserFormData, deleteUserSchema } from '@Schemas/user'
import { useMutationRequest } from '@Hooks/useMutationRequest'
import { useStyles } from './style'

interface DeleteAccountPropsType {
  open: boolean
  handleClose: () => void
}

interface DeleteAccountFormPropsType {
  handleClose: () => void
}

function DeleteAccountForm({ handleClose }: DeleteAccountFormPropsType) {
  const { classes } = useStyles()

  // react use form hook
  const {
    control,
    formState: { errors },
    reset,
    setError,
    handleSubmit,
  } = useForm<DeleteUserFormData>({
    mode: 'onBlur',
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(deleteUserSchema),
  })

  const { handleMutationRequest, results } = useMutationRequest(
    'delete account',
    useDeleteUserMutation,
    true,
    {
      successMsg: 'Account deletion link sent to your email',
      errorMsg: `Couldn't send deletion link to your email`,
    },
    () => {
      handleClose()
    },
  )
  const { isLoading, isError, error } = results

  const { errorMsg } = useFormErrors(setError, isError, error)

  const onSubmit = useCallback(
    (data: DeleteUserFormData) => {
      handleMutationRequest({ formData: data })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleMutationRequest, handleClose],
  )

  // reset form
  const resetForm = useCallback(() => {
    reset({ password: '' })
  }, [reset])

  return (
    <form className={classes.deleteAccountForm} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column' alignItems='center' className={classes.formErrorBox}>
        <Typography className={classes.formError} variant='body1'>
          {errorMsg}
        </Typography>
      </Grid>

      <FormField
        name='password'
        control={control}
        label='Password'
        errors={errors}
        type='password'
        inputProps={{ maxLength: INPUT_LENGTH.PASSWORD.MAX }}
      />

      <Grid
        container
        flexDirection='row-reverse'
        justifyContent='space-evenly'
        alignItems='center'
        className={classes.formActionBtns}
      >
        <Button type='submit' loading={isLoading}>
          Submit
        </Button>
        <Button type='reset' onClick={resetForm} className={classes.btnCancel}>
          Reset
        </Button>
      </Grid>
    </form>
  )
}

export function DeleteAccount({ open, handleClose }: DeleteAccountPropsType) {
  const { classes } = useStyles()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='delete-account-dialog'
      className={clsx(classes.dialog, classes.deleteAccountDialog)}
    >
      <IconButton onClick={handleClose} className={classes.closeBtn}>
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
      <DialogTitle id='delete-account-dialog-title' className={classes.dialogTitle}>
        <Typography fontSize='inherit' textAlign='center'>
          Delete Account
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DeleteAccountForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
