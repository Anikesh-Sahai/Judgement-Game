import { Grid, useMediaQuery } from '@mui/material'
import theme from '@Themes/theme'
import { ROUTES } from '@Constants'
import { NavButton } from '@Components/NavButton/NavButton.component'
import { useStyles } from './style'

export function NavbarUnAuth() {
  const { classes } = useStyles()
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'))
  const matchMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      className={classes.navbar}
    >
      <Grid item xs={4} className={matchSm ? classes.hidden : ''}>
        <NavButton to={ROUTES.HOME} type='home'>
          Judgement
        </NavButton>
      </Grid>
      <Grid
        item
        container
        xs={matchSm ? 12 : 8}
        direction='row'
        alignItems='baseline'
        justifyContent='flex-end'
        spacing={matchMd ? 6 : 3}
        className={classes.mainBtns}
      >
        <Grid item>
          <NavButton to={ROUTES.LOGIN} type='secondary'>
            Login
          </NavButton>
        </Grid>
        <Grid item>
          <NavButton to={ROUTES.SIGNUP} type='primary'>
            Join Now
          </NavButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NavbarUnAuth
