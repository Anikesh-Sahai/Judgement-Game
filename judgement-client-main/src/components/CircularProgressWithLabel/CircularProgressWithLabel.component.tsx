import clsx from 'clsx'
import { Box, CircularProgress, type CircularProgressProps, Typography } from '@mui/material'
import { useStyles } from './style'

interface CircularProgressWithLabelPropsType extends CircularProgressProps {
  value: number
  label?: string
  fullSize?: boolean
}

export function CircularProgressWithLabel(props: CircularProgressWithLabelPropsType) {
  const { value, label = `${value}s`, fullSize = false, ...otherProps } = props

  const { classes } = useStyles()

  return (
    <Box className={clsx(classes.progressContainer, { [classes.fullSize]: fullSize })}>
      <CircularProgress variant='determinate' {...otherProps} />
      <Box className={classes.label}>
        <Typography variant='caption' component='div' color='inherit' fontSize='inherit'>
          {label}
        </Typography>
      </Box>
    </Box>
  )
}
