import { useCallback, useState, useEffect, useMemo } from 'react'
import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { setErrorMsgAndLogErrorGenerator } from '@Utils/helpers'
import { ERROR_MESSAGES } from '@Constants/errors.constants'
import { isErrorDataType, isFetchBaseQueryError } from '@Utils/errorTypes'

/**
 *
 * @param setError -> received from useForm hook used to set the field errors of the form manually
 * @param isError -> property available from RTK query tells whether there was an error while query/mutation
 * @param error -> error object returned from RTK query containing the error data received
 * @returns getError function which whenever called will set the form fields and overall error; errorMsg contains the overall error
 */
export default function useFormErrors(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError: any,
  isError = false,
  error?: FetchBaseQueryError | SerializedError,
) {
  const [errorMsg, setErrorMsg] = useState('')

  const setErrorMsgAndLogError = useMemo(() => setErrorMsgAndLogErrorGenerator(setErrorMsg), [])

  const getErrors = useCallback(() => {
    // if therse is an error
    if (error) {
      // separate fetchBaseQuery error and SerializedError
      if (isFetchBaseQueryError(error)) {
        const { data } = error

        // check if error is of expected data type
        if (isErrorDataType(data)) {
          // set the error message and field errors
          try {
            setErrorMsg(data.nonFieldError)
            if (data.fieldError) {
              Object.keys(data.fieldError).forEach((key) => {
                // extracting field name
                const field = data.fieldError ? data.fieldError[key] : null
                const fieldName = field?.path
                if (!fieldName) return

                // setting error based on the kind of error
                switch (field?.kind) {
                  case 'unique':
                    setError?.(fieldName, {
                      type: 'custom',
                      message: `Given ${fieldName} already exists`,
                    })
                    break
                  default:
                    setError?.(fieldName, {
                      type: 'custom',
                      message: field?.message,
                    })
                }
              })
            }
          } catch (err) {
            setErrorMsgAndLogError(err, errorMsg || ERROR_MESSAGES.SOMETHING_WENT_WRONG)
          }
        } else {
          setErrorMsgAndLogError(error, ERROR_MESSAGES.SOMETHING_WENT_WRONG)
        }
      } else {
        setErrorMsgAndLogError(error, ERROR_MESSAGES.SOMETHING_WENT_WRONG)
      }
    }
  }, [error, setError, errorMsg, setErrorMsgAndLogError])

  useEffect(() => {
    if (isError) {
      getErrors()
    }
  }, [isError, getErrors])

  return { errorMsg }
}
