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
  },
  roundDialog: {
    '.MuiDialog-paper': {
      padding:
        'clamp(3px, 1px + 0.5vh, 6px) clamp(8px, 5px + 1.2vw, 20px) clamp(8px, 5px + 2vh, 20px)',
      width: '500px',
      [theme.breakpoints.down('md')]: {
        width: '350px',
      },
      [theme.breakpoints.down(500)]: {
        width: '70vw',
      },
    },
  },
  dialogTitle: {
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    padding: 'clamp(5px, 2px + 1.5vh, 15px) 10px clamp(5px, 2px + 1.5vh, 15px)',
    fontSize: 'clamp(12px, 8px + 1.2vw, 24px)',
    display: 'flex',
    flexDirection: 'column',
  },
  titleBox: {
    padding: '0px',
    lineHeight: '120%',
  },
  dialogContent: {
    overflow: 'hidden',
    padding: 'clamp(5px, 2px + 1vh, 10px) 20px',
    [theme.breakpoints.down('sm')]: {
      padding: 'clamp(5px, 2px + 1vh, 10px) 15px',
    },
  },
  roundSlider: {
    color: '#FFFBFB',
    '.MuiSlider-markLabel': {
      color: '#FFFBFB',
      fontSize: 'clamp(10px, 6px + 1.2vh + 0.5vw, 18px)',
    },
    '.MuiSlider-rail': {
      height: '2px',
      opacity: '1',
      backgroundColor: '#bbb',
    },
    '.MuiSlider-track': {
      height: '2px',
      border: 'none',
    },
    '.MuiSlider-thumb': {
      width: '18px',
      height: '18px',
      '@media (max-height: 500px)': {
        width: '14px',
        height: '14px',
      },
    },
    '.MuiSlider-mark': {
      height: '6px',
      width: '1px',
      border: 'none',
      color: '#FFFBFB',
      opacity: '1',
      '&.MuiSlider-markActive': {
        opacity: '1',
        height: '6px',
        width: '1px',
        backgroundColor: '#FFFBFB',
      },
    },
  },
  modalBtns: {
    '@media (min-height: 500px)': {
      paddingTop: '10px',
    },
    color: theme.palette.primary.contrastText,
  },
  actionBtn: {
    fontSize: 'clamp(10px, 8px + 0.8vw, 20px)',
    padding:
      'clamp(3px, 1px + 0.5vh, 5px) clamp(8px, 2px + 1.4vw, 30px) clamp(2px, 1px + 0.3vh, 4px)',
  },
  btnSecondary: {
    backgroundColor: '#272727',
    '&:hover': {
      background: '#99999950',
    },
  },
}))
