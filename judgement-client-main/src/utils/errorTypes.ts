import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import type { ErrorDataType } from '@Models/ErrorModels'

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorDataType(data: unknown): data is ErrorDataType {
  return typeof data === 'object' && data != null && data !== undefined
}
