import clsx from 'clsx'
import { Autocomplete, Box, TextField, type AutocompleteProps } from '@mui/material'
import type { AutoCompleteInputPropsType } from '@Models/FormModels'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { useStyles } from './style'

interface AutoCompletePropsType<T>
  extends AutoCompleteInputPropsType<T>,
    Omit<AutocompleteProps<T, false, false, false>, 'renderInput'> {
  label: string
  maxLength?: number
}

export function AutoComplete<T>(props: AutoCompletePropsType<T>) {
  const { classes } = useStyles()

  const {
    id,
    label,
    selectedValue,
    setSelectedValue,
    setFormValue,
    name,
    errors,
    className,
    maxLength = INPUT_LENGTH.USERNAME.MAX,
    ...autoCompleteProps
  } = props

  return (
    <Autocomplete
      id={id ?? 'autocomplete-input'}
      fullWidth
      autoSelect
      loadingText='Loading...'
      className={clsx(classes.autoComplete, className)}
      value={selectedValue}
      onChange={(_, newValue) => {
        if (newValue) {
          setSelectedValue(newValue)
          setFormValue(newValue)
        }
      }}
      {...autoCompleteProps}
      renderInput={(params) => (
        <Box className={classes.fieldBox}>
          <TextField
            {...params}
            inputProps={{ ...params.inputProps, maxLength }}
            variant='filled'
            label={label}
            size='small'
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{ ...params.InputProps, type: 'text' }}
            className={classes.field}
          />
          <span className={classes.fieldError}>{errors[name] ? errors[name]?.message : ' '}</span>
        </Box>
      )}
    />
  )
}
