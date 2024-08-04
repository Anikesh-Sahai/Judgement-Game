export type SelectDropdownOptionValue = string

export interface SelectDropdownOption<T> {
  value: T
  text: string
}

export interface SelectDropdownPropsType {
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
  options: SelectDropdownOption[]
}
