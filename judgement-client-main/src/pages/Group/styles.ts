import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  appLayout: {
    [theme.breakpoints.down(500)]: {
      minHeight: '100vh',
      height: 'auto',
    },
  },
  mainClassName: {
    [theme.breakpoints.down(500)]: {
      minHeight: '100vh',
      height: 'auto',
    },
  },
  container: {
    width: '100%',
    height: '100%',
    background: `${theme.palette.background.paper}76`,
    minHeight: '320px',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down(500)]: {
      height: 'auto',
      minHeight: '540px',
    },
    [theme.breakpoints.down(300)]: {
      height: 'auto',
      minHeight: '675px',
    },
  },
  topInfoBox: {
    position: 'relative',
    height: '45%',
    minHeight: '144px',
    maxHeight: '330px',
    [theme.breakpoints.down('md')]: {
      maxHeight: '250px',
    },
    [theme.breakpoints.down(500)]: {
      minHeight: '240px',
      justifyContent: 'center',
      alignContent: 'center',
      gap: '15px',
    },
    [theme.breakpoints.down(300)]: {
      minHeight: '300px',
      maxHeight: '400px',
      height: 'auto',
      justifyContent: 'center',
      alignContent: 'center',
      gap: '5px',
    },
    background: '#000',
    padding: '10px clamp(10px, 5px + 1.5vw, 25px)',
  },
  bottomInfoBox: {
    height: '55%',
    minHeight: '176px',
    background: 'none',
    padding: '3px min(1vw, 20px) 0px',
    [theme.breakpoints.down(500)]: {
      minHeight: '300px',
      justifyContent: 'center',
      alignContent: 'center',
      gap: '15px',
    },
    [theme.breakpoints.down(280)]: {
      minHeight: '300px',
      justifyContent: 'center',
      alignContent: 'center',
      gap: '5px',
    },
  },
  bottomSections: {
    padding: 'clamp(10px, 10px + 1.75vh, 35px) 0px clamp(6px, 6px + 1.5vh, 25px)',
    '@media (max-height: 600px)': {
      padding: 'clamp(10px, 1.75vh, 35px) 0px',
    },
    height: '100%',
    width: '100%',
    [theme.breakpoints.down(500)]: {
      padding: '20px clamp(10px, 5px + 5vw, 25px)',
    },
  },
}))
