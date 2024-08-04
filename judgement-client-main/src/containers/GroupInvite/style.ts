import { makeStyles } from 'tss-react/mui'

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
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inviteDialog: {
    '.MuiDialog-paper': {
      width: 'content',
      position: 'absolute',
      height: '325px',
      margin: '10px',
      maxHeight: 'calc(100% - 20px)',
      minHeight: '300px',
      overflow: 'auto',
      '@media (min-height: 400px)': {
        height: '85vh',
        maxHeight: '420px',
      },
      '@media (min-height: 800px)': {
        height: '85vh',
        maxHeight: '500px',
      },
    },
  },
  dialogTitle: {
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 'clamp(12px, 9px + 1vw + 0.6vh, 23px)',
    lineHeight: '100%',
    padding: '10px 0px 6px',
    [theme.breakpoints.down('sm')]: {
      padding: '8px 0px 5px',
    },
  },
  dialogContent: {
    width: '100%',
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    gap: '12px',
    padding: '0px 20px 12px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 10px 10px',
      gap: '10px',
    },
  },
  tabs: {
    float: 'left',
    minHeight: '35px',
  },
  tab: {
    fontSize: 'clamp(12px, 9px + 0.8vw, 16px)',
    fontWeight: 'normal',
    textTransform: 'none',
    opacity: '0.8',
    minHeight: '35px',
    lineHeight: '1',
    scale: '1',
    letterSpacing: '0.8px',
    color: theme.palette.primary.contrastText,
    padding: '2px 12px 5px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '60px',
      padding: '2px 10px 5px',
    },
    [theme.breakpoints.down(360)]: {
      minWidth: '50px',
      padding: '0px 5px 5px',
    },
    '&.Mui-selected': {
      color: theme.palette.primary.light,
      fontWeight: 'bolder',
      opacity: '1',
      scale: '1.05',
      letterSpacing: '0.4px',
    },
  },
  searchBox: {
    width: '100%',
    color: theme.palette.secondary.contrastText,
    background: theme.palette.primary.contrastText,
    borderRadius: '5px',
    '& .MuiOutlinedInput-input': {
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
  },
  inviteArea: {
    width: '302px',
    position: 'relative',
    marginBottom: '6px',
    [theme.breakpoints.down('md')]: {
      width: '266px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '232px',
    },
    [theme.breakpoints.down(360)]: {
      width: '166px',
    },
  },
  listWrapper: {
    maxHeight: '160px',
    background: theme.palette.background.paper,
    position: 'absolute',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      maxHeight: '140px',
    },
    '@media (max-height: 400px)': {
      maxHeight: '140px',
    },
    '@media (max-height: 360px)': {
      maxHeight: '110px',
    },
    borderRadius: '0px 0px 5px 5px',
    zIndex: '9999',
    overflowY: 'auto',
    scrollbarGutter: 'stable both-edges',
    scrollbarWidth: 'thin',
    paddingTop: 'clamp(2px, 1px + 0.2vw + 0.3vh, 5px)',
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
    [theme.breakpoints.down('sm')]: {
      gap: '8px',
    },
    [theme.breakpoints.down(360)]: {
      gap: '2px',
    },
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(3px, 4px + 0.6vw, 9px)',
  },
  userTextSection: {
    gap: '6px',
    [theme.breakpoints.down(360)]: {
      gap: '3px',
    },
  },
  infoText: {
    maxWidth: '150px',
    lineHeight: '100%',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]: {
      maxWidth: '130px',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '120px',
    },
    [theme.breakpoints.down(360)]: {
      maxWidth: '75px',
    },
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  username: {
    fontSize: 'clamp(11px, 9px + 0.6vw, 17px)',
    color: theme.palette.primary.contrastText,
    fontWeight: '500',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(12px, 3px + 1.5vw, 15px)',
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
  formActionBtns: {
    marginTop: '10px',
    [theme.breakpoints.down(400)]: {
      flexDirection: 'column',
      gap: '10px',
    },
    '@media (max-height: 360px)': {
      marginTop: '8px',
    },
    alignSelf: 'flex-end',
  },
  btnReset: {
    backgroundColor: '#272727',
    '&:hover': {
      background: '#99999950',
    },
  },
}))
