/* eslint-disable no-nested-ternary */
import { useNavigate, useParams } from 'react-router-dom'
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
import EditIcon from '@mui/icons-material/Edit'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import groupImageDefault from '@Assets/images/group-default.jpg'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { FormField } from '@Components/FormField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@Components/Button'
import { updateGroupSchema, type UpdateGroupFormData } from '@Schemas/group'
import { useGetGroupQuery, useUpdateGroupMutation } from '@Stores/index'
import type { UploadedFileType } from '@Models/FileModels'
import { getAllowedImageExtensions } from '@Utils/helpers'
import useFormErrors from '@Hooks/useFormErrors'
import { useImageUpload } from '@Hooks/useImageUpload'
import useFetchError from '@Hooks/useFetchError'
import { Loader } from '@Components/Loader'
import { Error } from '@Components/Error'
import type { GroupDataType, GroupSlugType } from '@Models/GroupModels'
import { GroupAdminInput } from '@Containers/GroupAdminInput/GroupAdminInput.container'
import type { UserType } from '@Models/UserModels'
import { useStyles } from './style'

interface EditGroupPropsType {
  open: boolean
  handleClose: () => void
}

interface EditGroupFormPropsType {
  setUploadedFileId: React.Dispatch<React.SetStateAction<string | undefined>>
  handleClose: () => void
  initialData: GroupDataType
  slug: GroupSlugType
}

const defaultFormValues = {
  groupName: '',
  description: '',
  displayImg: undefined,
}

function EditGroupForm({
  setUploadedFileId,
  handleClose,
  initialData,
  slug,
}: EditGroupFormPropsType) {
  const { classes } = useStyles()

  const heightBelow400px = useMediaQuery('@media (max-height: 400px)')

  const { groupName, description, displayImg, admin } = initialData

  // react use form hook
  const {
    control,
    formState: { errors },
    reset,
    setValue,
    setError,
    handleSubmit,
  } = useForm<UpdateGroupFormData>({
    mode: 'onBlur',
    defaultValues: {
      groupName,
      description,
      displayImg: undefined,
      admin: admin._id,
    },
    resolver: yupResolver(updateGroupSchema),
  })

  const [selectedAdmin, setSelectedAdmin] = useState(admin)

  const setAdminValue = useCallback(
    (adminValue: UserType) => {
      setValue('admin', adminValue._id)
    },
    [setValue],
  )

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
  const imageSet = image?.urls?.mediumUrl ?? false
  const currentDisplayImgUrl = showCurrentImage ? displayImg?.mediumUrl : image?.urls?.mediumUrl

  useEffect(() => {
    setError('displayImg', { type: 'custom', message: uploadErrorMsg })
  }, [setError, uploadErrorMsg])

  // form submission
  const navigate = useNavigate()
  const [updateGroup, { isLoading, isError, error }] = useUpdateGroupMutation()

  const { errorMsg } = useFormErrors(setError, isError, error)

  const formUnchanged = useCallback(
    (initial: GroupDataType, current: UpdateGroupFormData) =>
      !current.displayImg &&
      initial.admin._id === current.admin &&
      initial.description === current.description &&
      initial.groupName === current.groupName,
    [],
  )

  const onSubmit = useCallback(
    (data: UpdateGroupFormData) => {
      if (formUnchanged(initialData, data)) {
        return
      }
      updateGroup({ formData: data, slug })
        .unwrap()
        .then(({ data: updatedGroupData }) => {
          handleClose()
          const newSlug = updatedGroupData?.group?.slug ?? slug
          navigate(`/groups/${newSlug}`)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateGroup, handleClose, slug],
  )

  // reset form
  const clearForm = useCallback(() => {
    reset({ ...defaultFormValues, admin: admin._id })
    setSelectedAdmin(admin)
    handleImageDelete()
    setUploadedFileId(undefined)
  }, [reset, handleImageDelete, admin, setUploadedFileId])

  return (
    <form className={classes.editGroupForm} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column' alignItems='center' className={classes.imageFieldBox}>
        <Box className={classes.imageUploadBox}>
          <img
            alt='group'
            src={currentDisplayImgUrl ?? groupImageDefault}
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
      <GroupAdminInput
        name='admin'
        errors={errors}
        selectedValue={selectedAdmin}
        setSelectedValue={setSelectedAdmin}
        setFormValue={setAdminValue}
      />
      <FormField
        multiline
        rows={heightBelow400px ? 2 : 3}
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
        <Button type='reset' onClick={clearForm} className={classes.btnCancel}>
          Clear
        </Button>
      </Grid>
    </form>
  )
}

export function EditGroup({ open, handleClose }: EditGroupPropsType) {
  const { classes } = useStyles()

  const [uploadedFileId, setUploadedFileId] = useState<string>()

  const { handleImageDelete } = useImageUpload()
  const handleCloseFormCancelled = useCallback(() => {
    handleClose()
    handleImageDelete(uploadedFileId)
  }, [handleClose, handleImageDelete, uploadedFileId])

  const { slug } = useParams() as { slug: string }
  const { data: groupData, isFetching, isError, error, isSuccess } = useGetGroupQuery({ slug })
  const group = groupData?.data?.group

  const { errorMsg } = useFetchError('Group', error, isError, group, isSuccess)

  return (
    <Dialog
      open={open}
      onClose={handleCloseFormCancelled}
      aria-labelledby='edit-group-dialog'
      className={clsx(classes.dialog, classes.editGroupDialog)}
    >
      <IconButton onClick={handleCloseFormCancelled} className={classes.closeBtn}>
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
      <DialogTitle id='edit-group-dialog-title' className={classes.dialogTitle}>
        <Typography fontSize='inherit' textAlign='center'>
          Edit Group
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {isFetching ? (
          <Loader size={40} />
        ) : isError || !group ? (
          <Error errorMsg={errorMsg} />
        ) : (
          <EditGroupForm
            initialData={group}
            setUploadedFileId={setUploadedFileId}
            handleClose={handleClose}
            slug={slug}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
