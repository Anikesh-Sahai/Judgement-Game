import clsx from 'clsx'
import { CircularProgress, type CircularProgressProps } from '@mui/material'
import { useStyles } from './styles'

export function Loader(props: CircularProgressProps) {
  const { classes } = useStyles()

  const { className, size = '60px', color = 'grey.600', ...circularProgressProps } = props

  return (
    <div className={clsx(classes.loaderArea, className)}>
      <CircularProgress sx={{ color }} size={size} {...circularProgressProps} />
    </div>
  )
}
