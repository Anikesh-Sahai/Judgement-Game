import theme from '@Themes/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  app: {
    height: '100vh',
    width: '100%',
  },

  main: {
    background: theme.palette.background.paper,
    paddingTop: 'max(50px, 9vh)',
    margin: '0 auto',
    width: '80%',
    maxWidth: '1240px',
    height: '100%',
    [theme.breakpoints.down('lg')]: {
      width: '85%',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}))
