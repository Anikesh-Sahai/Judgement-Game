/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import clsx from 'clsx'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EditIcon from '@mui/icons-material/Edit'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import groupImageDefault from '@Assets/images/group-default.jpg'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { FormField } from '@Components/FormField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@Components/Button'
import { type CreateGroupFormData, createGroupSchema } from '@Schemas/group'
import { useCreateGroupMutation } from '@Stores/index'
import type { UploadedFileType } from '@Models/FileModels'
import { getAllowedImageExtensions } from '@Utils/helpers'
import useFormErrors from '@Hooks/useFormErrors'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useImageUpload } from '@Hooks/useImageUpload'
import { useStyles } from './style'

interface NewGroupPropsType {
  className?: string
}

interface NewGroupFormPropsType {
  setUploadedFileId: React.Dispatch<React.SetStateAction<string | undefined>>
  handleClose: () => void
}

const defaultFormValues = {
  groupName: '',
  description: '',
  displayImg: undefined,
}

function NewGroupForm({ setUploadedFileId, handleClose }: NewGroupFormPropsType) {
  const { classes } = useStyles()
  const auth = useAppSelector((store) => store.root.auth)

  const heightBelow400px = useMediaQuery('@media (max-height: 400px)')

  // react use form hook
  const {
    control,
    formState: { errors },
    reset,
    setValue,
    setError,
    handleSubmit,
  } = useForm<CreateGroupFormData>({
    mode: 'onBlur',
    defaultValues: defaultFormValues,
    resolver: yupResolver(createGroupSchema),
  })

  // image upload
  const [imageLoaded, setImageLoaded] = useState(false)

  const onImageUpload = useCallback(
    (file: UploadedFileType) => {
      setValue('displayImg', file.id)
      setUploadedFileId(file.id)
      setImageLoaded(false)
    },
    [setValue, setUploadedFileId],
  )

  const { image, handleImageUpload, handleImageDelete, uploadErrorMsg, isImageUploading } =
    useImageUpload(onImageUpload)

  const imageLoading = isImageUploading || !imageLoaded
  const imageSet = image?.urls?.mediumUrl ?? false

  useEffect(() => {
    setError('displayImg', { type: 'custom', message: uploadErrorMsg })
  }, [setError, uploadErrorMsg])

  // form submission
  const [createGroup, { isLoading, isError, error }] = useCreateGroupMutation()

  const { errorMsg } = useFormErrors(setError, isError, error)

  const onSubmit = useCallback(
    (data: CreateGroupFormData) => {
      createGroup({ formData: data, username: auth.user?.username }).unwrap().then(handleClose)
    },
    [createGroup, auth.user?.username, handleClose],
  )

  // reset form
  const resetForm = useCallback(() => {
    reset(defaultFormValues)
    handleImageDelete()
  }, [reset, handleImageDelete])

  return (
    <form className={classes.newGroupForm} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column' alignItems='center' className={classes.imageFieldBox}>
        <Box className={classes.imageUploadBox}>
          <img
            alt='group'
            src={image?.urls?.mediumUrl ?? groupImageDefault}
            className={classes.groupImage}
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
        name='groupName'
        control={control}
        label='Group name'
        errors={errors}
        inputProps={{ maxLength: INPUT_LENGTH.GROUP_NAME.MAX }}
      />
      <FormField
        multiline
        rows={heightBelow400px ? 2 : 4}
        name='description'
        control={control}
        label='Description'
        errors={errors}
        type='text'
        inputProps={{ maxLength: INPUT_LENGTH.DESCRIPTION.MAX }}
        spellCheck
      />
      <Grid
        container
        flexDirection='row-reverse'
        justifyContent='space-evenly'
        alignItems='center'
        className={classes.formActionBtns}
      >
        <Button type={imageLoading ? 'button' : 'submit'} loading={isLoading}>
          Submit
        </Button>
        <Button type='reset' onClick={resetForm} className={classes.btnCancel}>
          Reset
        </Button>
      </Grid>
    </form>
  )
}

export function NewGroup({ className }: NewGroupPropsType) {
  const { classes } = useStyles()

  const [uploadedFileId, setUploadedFileId] = useState<string>()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpen = useCallback(() => setDialogOpen(true), [])
  const handleClose = useCallback(() => setDialogOpen(false), [])

  const { handleImageDelete } = useImageUpload()
  const handleCloseFormCancelled = useCallback(() => {
    setDialogOpen(false)
    handleImageDelete(uploadedFileId)
  }, [handleImageDelete, uploadedFileId])

  return (
    <>
      <IconButton onClick={handleOpen} className={classes.newGroupBtn}>
        <AddCircleIcon className={clsx(classes.newGroupIcon, className)} />
      </IconButton>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseFormCancelled}
        aria-labelledby='game-scorecard'
        className={clsx(classes.dialog, classes.newGroupDialog)}
      >
        <IconButton onClick={handleCloseFormCancelled} className={classes.closeBtn}>
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
        <DialogTitle id='notification-title' className={classes.dialogTitle}>
          <Typography fontSize='inherit' textAlign='center'>
            New Group
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <NewGroupForm setUploadedFileId={setUploadedFileId} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  )
}
