import { passwordConfirmValidator, passwordValidator } from '@Schemas/validators'
import * as yup from 'yup'

export const resetPasswordSchema = yup
  .object({
    password: passwordValidator,
    passwordConfirm: passwordConfirmValidator,
  })
  .required()

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>
