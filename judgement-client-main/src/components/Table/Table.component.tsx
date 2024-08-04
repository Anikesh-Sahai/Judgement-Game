import clsx from 'clsx'
import { useStyles } from './styles'

export function Table(props: React.HTMLAttributes<HTMLDivElement>) {
  const { classes } = useStyles()()

  const { className, children, ...divProps } = props

  return (
    <div role='table' className={clsx(classes.table, className)} {...divProps}>
      {children}
    </div>
  )
}

function Body(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, ...divProps } = props

  return <div {...divProps}>{children}</div>
}

interface RowPropsType extends React.HTMLAttributes<HTMLDivElement> {
  columnPercentages?: string
}

function Header(props: RowPropsType) {
  const { className, children, columnPercentages, ...divProps } = props
  const { classes } = useStyles(columnPercentages)()

  return (
    <div className={clsx(classes.tableRows, classes.tableHeading, className)} {...divProps}>
      {children}
    </div>
  )
}

function Row(props: RowPropsType) {
  const { className, children, columnPercentages, ...divProps } = props
  const { classes } = useStyles(columnPercentages)()

  return (
    <div className={clsx(classes.tableRows, classes.tableRow, className)} {...divProps}>
      {children}
    </div>
  )
}

Table.Header = Header
Table.Body = Body
Table.Row = Row
