import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  },

  homeLink: {
    fontSize: 'clamp(18px, 1.5vw + 15px, 45px)',
    fontWeight: '400',
    outline: 'none',
    display: 'inline-block',
    '&:active, &:focus-visible': {
      transform: 'scale(1.1)',
      transition: 'all .1s ease-out',
    },
  },

  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'inherit',
    outline: 'none',
    border: 'none',
    background: 'none',
    fontWeight: '400',
    fontSize: 'clamp(15px, 12px + 0.5vw, 25px)',
    borderRadius: '100px',
    textAlign: 'center',
    textTransform: 'capitalize',

    '&:active, &:focus-visible': {
      transform: 'translateY(-5px)',
      transition: 'ease-out .1s',
    },
  },

  btnSecondary: {
    padding: '8px 10px 6px',
  },

  btnPrimary: {
    backgroundColor: theme.palette.primary.main,
    padding: '7.5px 18px 6px',

    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
}))
