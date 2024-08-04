import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import type { NavButtonPropsType } from '@Models/ButtonModels'
import { useStyles } from './styles'

export function NavButton(props: NavButtonPropsType) {
  const { classes } = useStyles()

  const { to = '/', type = 'secondary', className, children, ...navlinkProps } = props

  const currentClassNames = useMemo(() => {
    switch (type) {
      case 'home':
        return clsx(classes.link, classes.homeLink)
      case 'primary':
        return clsx(classes.link, classes.btn, classes.btnPrimary)
      default:
        return clsx(classes.link, classes.btn, classes.btnSecondary)
    }
  }, [type, classes])

  return (
    <NavLink to={to} className={clsx(currentClassNames, className)} {...navlinkProps}>
      {children}
    </NavLink>
  )
}
