import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  container: {
    background: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    padding: '0 clamp(10px, 5px + 5vw + 5vh, 12vw)',
    margin: 'clamp(10px, 10px + 0.5vh + 0.5vw, 25px) 0px 10px 0px',
    color: theme.palette.primary.contrastText,
    height: '12vh',
    [theme.breakpoints.up('xl')]: {
      height: '10vh',
    },
    minHeight: '50px',
    maxHeight: '100px',
  },

  navbar: {
    maxWidth: '1240px',
  },

  mainBtns: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },

  hidden: {
    display: 'none',
  },
}))
