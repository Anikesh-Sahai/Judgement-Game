import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    color: theme.palette.primary.contrastText,
    maxHeight: '100px',
    transition: 'all 0.1s',
  },

  nonSticky: {
    background: 'none',
    margin: 'clamp(10px, 10px + 0.5vh + 0.5vw, 25px) 0px 10px 0px',
    padding: '0 clamp(10px, 5px + 3.5vw + 2vh, 10vw) 0 clamp(10px, 5px + 4vw + 4vh, 12vw)',
    minHeight: '50px',
    height: '12vh',
    [theme.breakpoints.down(750)]: {
      padding: '0 clamp(10px, 5px + 2vw, 20px) 0 clamp(10px, 8px + 3vw, 35px)',
    },
    [theme.breakpoints.up('xl')]: {
      height: '10vh',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 clamp(10px, 8px + 2.5vw, 25px)',
    },
    [theme.breakpoints.down(360)]: {
      padding: '0 10px',
    },
    [theme.breakpoints.down(300)]: {
      padding: '0 5px',
    },
  },

  sticky: {
    background: '#0F1521',
    margin: '0px',
    minHeight: '50px',
    height: '9.5vh',
    [theme.breakpoints.down('sm')]: {
      padding: '12px clamp(10px, 8px + 2.5vw, 25px)',
    },
    padding: '18px clamp(10px, 5px + 3vw + 2vh, 10vw) 13px clamp(10px, 5px + 4vw + 4vh, 12vw)',
    [theme.breakpoints.down(750)]: {
      padding: '0 clamp(10px, 5px + 2vw, 20px) 0 clamp(10px, 8px + 3vw, 35px)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 clamp(10px, 8px + 2.5vw, 25px)',
    },
    [theme.breakpoints.down(360)]: {
      padding: '0 10px',
    },
    [theme.breakpoints.down(300)]: {
      padding: '0 5px',
    },
    position: 'fixed',
    zIndex: '10',
  },
}))
