import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  bottomBtns: {
    position: 'absolute',
    bottom: 'clamp(10px, -15px + 6vh, 40px)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(10px, -4px + 4vh, 50px)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtn: {
    color: theme.palette.primary.contrastText,
    borderRadius: 'clamp(4px, 2px + 0.5vh, 8px)',
    padding: 'clamp(2px, 1px + 0.2vh, 4px) clamp(30px, 10px + 4vw, 70px) 1px',
    fontSize: 'clamp(12px, 4px + 0.4vw + 1.4vh, 28px)',
    '&:disabled': {
      background: '#aa0000 !important',
      color: '#ddd !important',
      pointerEvents: 'auto',
    },
  },
  notReadyBtn: {
    backgroundColor: '#dddddd60',
    fontSize: 'clamp(10px, 4px + 0.3vw + 1.3vh, 25px)',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    textTransform: 'none',
    '&:hover': {
      background: '#88888850',
    },
  },
  doneIcon: {
    fontSize: 'clamp(10px, 4px + 0.7vw + 1.8vh, 32px)',
    paddingBottom: '5px',
  },
  roundBtn: {
    '&:hover': {
      background: '#99999950',
    },
  },
  roundDisplay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    borderRadius: 'clamp(3px, 1px + 0.7vh, 7px)',
    background: '#0C0D1B',
    padding:
      'clamp(3px, 2px + 0.7vh, 8px) clamp(30px, 15px + 4vw, 60px) clamp(2px, 1px + 0.5vh, 5px)',
    fontSize: 'clamp(12px, 6px + 0.3vw + 1vh, 20px)',
  },
  editIcon: {
    fontSize: 'clamp(14px, 8px + 0.5vw + 1.2vh, 28px)',
    position: 'absolute',
    right: 'clamp(5px, 2px + 0.7vw, 15px)',
    paddingBottom: 'clamp(2px, 1px + 0.3vh, 4px)',
  },
}))
