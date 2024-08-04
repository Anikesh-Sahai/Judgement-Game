import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  snackbarCloseButton: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    transform: 'translate(120%, 0)',
    fontSize: '16px',
    padding: '3px',
  },
  snackbarActionButton: {
    background: '#444',
    color: '#aaaaaa',
    '&:hover': {
      background: '#666666',
      color: '#222222',
    },
  },
  snackbarMessageButton: {
    marginRight: '5px',
  },
  gameInviteContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
  },
  appNotificationMessageContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    border: 'none',
    font: 'inherit',
    cursor: 'pointer',
    background: 'transparent',
  },
  gameInviteAvatar: {
    height: '45px',
    width: '45px',
    border: `2px solid ${theme.palette.primary.main}`,
  },
  snackbarMessageText: {
    fontSize: '18px',
    color: theme.palette.primary.contrastText,
  },
  gameInviteMessageUsername: {
    color: theme.palette.primary.main,
  },
}))
