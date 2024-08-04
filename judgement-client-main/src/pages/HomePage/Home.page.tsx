import { Box, Typography, Grid } from '@mui/material'
import { ROUTES } from '@Constants'
import blackEllipseImg from '@Assets/images/ellipse-black.png'
import heroImg from '@Assets/images/hero-img.png'
import { Navbar } from '@Containers/Navbar'
import { NavButton } from '@Components/NavButton/NavButton.component'
import { useStyles } from './style'

export function Home() {
  const { classes } = useStyles()

  return (
    <Box className={classes.box}>
      <Navbar auth={false} variant='normal' />
      <img src={blackEllipseImg} alt='' className={classes.blackEllipse} />
      <header className={classes.boxContent}>
        <Grid
          container
          direction='row-reverse'
          alignItems='center'
          justifyContent='center'
          className={classes.boxGrid}
        >
          <Grid item sm={6} className={classes.boxRight}>
            <Box className={classes.redEllipse} />
            <figure className={classes.heroFig}>
              <img src={heroImg} alt='Judgement' className={classes.heroImg} />
            </figure>
          </Grid>
          <Grid item sm={6} className={classes.boxLeft}>
            <hgroup className={classes.textGroup}>
              <Typography component='h1' className={classes.heroText}>
                Judgement
              </Typography>
              <Typography component='h3' className={classes.heroTextSecondary}>
                Let the judgement begin with your friends
              </Typography>
            </hgroup>
            <NavButton
              to={ROUTES.LOGIN}
              state={{ returnRoute: ROUTES.PLAY }}
              type='primary'
              className={classes.playBtn}
            >
              Play Now
            </NavButton>
          </Grid>
        </Grid>
      </header>
    </Box>
  )
}
