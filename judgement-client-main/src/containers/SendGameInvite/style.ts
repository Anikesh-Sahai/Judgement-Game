import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  inviteContainer: {
    maxWidth: '320px',
    minWidth: '270px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '300px',
      minWidth: '240px',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '250px',
      minWidth: '200px',
    },
    [theme.breakpoints.down(480)]: {
      maxWidth: '200px',
      minWidth: '160px',
    },
    width: '100%',
    boxShadow: '0px 0px 8px #ffffff50',
    background: '#0C0D1B',
    marginTop: '10px',
    borderRadius: '5px',
  },
  searchBox: {
    width: '100%',
    color: theme.palette.secondary.contrastText,
    background: theme.palette.primary.contrastText,
    borderRadius: '5px 5px 0px 0px',
    '& .MuiOutlinedInput-input': {
      width: '100%',
      fontSize: 'clamp(11px, 9px + 0.6vw + 0.5vh, 18px)',
      padding: '10px 12px 10px',
      [theme.breakpoints.down('md')]: {
        padding: '8px 10px 8px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '6px 10px 6px',
      },
      borderRadius: '5px 5px 0px 0px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '5px 5px 0px 0px',
    },
  },
  listWrapper: {
    maxHeight: '200px',
    [theme.breakpoints.down('md')]: {
      maxHeight: '140px',
    },
    '@media (max-height: 400px)': {
      maxHeight: '140px',
    },
    [theme.breakpoints.down(350)]: {
      maxHeight: '80px',
    },
    '@media (max-height: 250px)': {
      maxHeight: '80px',
    },
    overflowY: 'auto',
    scrollbarGutter: 'stable both-edges',
    scrollbarWidth: 'thin',
    paddingTop: 'clamp(2px, 1px + 0.2vw, 0.3vh, 5px)',
    minWidth: '100%',
  },
  defaultText: {
    color: theme.palette.primary.contrastText,
    padding: '10px 5px',
    fontSize: 'clamp(12px, 10px + 0.8vw + 0.5vh, 20px)',
    textAlign: 'center',
    width: '100%',
  },
  playerList: {
    padding: '8px 6px',
    gap: '8px',
    minWidth: '100%',
  },
  playerListItem: {
    gap: '12px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 5px + 0.5vw, 9px)',
  },
  userTextSection: {
    gap: '6px',
  },
  infoText: {
    maxWidth: '140px',
    lineHeight: '100%',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]: {
      maxWidth: '120px',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100px',
    },
    [theme.breakpoints.down(480)]: {
      maxWidth: '80px',
    },
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  username: {
    fontSize: 'clamp(11px, 7px + 0.9vw, 18px)',
    color: theme.palette.primary.contrastText,
    fontWeight: '500',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(12px, 3px + 1.5vw, 15px)',
    },
  },
  name: {
    fontSize: 'clamp(11px, 7px + 0.7vw, 17px)',
    lineHeight: '100%',
    fontWeight: '400',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(11px, 3px + 1.5vw, 15px)',
    },
  },
  avatars: {
    height: 'clamp(30px, 20px + 2.2vw, 50px)',
    width: 'clamp(30px, 20px + 2.2vw, 50px)',
    border: `3px solid ${theme.palette.primary.main}`,
  },
  inviteBtn: {
    padding: '6px',
  },
  btnIcon: {
    height: 'clamp(20px, 10px + 1.5vw, 30px)',
  },
}))
