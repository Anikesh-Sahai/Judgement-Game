/* eslint-disable no-nested-ternary */
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import clsx from 'clsx'
import EditIcon from '@mui/icons-material/Edit'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import profileImageDefault from '@Assets/images/profile-default.png'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { FormField } from '@Components/FormField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@Components/Button'
import { useGetUserQuery, useUpdateUserMutation } from '@Stores/index'
import type { UploadedFileType } from '@Models/FileModels'
import { getAllowedImageExtensions } from '@Utils/helpers'
import useFormErrors from '@Hooks/useFormErrors'
import { useImageUpload } from '@Hooks/useImageUpload'
import useFetchError from '@Hooks/useFetchError'
import { Loader } from '@Components/Loader'
import { Error } from '@Components/Error'
import type { ProfileUserType, UsernameType } from '@Models/UserModels/User'
import { type UpdateUserFormData, updateUserSchema } from '@Schemas/user'
import useFieldAvailability from '@Hooks/useFieldAvailability'
import { useStyles } from './style'

interface EditProfilePropsType {
  open: boolean
  handleClose: () => void
}

interface EditUserFormPropsType {
  setUploadedFileId: React.Dispatch<React.SetStateAction<string | undefined>>
  handleClose: () => void
  initialData: ProfileUserType
}

function EditUserForm({ setUploadedFileId, handleClose, initialData }: EditUserFormPropsType) {
  const { classes } = useStyles()

  const { firstName, lastName, displayImg, username } = initialData

  const defaultFormValues = useMemo(
    () => ({
      firstName,
      lastName,
      username,
    }),
    [firstName, lastName, username],
  )

  // react use form hook
  const {
    control,
    formState: { errors },
    reset,
    trigger,
    setValue,
    setError,
    handleSubmit,
  } = useForm<UpdateUserFormData>({
    mode: 'onBlur',
    defaultValues: defaultFormValues,
    resolver: yupResolver(updateUserSchema),
  })

  // image upload
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showCurrentImage, setShowCurrentImage] = useState(true)

  const onImageUpload = useCallback(
    (file: UploadedFileType) => {
      setValue('displayImg', file.id)
      setUploadedFileId(file.id)
      setImageLoaded(false)
      setShowCurrentImage(false)
    },
    [setValue, setUploadedFileId],
  )

  const { image, handleImageUpload, handleImageDelete, uploadErrorMsg, isImageUploading } =
    useImageUpload(onImageUpload)

  const imageLoading = isImageUploading || !imageLoaded
  const imageSet = (image?.urls?.mediumUrl || displayImg?.mediumUrl) ?? false
  const currentDisplayImgUrl = showCurrentImage ? displayImg?.mediumUrl : image?.urls?.mediumUrl

  useEffect(() => {
    setError('displayImg', { type: 'custom', message: uploadErrorMsg })
  }, [setError, uploadErrorMsg])

  // form submission
  const { checkFieldAvailability } = useFieldAvailability(setError, trigger)
  const navigate = useNavigate()
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation()

  const { errorMsg } = useFormErrors(setError, isError, error)

  const formUnchanged = useCallback(
    (initial: ProfileUserType, current: UpdateUserFormData) =>
      !current.displayImg &&
      initial.firstName === current.firstName &&
      initial.lastName === current.lastName &&
      initial.username === current.username,
    [],
  )

  const onSubmit = useCallback(
    (data: UpdateUserFormData) => {
      if (formUnchanged(initialData, data)) {
        return
      }
      updateUser({ formData: data, username })
        .unwrap()
        .then(({ data: updatedUserData }) => {
          handleClose()
          const newUsername = updatedUserData?.user?.username ?? username
          navigate(`/profile/${newUsername}`)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateUser, handleClose, username],
  )

  // reset form
  const resetForm = useCallback(() => {
    reset({ ...defaultFormValues })
    handleImageDelete()
    setUploadedFileId(undefined)
    setShowCurrentImage(true)
  }, [reset, handleImageDelete, setUploadedFileId, defaultFormValues])

  return (
    <form className={classes.editProfileForm} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column' alignItems='center' className={classes.imageFieldBox}>
        <Box className={classes.imageUploadBox}>
          <img
            alt='profile'
            src={currentDisplayImgUrl ?? profileImageDefault}
            className={classes.profileImage}
            onLoad={() => setImageLoaded(true)}
          />
          <label
            htmlFor='file-upload'
            className={clsx(classes.absoluteFill, classes.uploadArea, {
              [classes.uploadAreaLoading]: imageLoading,
            })}
          >
            <input
              type='file'
              id='file-upload'
              onChange={(e) => handleImageUpload(e.target.files)}
              disabled={imageLoading}
              accept={getAllowedImageExtensions()}
            />
            {imageLoading ? (
              <CircularProgress size={25} className='image-file-upload-icon loading' />
            ) : imageSet ? (
              <EditIcon className='image-file-upload-icon' />
            ) : (
              <AddPhotoAlternateIcon className='image-file-upload-icon' />
            )}
          </label>
        </Box>
        <Typography className={classes.imageUploadError} variant='body1'>
          {errorMsg || errors?.displayImg?.message}
        </Typography>
      </Grid>

      <FormField
        name='username'
        control={control}
        label='Username'
        errors={errors}
        inputProps={{ maxLength: INPUT_LENGTH.USERNAME.MAX }}
        onBlur={(e) => checkFieldAvailability('username', e.target.value, username)}
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
      <Grid
        container
        flexDirection='row-reverse'
        justifyContent='space-evenly'
        alignItems='center'
        className={classes.formActionBtns}
      >
        <Button type='submit' disabled={imageLoading} loading={isLoading}>
          Submit
        </Button>
        <Button type='reset' onClick={resetForm} className={classes.btnCancel}>
          Reset
        </Button>
      </Grid>
    </form>
  )
}

export function EditProfile({ open, handleClose }: EditProfilePropsType) {
  const { classes } = useStyles()

  const [uploadedFileId, setUploadedFileId] = useState<string>()

  const { handleImageDelete } = useImageUpload()
  const handleCloseFormCancelled = useCallback(() => {
    handleClose()
    handleImageDelete(uploadedFileId)
  }, [handleClose, handleImageDelete, uploadedFileId])

  const { username } = useParams() as { username: UsernameType }
  const { data, isFetching, isError, error, isSuccess } = useGetUserQuery({ username })
  const { user } = data?.data || {}

  const { errorMsg } = useFetchError('User', error, isError, user, isSuccess)

  return (
    <Dialog
      open={open}
      onClose={handleCloseFormCancelled}
      aria-labelledby='edit-user-dialog'
      className={clsx(classes.dialog, classes.editProfileDialog)}
    >
      <IconButton onClick={handleCloseFormCancelled} className={classes.closeBtn}>
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
      <DialogTitle id='edit-user-dialog-title' className={classes.dialogTitle}>
        <Typography fontSize='inherit' textAlign='center'>
          Edit Profile
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {isFetching ? (
          <Loader size={40} />
        ) : isError || !user ? (
          <Error errorMsg={errorMsg} />
        ) : (
          <EditUserForm
            initialData={user}
            setUploadedFileId={setUploadedFileId}
            handleClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
