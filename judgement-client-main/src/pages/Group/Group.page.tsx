import { useParams } from 'react-router-dom'
import { AppLayout } from '@Containers/AppLayout'
import { GroupInfo } from '@Containers/GroupInfo'
import { Grid, useMediaQuery } from '@mui/material'
import { GroupMembers } from '@Containers/GroupMembers'
import { GameHistory } from '@Containers/GameHistory'
import theme from '@Themes/theme'
import { useState } from 'react'
import { Error } from '@Components/Error'
import { useAppSelector } from '@Hooks/redux.hooks'
import { useStyles } from './styles'

export function Group() {
  const { classes } = useStyles()
  const heightDown600 = useMediaQuery('@media (max-height: 600px)')
  const down500 = useMediaQuery(theme.breakpoints.down(500))
  const { slug } = useParams() as { slug: string }

  const auth = useAppSelector((store) => store?.root?.auth)

  const [error, setError] = useState('')

  return (
    <AppLayout
      auth={!!auth.token}
      navbar
      className={classes.appLayout}
      mainClassName={classes.mainClassName}
    >
      {error ? (
        <Error errorMsg={error} />
      ) : (
        <Grid container direction='column' alignItems='center' className={classes.container}>
          <Grid
            container
            direction='row'
            justifyContent='space-around'
            alignItems='center'
            className={classes.topInfoBox}
          >
            <GroupInfo onLoadError={setError} />
          </Grid>
          <Grid
            container
            direction='row'
            justifyContent='space-evenly'
            className={classes.bottomInfoBox}
          >
            <Grid
              container
              item
              xs={down500 ? 12 : 3.6}
              direction='column'
              alignItems='center'
              gap={heightDown600 ? 1 : 3}
              className={classes.bottomSections}
            >
              <GroupMembers />
            </Grid>
            <Grid
              container
              item
              xs={down500 ? 12 : 7.4}
              direction='column'
              alignItems='center'
              gap={heightDown600 ? 1 : 3}
              className={classes.bottomSections}
            >
              <GameHistory type='group' id={slug} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </AppLayout>
  )
}
