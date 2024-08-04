import { useState, useReducer, useCallback, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query'
import type { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { RESPONSE } from '@Constants/response.constants'
import type { PaginatedRequestType, PaginatedResponseType } from '@Models/ResponseModels'
import { logDevError } from '@Utils/helpers'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ERROR_MESSAGES } from '@Constants/errors.constants'

const initialState = {
  pages: [],
  loadErrorMsg: '',
  isLoadError: false,
  isFetching: false,
  isSuccess: false,
}

/**
 * State Definition
 * pages -> array of responses received for page requests. Each element will be one response corresponding to the on page request
 * loadErrorMsg -> error message to show in case if there is loading error
 * isFetching -> whether pages are being fetched
 * isSuccess -> whether pages are successfully fetched
 * isLoadError -> if error while fetching
 */
const reducer = <U>(
  state: {
    pages: (U & PaginatedResponseType)[]
    loadErrorMsg: string
    isFetching: boolean
    isSuccess: boolean
    isLoadError: boolean
  },
  action:
    | PayloadAction<
        {
          pages: (U & PaginatedResponseType)[]
          loadErrorMsg: string
        },
        'error' | 'success'
      >
    | PayloadAction<undefined, 'loading' | 'reset'>,
) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isFetching: true }
    case 'success':
      return { ...state, pages: action.payload?.pages, isFetching: false, isSuccess: true }
    case 'error':
      return {
        ...state,
        loadErrorMsg: action.payload.loadErrorMsg,
        isFetching: false,
        isLoadError: true,
      }
    case 'reset':
      return { ...initialState }
    default:
      return state
  }
}

/**
 *
 * @param lazyQuery -> lazyQuery hook received from rtk
 * @param args -> arguments object provided while making fetch request in rtk
 * @param page -> starting page of making request
 * @param limit -> limit on the number documents required in response
 * @param mutationCacheKey -> unique key value used for caching and creating & rendering new cache when the key value changes(during a mutation)
 * @returns object containing trackingRef(attach to element that needs to be tracked), showDetector(boolean value which decides whether tracked element should be visible in DOM), and results object as it is that is returned by calling rtk hook
 */
export function useLazyLoading<T, U>(
  lazyQuery: UseLazyQuery<
    QueryDefinition<
      T & PaginatedRequestType,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
      string,
      U & PaginatedResponseType,
      'api'
    >
  >,
  args: T,
  page = 1,
  limit = RESPONSE.DOCUMENTS_LIMIT,
  mutationCacheKey = 0,
) {
  const [currentPage, setCurrentPage] = useState(page)
  const [state, dispatch] = useReducer(reducer<U>, initialState)
  const [showDetector, setShowDetector] = useState(true)

  // trigger will allow us to fetch whenever we want
  const [trigger, results] = lazyQuery()

  // loads all the pages from either cache or by fetching from server
  const loadAllPages = useCallback(() => {
    const arr: Promise<U & PaginatedResponseType>[] = []
    for (let i = 1; i <= currentPage; i += 1) {
      arr.push(
        new Promise((resolve, reject) => {
          trigger({ ...args, page: i, limit, mutationCacheKey }, true)
            .unwrap()
            .then((curData) => {
              resolve(curData)
            })
            .catch((err) => {
              reject(err)
            })
        }),
      )
    }

    return Promise.all(arr)
  }, [currentPage, limit, trigger, args, mutationCacheKey])

  // handles loading when the tracked element is visible on screen
  const handleDetection = useCallback(
    async (inView: boolean) => {
      if (inView && !state.loadErrorMsg) {
        setShowDetector(false)

        try {
          dispatch({ type: 'loading', payload: undefined })

          const timestampPrev = Date.now()
          // get array of pages
          const newPages = await loadAllPages()
          const timestampNext = Date.now()
          const timeDiff = timestampNext - timestampPrev

          // to have some time difference between two same state updates
          if (timeDiff < 100) {
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve('done')
              }, 200)
            })
          }

          dispatch({ type: 'success', payload: { pages: newPages, loadErrorMsg: '' } })

          const dataLength = newPages.length ? newPages[newPages.length - 1].results : 0
          setShowDetector(dataLength === limit)
          setCurrentPage((cur) => cur + 1)
        } catch (err) {
          dispatch({
            type: 'error',
            payload: { pages: [], loadErrorMsg: ERROR_MESSAGES.SOMETHING_WENT_WRONG },
          })
          logDevError(err)
          setShowDetector(false)
        }
      }
    },
    [limit, loadAllPages, state.loadErrorMsg],
  )

  const { ref: trackedRef } = useInView({
    threshold: 0.0,
    root: null,
    onChange: handleDetection,
  })

  useEffect(() => {
    dispatch({ type: 'reset', payload: undefined })
    setShowDetector(true)
    setCurrentPage(page)
  }, [args, page, limit, mutationCacheKey])

  return { trackedRef, showDetector, results, state }
}
