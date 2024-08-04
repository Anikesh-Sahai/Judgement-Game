/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TextFieldProps } from '@mui/material'

export interface FormFieldControlProps {
  name: string
  control: any
  errors: any
}

export type FormFieldPropType = TextFieldProps & FormFieldControlProps

export interface AutoCompleteInputPropsType<T> {
  selectedValue: T
  setSelectedValue: React.Dispatch<React.SetStateAction<T>>
  setFormValue: (x: T) => void
  name: string
  errors: any
}
