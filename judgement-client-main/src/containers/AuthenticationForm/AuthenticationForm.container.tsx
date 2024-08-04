import { Box, Grid } from '@mui/material'
import blackEllipseImg from '@Assets/images/ellipse-black.png'
import heroImg from '@Assets/images/hero-img.png'
import { Navbar } from '@Containers/Navbar'
import type { AuthenticationFormPropsType } from '@Models/AuthModels'
import { useStyles } from './style'

export function AuthenticationForm(props: AuthenticationFormPropsType) {
  const { Element, navbar = true, auth = false } = props
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      {navbar && <Navbar auth={auth} />}
      <img src={blackEllipseImg} alt='' className={classes.blackEllipse} />
      <header className={classes.boxContent}>
        <Grid
          container
          direction='row'
          alignItems='center'
          justifyContent='center'
          className={classes.boxGrid}
        >
          <Grid item sm={6} className={classes.boxLeft}>
            <Box className={classes.redEllipse} />
            <figure className={classes.heroFig}>
              <img src={heroImg} alt='Judgement' className={classes.heroImg} />
            </figure>
          </Grid>
          <Grid item sm={6} className={classes.boxRight}>
            <Element />
          </Grid>
        </Grid>
      </header>
    </Box>
  )
}
