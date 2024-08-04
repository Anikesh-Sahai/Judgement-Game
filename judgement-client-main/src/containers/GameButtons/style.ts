import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  btn: {
    border: `3px solid ${theme.palette.primary.light}`,
    borderRadius: '50%',
    padding: 'clamp(5px, 2px + 1.2vh, 15px)',
    height: 'clamp(22px, 11px + 5.8vh, 65px)',
    aspectRatio: '1',
    position: 'relative',
    '@media (max-height: 500px)': {
      border: `2px solid ${theme.palette.primary.light}`,
    },
    '@media (max-height: 250px)': {
      border: `1px solid ${theme.palette.primary.light}`,
    },
  },
  btnIcon: {
    height: '100%',
  },
  offBtnLine: {
    color: theme.palette.primary.light,
    height: 'calc(100% + 2px)',
    borderRight: `3px solid ${theme.palette.primary.light}`,
    position: 'absolute',
    right: '50%',
    transform: 'translate(50%, 0) rotate(25deg)',
    '@media (max-height: 500px)': {
      borderRight: `2px solid ${theme.palette.primary.light}`,
    },
    '@media (max-height: 250px)': {
      borderRight: `1px solid ${theme.palette.primary.light}`,
    },
  },
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
  dialogHeading: {
    width: '100%',
    fontSize: 'clamp(11px, 8px + 0.8vw + 0.5vh, 18px)',
  },
  dialogContent: {
    width: '100%',
    color: theme.palette.primary.contrastText,
    padding: '18px 28px 12px',
    [theme.breakpoints.down('sm')]: {
      padding: '18px 20px 12px',
    },
    '@media (max-height: 500px)': {
      padding: '15px 20px 10px',
    },
  },
  modalBtns: {
    paddingBottom: '12px',
    '@media (max-height: 500px)': {
      paddingBottom: '8px',
    },
    color: theme.palette.primary.contrastText,
  },
  actionBtn: {
    fontSize: 'clamp(10px, 7px + 0.5vw + 0.25vh, 16px)',
    padding:
      'clamp(3px, 1px + 0.3vh, 4px) clamp(6px, 1.5px + 1vw, 20px) clamp(1.5px, 1px + 0.25vh, 3px)',
  },
  btnSecondary: {
    backgroundColor: '#272727',
    '&:hover': {
      background: '#99999950',
    },
  },
}))
