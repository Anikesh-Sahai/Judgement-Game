/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { AuthType } from '@Models/AuthModels'

const initialState: AuthType = {
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    username: '',
    displayImg: {
      url: '',
      smallUrl: '',
      mediumUrl: '',
    },
  },
  token: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: { ...initialState },
  reducers: {
    setToken: (_state, action: PayloadAction<AuthType>): AuthType => ({ ...action.payload }),
    resetToken: (): AuthType => ({ ...initialState }),
  },
})

export const authActions = authSlice.actions

export default authSlice
