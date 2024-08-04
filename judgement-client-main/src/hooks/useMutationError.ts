import { useState, useCallback, useEffect, useMemo } from 'react'
import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { isErrorDataType, isFetchBaseQueryError } from '@Utils/errorTypes'
import { setErrorMsgAndLogErrorGenerator } from '@Utils/helpers'
import { ERROR_MESSAGES, ERROR_STATUS_CODES } from '@Constants/errors.constants'

/**
 *
 * @param requestName -> name of the request/item to be shown in errorMsg
 * @param error -> error object returned by RTK
 * @param isError -> isError boolean returned by RTK
 * @param parentErrorCodes -> array of error status codes for which we need to set the error to a setter function provided (generally done to set errors in pages)
 * @param setParentError -> setter function passed on to the components from their parents, generally a page
 * @returns object containing the error message (errorMsg)
 */
export default function useMutationError(
  requestName: string,
  error?: FetchBaseQueryError | SerializedError,
  isError = false,
  parentErrorCodes: number[] = [],
  setParentError?: React.Dispatch<React.SetStateAction<string>>,
) {
  const [errorMsg, setErrorMsg] = useState('')

  const setErrorMsgAndLogError = useMemo(() => setErrorMsgAndLogErrorGenerator(setErrorMsg), [])

  const getErrors = useCallback(() => {
    setErrorMsg('')
    if (error) {
      if (isFetchBaseQueryError(error)) {
        const { status, data } = error
        let customMsg = ''
        if (isErrorDataType(data)) {
          customMsg = data.nonFieldError
        }

        switch (status) {
          case ERROR_STATUS_CODES.BAD_REQUEST:
            setErrorMsgAndLogError(error, ERROR_MESSAGES.INVALID_REQUEST)
            break
          case ERROR_STATUS_CODES.UNAUTHORIZED:
            setErrorMsg(ERROR_MESSAGES.UNAUTHORIZED)
            break
          case ERROR_STATUS_CODES.FORBIDDEN:
            setErrorMsg(customMsg ?? `Not allowed to make ${requestName} request`)
            break
          case ERROR_STATUS_CODES.NOT_FOUND:
            setErrorMsg(`Can't make request`)
            break
          default:
            setErrorMsgAndLogError(error, `Error while making ${requestName} request`)
        }

        parentErrorCodes.forEach((errCode) => {
          if (errCode === status) {
            setParentError?.(errorMsg)
          }
        })
      } else {
        setErrorMsgAndLogError(error, `Error while making ${requestName} request`)
      }
    }
  }, [error, requestName, errorMsg, parentErrorCodes, setParentError, setErrorMsgAndLogError])

  useEffect(() => {
    if (isError) {
      getErrors()
    }
  }, [isError, getErrors])

  return { errorMsg }
}
