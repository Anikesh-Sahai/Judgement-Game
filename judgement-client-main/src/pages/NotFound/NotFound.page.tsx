import { Box, Grid, Typography } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { NavButton } from '@Components/NavButton'
import { Navbar } from '@Containers/Navbar'
import { useStyles } from './style'

export function NotFound({ auth }: { auth: boolean }) {
  const { classes } = useStyles()

  return (
    <Grid container className={classes.mainContainer}>
      <Navbar auth={auth} variant='normal' />
      <Grid
        container
        item
        className={classes.container}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Box className={classes.heading}>Error 404</Box>
        <Box className={classes.subheading}>We can&apos;t find the page you are looking for</Box>

        <Box className={classes.btnContainer}>
          <NavButton to='/' type='primary' className={classes.btn}>
            <ArrowBack className={classes.icon} />
            <Typography fontSize='inherit'>Go Back</Typography>
          </NavButton>
        </Box>
      </Grid>
    </Grid>
  )
}
