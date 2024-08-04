import { INPUT_LENGTH } from '@Constants/input.constants'
import { loginIDValidator } from '@Schemas/validators'
import * as yup from 'yup'

export const loginSchema = yup
  .object({
    loginID: loginIDValidator,
    password: yup
      .string()
      .required('Password is required')
      .max(
        INPUT_LENGTH.PASSWORD.MAX,
        `Password can't exceed ${INPUT_LENGTH.PASSWORD.MAX} characters`,
      ),
  })
  .required()

export type LoginFormData = yup.InferType<typeof loginSchema>
