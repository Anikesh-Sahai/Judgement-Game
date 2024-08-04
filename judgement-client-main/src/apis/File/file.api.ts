import { mainApi } from '@Apis/Api'
import { API } from '@Constants/api.constants'
import type { UploadFileRequestDataType, UploadFileResponseDataType } from '@Models/FileModels'

const extendedFileApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFiles: builder.mutation<UploadFileResponseDataType, UploadFileRequestDataType>({
      query: ({ formData }) => ({
        url: API.FILES,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export { extendedFileApi }
