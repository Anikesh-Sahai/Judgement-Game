/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type RefetchKeyType =
  | 'groups'
  | 'friends'
  | 'notifications'
  | 'games'
  | 'members'
  | 'groupInvites'

type RefetchStateType = {
  [key in RefetchKeyType]: number
}

const initialState: RefetchStateType = {
  groups: 1,
  friends: 1,
  notifications: 1,
  games: 1,
  members: 1,
  groupInvites: 1,
}

export const refetchSlice = createSlice({
  name: 'refetch',
  initialState: { ...initialState },
  reducers: {
    setValue: (state, action: PayloadAction<RefetchKeyType>): RefetchStateType => {
      state[action.payload] += 1
      return state
    },
  },
})

export const refetchActions = refetchSlice.actions

export default refetchSlice
