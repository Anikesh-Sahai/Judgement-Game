import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  notificationsContainer: {
    width: '360px',
    [theme.breakpoints.down('md')]: {
      width: '320px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '260px',
    },
    [theme.breakpoints.down(480)]: {
      width: '220px',
    },
    [theme.breakpoints.down(300)]: {
      width: '200px',
    },
    boxShadow: '0px 0px 8px #ffffff50',
    background: '#0C0D1B',
    borderRadius: '5px',
    color: theme.palette.primary.contrastText,
  },
  listWrapper: {
    width: '100%',
    maxHeight: '300px',
    [theme.breakpoints.down('md')]: {
      maxHeight: '200px',
    },
    '@media (max-height: 400px)': {
      maxHeight: '180px',
    },
    [theme.breakpoints.down(350)]: {
      maxHeight: '120px',
    },
    '@media (max-height: 250px)': {
      maxHeight: '100px',
    },
    overflowY: 'auto',
    scrollbarGutter: 'stable both-edges',
    scrollbarWidth: 'thin',
  },
  defaultText: {
    color: theme.palette.primary.contrastText,
    padding: '10px 5px',
    fontSize: 'clamp(12px, 10px + 0.8vw + 0.5vh, 20px)',
    textAlign: 'center',
    width: '100%',
  },
  notificationList: {
    width: '100%',
    padding: '8px 0px',
  },
  itemContainer: {
    position: 'relative',
    width: '100%',
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(200, 200, 200, 0.2)',
    },
  },
  notificationListItem: {
    width: '100%',
    gap: '4px',
    padding: '10px 8px 10px 6px',
    color: theme.palette.primary.contrastText,
  },
  modalOpenBtn: {
    position: 'absolute',
    background: 'transparent',
    textDecoration: 'none',
    border: 'none',
    font: 'inherit',
    cursor: 'pointer',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.25)',
    },
    transition: 'all ease-out 0.2s',
  },
  notification: {
    color: theme.palette.primary.contrastText,
    fontSize: 'clamp(30px, 24px + 1vw, 40px)',
    position: 'relative',
    padding: '7px 5px 2px',
    [theme.breakpoints.down(300)]: {
      padding: '7px 4px 2px',
    },
  },
  notificationCount: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '5px',
    padding: '3px 5px',
    position: 'absolute',
    fontSize: '14px',
    bottom: '4px',
    right: '2px',
  },
  notificationInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
  },
  avatars: {
    height: 'clamp(30px, 20px + 2.2vw, 50px)',
    width: 'clamp(30px, 20px + 2.2vw, 50px)',
    border: `2px solid ${theme.palette.primary.main}`,
  },
  notificationTextSection: {
    flexGrow: '1',
    width: '100%',
    color: theme.palette.primary.contrastText,
    fontSize: 'clamp(11px, 8px + 0.8vw + 0.5vh, 18px)',
  },
  infoText: {
    lineHeight: '120%',
    color: theme.palette.primary.contrastText,
    overflow: 'hidden',
  },
  message: {
    textAlign: 'left',
    fontSize: 'clamp(11px, 7px + 0.6vw, 15px)',
    color: theme.palette.primary.contrastText,
    fontWeight: '400',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(10px, 5px + 1.5vw, 12px)',
    },
  },
  actionBtnSection: {
    gap: '8px',
    width: '100%',
    paddingRight: '6px',
  },
  socialBtnSmall: {
    fontSize: 'clamp(10px, 7px + 0.6vw, 14px)',
    padding: '0px clamp(7px, 6px + 0.9vw, 16px) 3px',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(8px, 6px + 1.2vw, 12px)',
      padding: '-1px clamp(6px, 3px + 2vw, 18px) 2px',
    },
  },
  rejectBtnSmall: {
    backgroundColor: '#323232',
    padding: '1px clamp(5px, 6px + 1vw, 19px) 4px',
    [theme.breakpoints.down(480)]: {
      padding: '0px clamp(6px, 3px + 2.2vw, 19px) 3px',
    },
    '&:hover': {
      background: '#99999950',
    },
  },
  socialBtnIconSmall: {
    marginTop: '3px',
    height: 'clamp(12px, 8px + 0.7vw, 15px)',
    [theme.breakpoints.down(480)]: {
      height: 'clamp(11px, 7px + 1vw, 14px)',
    },
  },
}))
