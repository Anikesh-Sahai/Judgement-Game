export interface FieldErrorDataType {
  name?: string
  message?: string
  kind?: string
  path?: string
  value?: string
}

export interface FieldErrorType {
  [key: string]: FieldErrorDataType
}

export interface ErrorDataType {
  status: number | string
  type?: string
  fieldError?: FieldErrorType
  nonFieldError: string
}

export interface ComponentThatLoadsType {
  onLoadError?: React.Dispatch<React.SetStateAction<string>>
}
