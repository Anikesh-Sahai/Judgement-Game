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
    fontSize: 'clamp(12px, 10px + 0.8vw, 20px)',
    lineHeight: '100%',
    letterSpacing: '0.2px',
    fontWeight: '500',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(12px, 5px + 1.5vw, 15px)',
    },
  },
  name: {
    fontSize: 'clamp(11px, 9px + 0.8vw, 18px)',
    lineHeight: '100%',
    textTransform: 'capitalize',
    color: theme.palette.primary.contrastText,
    fontWeight: '500',
    [theme.breakpoints.down('sm')]: {
      fontWeight: '400',
    },
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(12px, 4px + 1.5vw, 15px)',
    },
  },
  iconClass: {
    height: 'clamp(13px, 9px + 0.8vw, 18px)',
  },
  inviteBtn: {
    fontSize: 'clamp(11px, 7px + 0.8vw, 16px)',
    padding: '3px 18px 4px',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(11px, 4px + 1.5vw, 13px)',
      padding: '2px 12px 3px',
    },
  },
  avatars: {
    height: 'clamp(40px, 30px + 2.5vw, 55px)',
    width: 'clamp(40px, 30px + 2.5vw, 55px)',
    border: `3px solid ${theme.palette.primary.main}`,
  },
}))
