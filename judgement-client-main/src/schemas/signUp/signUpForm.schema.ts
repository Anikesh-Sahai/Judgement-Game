import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  passwordConfirmValidator,
  passwordValidator,
  usernameValidator,
} from '@Schemas/validators'
import * as yup from 'yup'

export const signUpSchema = yup
  .object({
    firstName: firstNameValidator,
    lastName: lastNameValidator,
    username: usernameValidator,
    email: emailValidator,
    password: passwordValidator,
    passwordConfirm: passwordConfirmValidator,
  })
  .required()

export type SignUpFormData = yup.InferType<typeof signUpSchema>
