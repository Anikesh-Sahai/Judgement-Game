import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  appLayout: {
    [theme.breakpoints.down('sm')]: {
      minHeight: '100vh',
      height: 'auto',
    },
    '@media (max-height: 380px)': {
      minHeight: '380px',
    },
  },

  mainClassName: {
    [theme.breakpoints.down('sm')]: {
      minHeight: '100vh',
      height: 'auto',
    },
  },

  container: {
    background: `${theme.palette.background.paper}76`,
    color: theme.palette.primary.contrastText,
    height: '100%',
    width: '100%',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      flexDirection: 'column',
    },
  },
  infoSection: {
    width: '30%',
    height: '100%',
    minHeight: '180px',
    [theme.breakpoints.down('md')]: {
      width: '32%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    justifyContent: 'center',
    alignItems: 'center',
    background: '#000',
  },
  rightSection: {
    width: '70%',
    height: '100%',
    minHeight: '360px',
    padding: 'clamp(8px, 5px + 1.5vh, 20px) clamp(8px, 5px + 1.5vw, 20px)',
    [theme.breakpoints.down('md')]: {
      width: '68%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
      padding: 'clamp(8px, 5px + 2.5vh, 20px) clamp(8px, 5px + 2.5vw, 20px)',
    },
    justifyContent: 'center',
    alignItems: 'center',
    background: 'none',
  },
}))
