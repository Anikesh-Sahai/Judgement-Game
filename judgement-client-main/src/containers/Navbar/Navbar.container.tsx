import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { NavbarAuth } from '@Containers/NavbarAuth'
import { NavbarUnAuth } from '@Containers/NavbarUnAuth'
import type { NavbarProps } from '@Models/NavbarModels'
import { useStyles } from './style'

export function Navbar({ auth, variant = 'flexible' }: NavbarProps) {
  const [sticky, setSticky] = useState(false)

  const { classes } = useStyles()

  useEffect(() => {
    switch (variant) {
      case 'sticky':
        setSticky(true)
        break
      case 'normal':
        setSticky(false)
        break
      case 'flexible':
        window.onscroll = () => {
          if (window.scrollY === 0) setSticky(false)
          if (window.scrollY > 0) setSticky(true)
        }
        return () => {
          window.onscroll = null
        }
      default:
        throw new Error(
          'Unexpected value for variant property of Navbar props. Expected are: sticky, normal, and flexible',
        )
    }
    return () => {}
  }, [variant])

  return (
    <nav className={clsx(classes.container, sticky ? classes.sticky : classes.nonSticky)}>
      {auth ? <NavbarAuth /> : <NavbarUnAuth />}
    </nav>
  )
}

export default Navbar
