import { Grid, Avatar, useMediaQuery, ListItemIcon } from '@mui/material'
import { useState } from 'react'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import Logout from '@mui/icons-material/Logout'
import theme from '@Themes/theme'
import { ROUTES } from '@Constants'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import { NavButton } from '@Components/NavButton/NavButton.component'
import { useAppSelector } from '@Hooks/redux.hooks'
import { Dropdown } from '@Components/Dropdown'
import type { UserType } from '@Models/UserModels'
import { useLogoutMutation } from '@Stores/index'
import { Notifications } from '@Containers/Notifications'
import judgementLogo from '@Assets/images/logo.png'
import { SearchBarFloating } from '@Containers/SearchBarFloating'
import { useStyles } from './style'

function UserAccountDropdown({ user }: { user: UserType }) {
  const { classes } = useStyles()
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const [logout] = useLogoutMutation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Dropdown>
      <Dropdown.MenuTip open={open} onClick={handleClick}>
        <Avatar
          alt='profile-photo'
          srcSet={user?.displayImg?.smallUrl ?? profilePhotoDefault}
          className={classes.avatar}
        />
        <span className={clsx(classes.username, matchDownMd ? classes.hidden : '')}>
          {user.username}
        </span>
        <KeyboardArrowDownIcon className={classes.downIcon} />
      </Dropdown.MenuTip>
      <Dropdown.MenuBar
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        className={classes.menuBarAccount}
      >
        <NavLink className={classes.menuBarBtn} to={ROUTES.PROFILE}>
          <Dropdown.MenuBarItem onClick={handleClose} className={classes.menuBarAccountItem}>
            <ListItemIcon className={classes.itemIcon}>
              <PersonOutlineOutlinedIcon fontSize='inherit' color='inherit' />
            </ListItemIcon>
            <span className={classes.menuBarBtnText}>Profile</span>
          </Dropdown.MenuBarItem>
        </NavLink>
        <NavLink className={classes.menuBarBtn} to={`${ROUTES.PROFILE}/${user.username}/friends`}>
          <Dropdown.MenuBarItem onClick={handleClose} className={classes.menuBarAccountItem}>
            <ListItemIcon className={classes.itemIcon}>
              <PeopleOutlinedIcon fontSize='inherit' color='inherit' />
            </ListItemIcon>
            <span className={classes.menuBarBtnText}>Friends</span>
          </Dropdown.MenuBarItem>
        </NavLink>
        <button type='button' className={classes.logoutBtn} onClick={() => logout()}>
          <Dropdown.MenuBarItem onClick={handleClose} className={classes.menuBarAccountItem}>
            <ListItemIcon className={classes.itemIcon}>
              <Logout fontSize='inherit' color='inherit' />
            </ListItemIcon>
            <span className={classes.menuBarBtnText}>Logout</span>
          </Dropdown.MenuBarItem>
        </button>
      </Dropdown.MenuBar>
    </Dropdown>
  )
}

function JudgementDropdown() {
  const { classes } = useStyles()

  const match330 = useMediaQuery(theme.breakpoints.down(330))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Dropdown>
      <Dropdown.MenuTip open={open} onClick={handleClick}>
        <>
          {match330 ? (
            <img srcSet={judgementLogo} className={classes.judgementLogo} alt='Judgement' />
          ) : (
            <span className={classes.heading}>Judgement</span>
          )}
          <KeyboardArrowDownIcon className={classes.downIcon} />
        </>
      </Dropdown.MenuTip>
      <Dropdown.MenuBar
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        className={classes.menuBarHome}
      >
        <NavLink className={classes.menuBarBtn} to={ROUTES.AUTH_HOME}>
          <Dropdown.MenuBarItem onClick={handleClose} className={classes.menuBarHomeItem}>
            <span className={classes.menuBarBtnText}>Home</span>
          </Dropdown.MenuBarItem>
        </NavLink>
        <NavLink className={classes.menuBarBtn} to={ROUTES.GROUPS}>
          <Dropdown.MenuBarItem onClick={handleClose} className={classes.menuBarHomeItem}>
            <span className={classes.menuBarBtnText}>Groups</span>
          </Dropdown.MenuBarItem>
        </NavLink>
        <NavLink className={classes.menuBarBtn} to={ROUTES.PLAYERS}>
          <Dropdown.MenuBarItem onClick={handleClose} className={classes.menuBarHomeItem}>
            <span className={classes.menuBarBtnText}>Players</span>
          </Dropdown.MenuBarItem>
        </NavLink>
        <NavLink className={classes.menuBarBtn} to={ROUTES.ABOUT}>
          <Dropdown.MenuBarItem onClick={handleClose} className={classes.menuBarHomeItem}>
            <span className={classes.menuBarBtnText}>About</span>
          </Dropdown.MenuBarItem>
        </NavLink>
      </Dropdown.MenuBar>
    </Dropdown>
  )
}

export function NavbarAuth() {
  const { classes } = useStyles()
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'))
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const match330 = useMediaQuery(theme.breakpoints.down(330))

  const user = useAppSelector((store) => store?.root?.auth.user)

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      className={classes.navbar}
    >
      <Grid container alignItems='center' item xs={match330 ? 4 : matchSm ? 5.5 : 3}>
        {matchSm ? (
          <JudgementDropdown />
        ) : (
          <NavButton to={ROUTES.HOME} type='home'>
            Judgement
          </NavButton>
        )}
      </Grid>
      <Grid
        item
        container
        gap={match330 ? 0 : matchSm ? 0.2 : matchDownMd ? 1 : 2}
        xs={match330 ? 8 : matchSm ? 6.5 : 9}
        direction='row'
        alignItems='center'
        justifyContent='flex-end'
        spacing={matchDownMd ? 1 : 2}
        sx={{ paddingTop: '10px' }}
      >
        {!matchSm && (
          <>
            <NavButton to={ROUTES.GROUPS} type='secondary'>
              Groups
            </NavButton>
            <NavButton to={ROUTES.PLAYERS} type='secondary'>
              Players
            </NavButton>
            <NavButton to={ROUTES.ABOUT} type='secondary'>
              About
            </NavButton>
          </>
        )}
        <SearchBarFloating />
        <Notifications />
        <UserAccountDropdown user={user} />
      </Grid>
    </Grid>
  )
}

export default NavbarAuth
