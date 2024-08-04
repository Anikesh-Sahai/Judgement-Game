import { INPUT_LENGTH } from '@Constants/input.constants'
import { descriptionValidator, groupNameValidator } from '@Schemas/validators'
import * as yup from 'yup'

export const createGroupSchema = yup
  .object({
    groupName: groupNameValidator,
    description: descriptionValidator,
    displayImg: yup.string(),
  })
  .required()

export const updateGroupSchema = yup.object({
  groupName: groupNameValidator,
  description: descriptionValidator,
  displayImg: yup.string(),
  admin: yup
    .string()
    .trim()
    .required('Admin is required')
    .max(INPUT_LENGTH.OBJECT_ID.MAX, `Invalid value selected`),
})

export type CreateGroupFormData = yup.InferType<typeof createGroupSchema>

export type UpdateGroupFormData = yup.InferType<typeof updateGroupSchema>
