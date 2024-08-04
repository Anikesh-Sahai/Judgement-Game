export interface ResponseType {
  status: string
}

export interface PaginatedRequestType {
  page?: number
  limit?: number
  mutationCacheKey?: number
}

export interface PaginatedResponseType extends ResponseType {
  results: number
}
