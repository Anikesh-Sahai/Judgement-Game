import { useState, useCallback, useEffect, useMemo } from 'react'
import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { isErrorDataType, isFetchBaseQueryError } from '@Utils/errorTypes'
import { setErrorMsgAndLogErrorGenerator } from '@Utils/helpers'
import { ERROR_MESSAGES, ERROR_STATUS_CODES } from '@Constants/errors.constants'

/**
 *
 * @param entity -> name of the item to be shown in the error message
 * @param error -> error object returned by rtk query
 * @param isError -> boolean that tells if there is error or not
 * @param resultData -> final expected data from the response data received from rtk query
 * @param isSuccess -> boolean that tells if the fetch request was successful
 * @param parentErrorCodes -> array of error status codes for which we need to set the error to a setter function provided (generally done to set errors in pages)
 * @param setParentError -> setter function passed on to the components from their parents, generally a page
 * @returns object containing the error message (errorMsg)
 */
export default function useFetchError<T>(
  entity: string,
  error?: FetchBaseQueryError | SerializedError,
  isError = false,
  resultData?: T,
  isSuccess = false,
  parentErrorCodes: number[] = [],
  setParentError?: React.Dispatch<React.SetStateAction<string>>,
) {
  const [errorMsg, setErrorMsg] = useState('')

  const setErrorMsgAndLogError = useMemo(() => setErrorMsgAndLogErrorGenerator(setErrorMsg), [])

  const getErrors = useCallback(() => {
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
            setErrorMsg(customMsg ?? `Error while fetching ${entity}`)
            break
          case ERROR_STATUS_CODES.NOT_FOUND:
            setErrorMsg(`${entity} not found!`)
            break
          default:
            setErrorMsgAndLogError(error, `Error while fetching ${entity}`)
        }

        parentErrorCodes.forEach((errCode) => {
          if (errCode === status) {
            setParentError?.(errorMsg)
          }
        })
      } else {
        setErrorMsgAndLogError(error, `Error while fetching ${entity}`)
      }
    } else if (isSuccess && !resultData) {
      setErrorMsg(`Can't find ${entity}`)
    }
  }, [
    isSuccess,
    error,
    resultData,
    entity,
    errorMsg,
    parentErrorCodes,
    setParentError,
    setErrorMsgAndLogError,
  ])

  useEffect(() => {
    if (isError) {
      getErrors()
    }
  }, [isError, isSuccess, getErrors])

  return { errorMsg }
}
