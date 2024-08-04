import clsx from 'clsx'
import { useStyles } from './styles'

interface ErrorPropsType extends React.HTMLAttributes<HTMLDivElement> {
  errorMsg: string
}

export function Error(props: ErrorPropsType) {
  const { classes } = useStyles()

  const { errorMsg, className, ...divProps } = props

  return (
    <div className={clsx(classes.errorArea, className)} {...divProps}>
      {errorMsg}
    </div>
  )
}
