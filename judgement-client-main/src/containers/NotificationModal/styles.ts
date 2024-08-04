import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  dialog: {
    color: theme.palette.primary.contrastText,
    '.MuiModal-backdrop': {
      backdropFilter: 'blur(6px)',
      backgroundColor: '#ffffff03',
    },
    '.MuiDialog-paper': {
      boxShadow: '0px 0px 20px 0px #00000035, 0px 0px 20px 0px #ffffff40',
      borderRadius: 'clamp(3px, 1px + 1vh, 8px)',
    },
  },
  notificationDialog: {
    '.MuiDialog-paper': {
      width: '440px',
      padding: 'clamp(5px, 2px + 1vh, 10px) clamp(5px, 2px + 0.8vw, 12px)',
      [theme.breakpoints.down('md')]: {
        width: '380px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '60vw',
      },
      [theme.breakpoints.down(420)]: {
        width: '70vw',
      },
      position: 'absolute',
    },
  },
  notificationTitle: {
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    fontSize: 'clamp(12px, 8px + 1.2vw + 0.5vh, 25px)',
    lineHeight: '100%',
  },
  notificationDialogContent: {
    width: '100%',
    padding: '5px 15px',
    color: theme.palette.primary.contrastText,
    gap: '4px',
    minHeight: '50px',
  },
  modalBtns: {
    [theme.breakpoints.down(400)]: {
      flexDirection: 'column',
      gap: '10px',
    },
    margin: '5px 0px 15px',
    gap: '15px',
    color: theme.palette.primary.contrastText,
  },
  closeBtn: {
    position: 'absolute',
    top: 'clamp(10px, 5px + 1vh, 15px)',
    right: 'clamp(10px, 5px + 0.7vw, 15px)',
    padding: '0',
  },
  closeIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  displayImage: {
    width: 'clamp(45px, 30px + 3vw + 2vh, 100px)',
    height: 'clamp(45px, 30px + 3vw + 2vh, 100px)',
    border: `2px solid ${theme.palette.primary.contrastText}`,
    marginBottom: '10px',
    '@media (max-height: 500px)': {
      marginBottom: '6px',
    },
  },
  senderUsername: {
    fontSize: 'clamp(12px, 8px + 1.2vw + 0.8vh, 24px)',
  },
  userLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    textTransform: 'lowercase',
    fontWeight: '500',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
  groupName: {
    fontSize: 'clamp(12px, 8px + 1.2vw + 1vh, 24px)',
  },
  groupDescription: {
    margin: '10px 0px',
    '@media (max-height: 500px)': {
      margin: '5px 0px',
    },
    padding: '0px clamp(10px, 5px + 1.5vw, 25px)',
    lineHeight: '120%',
    fontSize: 'clamp(10px, 6px + 0.9vw + 0.5vh, 16px)',
    fontWeight: '300',
    textAlign: 'justify',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineClamp: '2',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
  },
  senderName: {
    fontSize: 'clamp(11px, 8px + 1vw + 0.6vh, 21px)',
  },
  invitedBy: {
    marginTop: '10px',
    fontSize: 'clamp(11px, 8px + 1vw + 0.6vh, 21px)',
  },
  invitedByUsername: {
    fontSize: 'inherit',
  },
  socialBtn: {
    fontSize: 'clamp(12px, 7px + 1vw, 18px)',
    padding: '3px 20px 5px',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(11px, 3px + 1.6vw, 14px)',
      padding: '3px 15px 6px',
    },
  },
  rejectBtn: {
    backgroundColor: '#272727',
    '&:hover': {
      background: '#99999950',
    },
    padding: '4px 24px 6px',
    [theme.breakpoints.down(480)]: {
      padding: '4px 18px 6px',
    },
  },
  avatarGroup: {
    '.MuiAvatarGroup-avatar': {
      height: '42px',
      width: '42px',
      border: `3px solid ${theme.palette.primary.main}`,
      [theme.breakpoints.down('sm')]: {
        height: '30px',
        width: '30px',
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
    '.MuiAvatar-colorDefault': {
      zIndex: 10,
      border: `3px solid ${theme.palette.primary.contrastText}`,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontSize: 'clamp(16px, 13px + 0.8vw, 22px)',
      [theme.breakpoints.down('sm')]: {
        fontSize: 'clamp(11px, 8px + 0.6vw, 14px)',
        border: `2px solid ${theme.palette.primary.contrastText}`,
      },
    },
    margin: '5px 0px 15px',
    '@media (max-height: 500px)': {
      margin: '5px 0px 8px',
    },
  },
}))
