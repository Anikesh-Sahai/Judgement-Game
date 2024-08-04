import type { UserType } from '@Models/UserModels'

export interface AuthenticationFormPropsType {
  Element: React.ComponentType
  navbar?: boolean
  auth?: boolean
}

export interface SignUpFormType {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
}

export interface LoginFormType {
  loginID: string
  password: string
}

export interface ForgotPasswordFormType {
  loginID: string
}

export interface ResetPasswordFormType {
  password: string
  passwordConfirm: string
}

export interface ResetPasswordDataType {
  resetPasswordData: ResetPasswordFormType
  token: string
}

export interface UserAvailabilityDataType {
  key: string
  value: string
}

export interface AuthType {
  user: UserType
  token: string
}

export interface AuthResponseType extends ResponseType {
  data: AuthType
}

export interface ForgotPasswordResponseType extends ResponseType {
  message: string
}

export interface UserAvailabilityResponseType extends ResponseType {
  data: {
    isAvailable: boolean
  }
}
