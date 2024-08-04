import clsx from 'clsx'
import { Navbar } from '@Containers/Navbar'
import type { AppLayoutProps } from '@Models/AppLayoutModels'
import { Box } from '@mui/material'
import { useStyles } from './styles'

export function AppLayout(props: AppLayoutProps) {
  const { classes } = useStyles()

  const { navbar, auth, navbarVariant = 'sticky', className, mainClassName, children } = props

  return (
    <Box className={clsx(classes.app, className)}>
      {navbar && <Navbar auth={auth} variant={navbarVariant} />}
      <main className={clsx(classes.main, mainClassName)}>{children}</main>
    </Box>
  )
}
