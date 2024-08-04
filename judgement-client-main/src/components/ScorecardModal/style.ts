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
  scorecardDialog: {
    '.MuiDialog-paper': {
      width: '600px',
      padding: 'clamp(5px, 2px + 1vh, 10px) clamp(5px, 2px + 0.8vw, 12px)',
      [theme.breakpoints.down('md')]: {
        width: '450px',
      },
      [theme.breakpoints.down(500)]: {
        width: '80vw',
      },
      position: 'absolute',
    },
  },
  scorecardTitle: {
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px',
    fontSize: 'clamp(12px, 8px + 1vw, 22px)',
    lineHeight: '100%',
  },
  scorecardIcon: {
    height: 'clamp(20px, 15px + 1.5vw, 35px)',
    paddingLeft: '10px',
    paddingBottom: '3px',
  },
  scorecardDialogContent: {
    width: '100%',
    color: theme.palette.primary.contrastText,
  },
  scorecardTableRow: {
    gridTemplateColumns: '20% 20% 20% 20% 20% !important',
    fontSize: 'clamp(10px, 4px + 0.9vw, 18px)',
  },
  currentPlayerText: {
    color: theme.palette.primary.main,
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
  },
}))
