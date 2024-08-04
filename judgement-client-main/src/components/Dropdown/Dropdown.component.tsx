import clsx from 'clsx'
import { Tooltip, Menu, MenuItem } from '@mui/material'
import type { MenuProps, MenuItemProps } from '@mui/material'
import type { MenuTipProps } from '@Models/DropdownModels'
import { useStyles } from './style'

export function Dropdown(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, className } = props

  return <div className={className}>{children}</div>
}

function MenuTip(props: MenuTipProps) {
  const { classes } = useStyles()

  const { open, title, onClick, children, className, ...tooltipProps } = props

  return (
    <Tooltip title={title || null} className={clsx(classes.tooltip, className)} {...tooltipProps}>
      <button
        type='button'
        onClick={onClick}
        className={classes.dropdownBtn}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        {children}
      </button>
    </Tooltip>
  )
}

function MenuBar(props: MenuProps) {
  const { children, className, ...menuProps } = props

  const { classes } = useStyles()

  return (
    <Menu
      id='account-menu'
      {...menuProps}
      PaperProps={{
        elevation: 0,
        className: clsx(classes.menuBar, className),
        sx: {
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 21,
            width: 15,
            height: 15,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {children}
    </Menu>
  )
}

function MenuBarItem(props: MenuItemProps) {
  const { classes } = useStyles()

  const { children, className, ...menuItemProps } = props

  return (
    <MenuItem className={clsx(classes.menuBarItem, className)} {...menuItemProps}>
      {children}
    </MenuItem>
  )
}

Dropdown.MenuTip = MenuTip
Dropdown.MenuBar = MenuBar
Dropdown.MenuBarItem = MenuBarItem
