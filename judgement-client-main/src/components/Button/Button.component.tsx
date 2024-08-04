import clsx from 'clsx'
import { Button as MuiButton, CircularProgress } from '@mui/material'
import type { ButtonPropsType } from '@/models/ButtonModels'
import { useStyles } from './style'

export function Button(props: ButtonPropsType) {
  const { classes } = useStyles()
  const { variant = 'contained', disabled = false, children, loading = false } = props

  // separating custom props from mui props
  const { loading: customProp, className, ...btnProps } = props

  return (
    <MuiButton
      className={clsx(classes.btn, className)}
      {...btnProps}
      variant={variant}
      disabled={disabled || loading}
    >
      {loading ? (
        <CircularProgress color='secondary' size='clamp(18px, 15px + 0.7vw, 28px)' />
      ) : (
        children
      )}
    </MuiButton>
  )
}
