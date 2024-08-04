import { useCallback } from 'react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query'
import type { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { type SnackbarOrigin, useSnackbar } from 'notistack'
import useMutationError from '@Hooks/useMutationError'
import { logDevError } from '@Utils/helpers'

export interface MutationRequestSnackbarOptionsType {
  successMsg?: string
  errorMsg?: string
  anchorOrigin?: SnackbarOrigin
}

/**
 *
 * @param requestName -> name of the item to be shown in error msg
 * @param useMutation -> mutation hook provided by RTK
 * @param snackbar -> boolean value, whether to show snackbar on successful mutation
 * @param snackbarOptions -> options object to set the successMsg and anchorOrigin for snackbar
 * @param handleCacheMutation -> function to run on successful mutation (optional)
 * @returns object containing mutation handler function, mutation results, and errorMsg
 */
export function useMutationRequest<T, U>(
  requestName: string,
  useMutation: UseMutation<
    MutationDefinition<
      T,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
      string,
      U,
      'api'
    >
  >,
  snackbar = true,
  snackbarOptions: MutationRequestSnackbarOptionsType = {},
  handleSuccess: (res: U) => void = () => {},
  handleError: (err: FetchBaseQueryError) => void = () => {},
  handleFinally: () => void = () => {},
) {
  const { enqueueSnackbar } = useSnackbar()
  const {
    successMsg = '',
    errorMsg: customErrorMsg = '',
    anchorOrigin = { vertical: 'top', horizontal: 'center' },
  } = snackbarOptions

  const [mutationTrigger, results] = useMutation()
  const { isError, error } = results

  const { errorMsg } = useMutationError(requestName, error, isError)

  const handleMutationRequest = useCallback(
    (args: T) => {
      mutationTrigger({ ...args })
        .unwrap()
        .then((res) => {
          handleSuccess(res)
          if (snackbar) {
            enqueueSnackbar(successMsg, {
              variant: 'success',
              anchorOrigin,
            })
          }
        })
        .catch((err) => {
          handleError(err)
          if (snackbar) {
            enqueueSnackbar(errorMsg || customErrorMsg, {
              variant: 'error',
              anchorOrigin,
            })
          }
          logDevError(err)
        })
        .finally(() => {
          handleFinally()
        })
    },
    [
      mutationTrigger,
      enqueueSnackbar,
      errorMsg,
      successMsg,
      anchorOrigin,
      snackbar,
      handleSuccess,
      customErrorMsg,
      handleError,
      handleFinally,
    ],
  )

  return { handleMutationRequest, results, errorMsg }
}
