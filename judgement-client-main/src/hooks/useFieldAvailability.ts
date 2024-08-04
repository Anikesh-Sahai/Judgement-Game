/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyAvailableQuery } from '@Stores/index'
import { logDevError } from '@Utils/helpers'
import { useCallback } from 'react'

export default function useFieldAvailability(setError: any, trigger: any) {
  const [availableQuery] = useLazyAvailableQuery()

  const checkFieldAvailability = useCallback(
    (key: 'email' | 'username', value: string, previousValue?: string) => {
      availableQuery({ key, value }, true)
        .unwrap()
        .then((data) => {
          if (data?.data?.isAvailable === false && value !== previousValue) {
            setError(key, { type: 'custom', message: `Given ${key} already exists` })
          } else {
            trigger(key)
          }
        })
        .catch((err) => {
          logDevError(err)
        })
    },
    [setError, trigger, availableQuery],
  )

  return { checkFieldAvailability }
}
