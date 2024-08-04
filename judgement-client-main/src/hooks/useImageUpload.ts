import type { UploadedFileType } from '@Models/FileModels'
import { useCallback, useState } from 'react'
import { useUploadFilesMutation } from '@Stores/index'
import { type MutationRequestSnackbarOptionsType, useMutationRequest } from './useMutationRequest'

export function useImageUpload(
  onImageUpload: (res: UploadedFileType) => void = () => {},
  snackbar = true,
  snackbarOptions: MutationRequestSnackbarOptionsType = {},
) {
  const [image, setImage] = useState<UploadedFileType>()
  const [deleteFile] = useUploadFilesMutation()
  const {
    successMsg = 'Photo successfully uploaded',
    errorMsg = 'Unable to upload the photo',
    anchorOrigin,
  } = snackbarOptions

  const {
    handleMutationRequest: uploadFile,
    results,
    errorMsg: uploadErrorMsg,
  } = useMutationRequest(
    'Photo upload',
    useUploadFilesMutation,
    snackbar,
    { successMsg, errorMsg, anchorOrigin },
    (res) => {
      const file = res.data.files[0]
      setImage(file)
      onImageUpload(file)
    },
  )

  const handleImageUpload = useCallback(
    (files: FileList | null) => {
      if (files === null || files.length === 0 || !files[0]) return
      const formData = new FormData()
      formData.append('files', files[0])
      if (image) {
        formData.append('deletableFiles', image.id)
      }
      uploadFile({ formData })
    },
    [image, uploadFile],
  )

  const handleImageDelete = useCallback(
    (fileId?: string) => {
      if (!image && !fileId) return
      const formData = new FormData()
      if (fileId) {
        formData.append('deletableFiles', fileId)
      } else if (image) {
        formData.append('deletableFiles', image.id)
      }
      deleteFile({ formData })
        .unwrap()
        .then(() => {
          setImage(undefined)
        })
    },
    [image, deleteFile],
  )

  const { isLoading: isImageUploading } = results

  return { image, handleImageUpload, handleImageDelete, uploadErrorMsg, isImageUploading }
}
