import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppLayout } from '@Containers/AppLayout'
import { Grid } from '@mui/material'
import { ProfileInfo } from '@Containers/ProfileInfo'
import { Error } from '@Components/Error'
import { useStyles } from './style'

export function ProfilePage({ auth }: { auth: boolean }) {
  const { classes } = useStyles()

  const [error, setError] = useState('')

  return (
    <AppLayout
      auth={auth}
      navbar
      className={classes.appLayout}
      mainClassName={classes.mainClassName}
    >
      {error ? (
        <Error errorMsg={error} />
      ) : (
        <Grid container flexDirection='row' className={classes.container}>
          <Grid item className={classes.infoSection}>
            <ProfileInfo onLoadError={setError} />
          </Grid>
          <Grid container item flexDirection='column' className={classes.rightSection}>
            <Outlet />
          </Grid>
        </Grid>
      )}
    </AppLayout>
  )
}
