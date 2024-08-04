import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  link: {
    textDecoration: 'none',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 5px + 0.4vw, 12px)',
  },
  userTextSection: {
    gap: '6px',
  },
  username: {
    fontSize: 'clamp(12px, 7px + 1.2vw, 24px)',
    lineHeight: '100%',
    fontWeight: '600',
    [theme.breakpoints.down('sm')]: {
      fontWeight: '500',
    },
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(12px, 3px + 2vw, 15px)',
    },
  },
  name: {
    fontSize: 'clamp(12px, 7px + 1.2vw, 22px)',
    lineHeight: '100%',
    color: theme.palette.primary.contrastText,
    fontWeight: '500',
    [theme.breakpoints.down('sm')]: {
      fontWeight: '400',
    },
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(12px, 3px + 2vw, 15px)',
    },
  },
  avatars: {
    height: 'clamp(50px, 40px + 2.5vw, 75px)',
    width: 'clamp(50px, 40px + 2.5vw, 75px)',
    border: `3px solid ${theme.palette.primary.main}`,
  },
  statusButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showMoreIconBtn: {
    fontSize: 'clamp(20px, 16px + 1vw, 30px)',
    color: theme.palette.primary.contrastText,
  },
}))
