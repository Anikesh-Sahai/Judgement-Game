import type { RootState } from '@Stores/index'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const mainApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).root.auth
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: [
    'User',
    'Player',
    'Invite',
    'Friend',
    'Group',
    'Member',
    'Relation',
    'Notification',
    'Game',
  ],
  endpoints: () => ({}),
})

export { mainApi }
