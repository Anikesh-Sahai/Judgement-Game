import { loginIDValidator } from '@Schemas/validators'
import * as yup from 'yup'

export const forgotPasswordSchema = yup
  .object({
    loginID: loginIDValidator,
  })
  .required()

export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>
