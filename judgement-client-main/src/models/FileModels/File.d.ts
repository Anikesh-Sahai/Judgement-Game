import type { ImageFileType } from '@Models/ImageFileModels'
import type { ResponseType } from '@Models/ResponseModels'

export interface UploadFileRequestDataType {
  formData: FormData
}

export interface UploadedFileType {
  id: string
  urls: ImageFileType
}

export interface UploadFileResponseDataType extends ResponseType {
  data: {
    files: UploadedFileType[]
  }
}
