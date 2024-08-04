import { INPUT_LENGTH } from '@Constants/input.constants'
import * as yup from 'yup'

export const loginIDValidator = yup
  .string()
  .required('Email/Username is required')
  .trim()
  .max(
    INPUT_LENGTH.EMAIL.MAX,
    `Email/username can't exceed ${INPUT_LENGTH.LOGIN_ID.MAX} characters`,
  )

export const emailValidator = yup
  .string()
  .required('Email is required')
  .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, 'Invalid email address')
  .trim()

export const passwordValidator = yup
  .string()
  .required('Password is required')
  .min(
    INPUT_LENGTH.PASSWORD.MIN,
    `Password must have atleast ${INPUT_LENGTH.PASSWORD.MIN} characters`,
  )
  .max(INPUT_LENGTH.PASSWORD.MAX, `Password can't exceed ${INPUT_LENGTH.PASSWORD.MAX} characters`)

export const passwordConfirmValidator = yup
  .string()
  .required('Confirm password is required')
  .oneOf([yup.ref('password')], 'Password and Confirm password must be same')

export const groupNameValidator = yup
  .string()
  .trim()
  .required('Group name is required')
  .min(
    INPUT_LENGTH.GROUP_NAME.MIN,
    `Group name must have at least ${INPUT_LENGTH.GROUP_NAME.MIN} characters`,
  )
  .max(
    INPUT_LENGTH.GROUP_NAME.MAX,
    `Group name can have at most ${INPUT_LENGTH.GROUP_NAME.MAX} characters`,
  )
  .matches(
    /^[\w\s-]+$/,
    'Group name should only have these characters (a-z, A-Z, 0-9, _, -, space)',
  )

export const descriptionValidator = yup
  .string()
  .trim()
  .max(
    INPUT_LENGTH.DESCRIPTION.MAX,
    `Description can have at most ${INPUT_LENGTH.DESCRIPTION.MAX} characters`,
  )

export const firstNameValidator = yup
  .string()
  .required('First Name is required')
  .min(
    INPUT_LENGTH.FIRST_NAME.MIN,
    `First Name must have atleast ${INPUT_LENGTH.FIRST_NAME.MIN} characters`,
  )
  .max(
    INPUT_LENGTH.FIRST_NAME.MAX,
    `First Name can't exceed ${INPUT_LENGTH.FIRST_NAME.MAX} characters`,
  )
  .trim()

export const lastNameValidator = yup
  .string()
  .required('Last Name is Required')
  .min(
    INPUT_LENGTH.LAST_NAME.MIN,
    `Last Name must have atleast ${INPUT_LENGTH.LAST_NAME.MIN} characters`,
  )
  .max(
    INPUT_LENGTH.LAST_NAME.MAX,
    `Last Name can't exceed ${INPUT_LENGTH.LAST_NAME.MAX} characters`,
  )
  .trim()

export const usernameValidator = yup
  .string()
  .required('Username is required')
  .min(
    INPUT_LENGTH.USERNAME.MIN,
    `Username must have atleast ${INPUT_LENGTH.USERNAME.MIN} characters`,
  )
  .max(INPUT_LENGTH.USERNAME.MAX, `Username can't exceed ${INPUT_LENGTH.USERNAME.MAX} characters`)
  .matches(/^[\w]+$/, 'Username should only have these characters (a-z, A-Z, 0-9, _)')
  .trim()
