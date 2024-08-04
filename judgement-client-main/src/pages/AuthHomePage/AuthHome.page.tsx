import clsx from 'clsx'
import { Box, Typography, Grid } from '@mui/material'
import { ROUTES } from '@Constants'
import blackEllipseImg from '@Assets/images/ellipse-black.png'
import diamondIcon from '@Assets/icons/diamond-icon.png'
import heroImg from '@Assets/images/hero-img.png'
import { NavButton } from '@Components/NavButton/NavButton.component'
import { Navbar } from '@Containers/Navbar'
import { GroupSlides } from '@Containers/GroupSlides'
import { TopPlayers } from '@Containers/TopPlayers'
import { TopFriends } from '@Containers/TopFriends'
import { HomepageFooter } from '@Containers/HomepageFooter'
import { NewGroup } from '@Containers/NewGroup'
import { useStyles } from './style'

export function AuthHome() {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Box className={classes.box}>
        <Navbar auth />
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
              <hgroup className={classes.textGroup}>
                <Typography component='h1' className={classes.heroText}>
                  Judgement
                </Typography>
                <Typography component='h3' className={classes.heroTextSecondary}>
                  Let the judgement begin with your friends
                </Typography>
              </hgroup>
              <NavButton to={ROUTES.PLAY} type='primary' className={classes.playBtn}>
                Play Now
              </NavButton>
            </Grid>
          </Grid>
        </header>
      </Box>
      <Box className={clsx(classes.section, classes.groupsSection)}>
        <Box className={classes.titleArea}>
          <Box className={classes.groupsTitle}>
            <img src={diamondIcon} alt='spade icon' className={classes.diamondIcon} />
            <Typography variant='h2' className={classes.title}>
              Groups
            </Typography>
          </Box>
          <NewGroup className={classes.newGroupIcon} />
        </Box>
        <GroupSlides />
      </Box>
      <Box className={clsx(classes.section, classes.playersSection)}>
        <Box className={classes.titleArea}>
          <img src={diamondIcon} alt='spade icon' className={classes.diamondIcon} />
          <Typography variant='h2' className={classes.title}>
            Players
          </Typography>
        </Box>
        <Grid
          container
          direction='row'
          justifyContent='center'
          gap={4}
          className={classes.playersListArea}
        >
          <Grid item sm={8} md={5.6} lg={5} className={classes.playersList}>
            <Box className={classes.playersListContent}>
              <TopPlayers />
            </Box>
          </Grid>
          <Grid item sm={8} md={5.6} lg={5} className={classes.playersList}>
            <Box className={classes.playersListContent}>
              <TopFriends />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <HomepageFooter />
      </Box>
    </Box>
  )
}
