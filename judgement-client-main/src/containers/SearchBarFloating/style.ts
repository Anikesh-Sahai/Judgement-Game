import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  searchBox: {
    position: 'relative',
    width: '100%',
    color: theme.palette.secondary.contrastText,
    background: theme.palette.primary.contrastText,
    borderRadius: '5px',
    '& .MuiOutlinedInput-input': {
      height: 'clamp(25px, 10px + 2vw, 30px)',
      width: '100%',
      fontSize: 'clamp(11px, 9px + 0.6vw + 0.5vh, 18px)',
      padding: '10px 12px 10px',
      [theme.breakpoints.down('sm')]: {
        padding: '6px 8px 6px',
      },
      borderRadius: '5px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '5px',
    },
    filter: 'drop-shadow(#888 6px 6px 200px) drop-shadow(#888 -6px -6px 200px)',
  },
  searchArea: {
    position: 'relative',
    width: '50vw',
    maxWidth: '400px',
    minWidth: '200px',
  },
  listWrapper: {
    maxHeight: '300px',
    background: theme.palette.background.paper,
    position: 'absolute',
    width: '100%',
    '@media (max-height: 400px)': {
      maxHeight: '240px',
    },
    '@media (max-height: 360px)': {
      maxHeight: '200px',
    },
    borderRadius: '0px 0px 5px 5px',
    zIndex: '9999',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
  },
  defaultText: {
    color: theme.palette.primary.contrastText,
    padding: '8px 5px',
    fontSize: 'clamp(12px, 10px + 1vw, 20px)',
    textAlign: 'center',
    width: '100%',
  },
  playerList: {
    padding: '5px 0px',
    minWidth: '100%',
  },
  playerListItem: {
    padding: '8px clamp(12px, 8px + 1.4vw, 20px)',
    [theme.breakpoints.down('md')]: {
      padding: '8px clamp(10px, 6px + 2vw, 20px)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '6px clamp(6px, 4px + 2vw, 15px)',
    },
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(5px, 3px + 0.8vw, 10px)',
  },
  userTextSection: {
    gap: '6px',
    [theme.breakpoints.down(360)]: {
      gap: '3px',
    },
  },
  infoText: {
    lineHeight: '100%',
    color: theme.palette.primary.contrastText,
    letterSpacing: '0.8px',
    [theme.breakpoints.down('md')]: {
      letterSpacing: '0.6px',
    },
    [theme.breakpoints.down('md')]: {
      letterSpacing: '0.3px',
    },
    maxWidth: 'min(35vw, 280px)',
    minWidth: '120px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  username: {
    fontSize: 'clamp(12px, 10px + 0.7vw, 18px)',
    color: theme.palette.primary.contrastText,
    fontWeight: '500',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(12px, 4px + 1.6vw, 15px)',
    },
  },
  name: {
    fontSize: 'clamp(11px, 9px + 0.6vw, 17px)',
    lineHeight: '100%',
    fontWeight: '400',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(11px, 3px + 1.5vw, 15px)',
    },
  },
  avatars: {
    height: 'clamp(30px, 18px + 2.8vw, 55px)',
    width: 'clamp(30px, 18px + 2.8vw, 55px)',
    border: `3px solid ${theme.palette.primary.main}`,
  },
  searchBarBtnBox: {
    padding: '2px 0px 6px',
  },
  searchBarBtn: {
    [theme.breakpoints.down(300)]: {
      padding: '4px',
    },
  },
  searchBarBox: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2000',
    '--animate-duration': '0.4s',
  },
  closeIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: 'clamp(30px, 24px + 1vw, 40px)',
  },
  itemContainer: {
    position: 'relative',
    width: '100%',
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(200, 200, 200, 0.2)',
    },
  },
  searchItemLink: {
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
  searchCloseBtnBox: {
    height: '100%',
    [theme.breakpoints.down(250)]: {
      display: 'none',
    },
    position: 'absolute',
    right: 'clamp(-30px, -10px - 1.5vw, -15px)',
    top: '0px',
    transform: 'translate(50%, 0%)',
    display: 'flex',
    alignItems: 'center',
  },
  searchCloseBtn: {
    fontSize: 'clamp(15px, 10px + 1.5vw, 25px)',
    padding: '4px',
    background: '#555',
    color: '#aaaaaa',
    '&:hover': {
      background: '#777',
      color: '#222222',
    },
  },
}))
