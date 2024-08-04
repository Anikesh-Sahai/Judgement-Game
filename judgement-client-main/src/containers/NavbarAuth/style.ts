import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  navbar: {
    maxWidth: '1240px',
  },

  textNotification: {
    color: theme.palette.primary.main,
    fontSize: '20px',
  },

  hidden: {
    display: 'none',
  },

  avatar: {
    display: 'flex',
    border: '2px solid white',
    height: 'clamp(30px, 24px + 1.25vw, 45px)',
    width: 'clamp(30px, 24px + 1.25vw, 45px)',
  },

  username: {
    marginLeft: '10px',
    fontSize: 'clamp(14px, 12px + 0.5vw, 22px)',
  },

  downIcon: {
    marginLeft: '3px',
    fontSize: 'clamp(30px, 24px + 1.25vw, 36px)',
  },

  itemIcon: {
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '3px',
    fontSize: '24px',
  },

  menuBarHome: {
    width: '135px',
  },

  menuBarHomeItem: {
    width: '120px',
  },

  menuBarAccount: {
    [theme.breakpoints.down('sm')]: {
      width: '135px',
    },
  },

  menuBarAccountItem: {
    [theme.breakpoints.down('sm')]: {
      width: '120px',
    },
  },

  menuBarBtn: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
  },

  menuBarBtnText: {
    fontSize: '18px',
  },

  heading: {
    fontSize: 'clamp(15px, 12px + 2vw, 22px)',
  },

  logoutBtn: {
    background: 'transparent',
    textDecoration: 'none',
    border: '0',
    color: 'inherit',
  },

  judgementLogo: {
    width: 'clamp(30px, 20px + 7vw, 50px)',
  },
}))
