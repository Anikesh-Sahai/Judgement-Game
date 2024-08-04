/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainApi } from '@Apis/Api'
import { API } from '@Constants/api.constants'
import type {
  UserAvailabilityResponseType,
  AuthResponseType,
  LoginFormType,
  SignUpFormType,
  UserAvailabilityDataType,
  ForgotPasswordResponseType,
  ForgotPasswordFormType,
  ResetPasswordDataType,
} from '@Models/AuthModels'
import type { ResponseType } from '@Models/ResponseModels'
import { authActions } from '@Stores/slices/authSlice'

const getResponseAndSetToken = async (
  _id: any,
  { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: any },
) => {
  try {
    const { data }: { data: AuthResponseType } = await queryFulfilled
    dispatch(authActions.setToken(data.data))
  } catch (err) {
    // digesting this error because it's already being handled in the component
  }
}

const extendedAuthApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponseType, LoginFormType>({
      query: (loginData) => ({
        url: API.LOGIN,
        method: 'POST',
        body: loginData,
      }),
      onQueryStarted: getResponseAndSetToken,
    }),
    signup: builder.mutation<AuthResponseType, SignUpFormType>({
      query: (signUpData) => ({
        url: API.SIGNUP,
        method: 'POST',
        body: signUpData,
      }),
      onQueryStarted: getResponseAndSetToken,
    }),
    available: builder.query<UserAvailabilityResponseType, UserAvailabilityDataType>({
      query: (data) => ({
        url: `${API.USER_AVAILABLE}?key=${data.key}&value=${data.value}`,
      }),
    }),
    logout: builder.mutation<ResponseType, void>({
      query: () => ({
        url: API.LOGOUT,
        method: 'POST',
      }),
      onQueryStarted: async (_id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
        } catch (err) {
          // digesting this error because user is logging out
        } finally {
          dispatch(authActions.resetToken())
          dispatch(mainApi.util.resetApiState())
        }
      },
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponseType, ForgotPasswordFormType>({
      query: (forgotPasswordData) => ({
        url: API.FORGOT_PASSWORD,
        method: 'POST',
        body: forgotPasswordData,
      }),
    }),
    resetPassword: builder.mutation<AuthResponseType, ResetPasswordDataType>({
      query: ({ resetPasswordData, token }) => ({
        url: `${API.RESET_PASSWORD}/${token}`,
        method: 'PATCH',
        body: resetPasswordData,
      }),
      onQueryStarted: getResponseAndSetToken,
    }),
  }),
})

export { extendedAuthApi }
