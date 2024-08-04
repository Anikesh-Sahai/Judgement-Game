import { INPUT_LENGTH } from '@Constants/input.constants'
import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  usernameValidator,
} from '@Schemas/validators'
import * as yup from 'yup'

export const updateUserSchema = yup.object({
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  username: usernameValidator,
  displayImg: yup.string(),
})

export const updateEmailSchema = yup.object({
  email: emailValidator,
  password: yup
    .string()
    .max(
      INPUT_LENGTH.PASSWORD.MAX,
      `Password can't exceed ${INPUT_LENGTH.PASSWORD.MAX} characters`,
    ),
})

export const deleteUserSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .max(
      INPUT_LENGTH.PASSWORD.MAX,
      `Password can't exceed ${INPUT_LENGTH.PASSWORD.MAX} characters`,
    ),
})

export type UpdateUserFormData = yup.InferType<typeof updateUserSchema>

export type UpdateEmailFormData = yup.InferType<typeof updateEmailSchema>

export type DeleteUserFormData = yup.InferType<typeof deleteUserSchema>
