import clsx from 'clsx'
import { Controller } from 'react-hook-form'
import { TextField, Box } from '@mui/material'
import type { FormFieldPropType } from '@Models/FormModels'
import { useStyles } from './style'

/**
 *
 * @param props (name, control, errors are custom props while others will be TextFieldProps)
 * @returns controlled field using react-hook-form
 */
export function FormField(props: FormFieldPropType) {
  const { name, control, errors, className, ...textFieldProps } = props
  const { classes } = useStyles()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box className={classes.fieldBox}>
          <TextField
            {...field}
            variant='filled'
            className={clsx(classes.field, className)}
            error={!!errors[name]?.message}
            size='small'
            inputProps={{ maxLength: 500 }}
            spellCheck={false}
            {...textFieldProps}
          />
          <span className={classes.fieldError}>{errors[name] ? errors[name]?.message : ' '}</span>
        </Box>
      )}
    />
  )
}
