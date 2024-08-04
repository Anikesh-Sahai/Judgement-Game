import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  bottomBtns: {
    position: 'absolute',
    bottom: '50%',
    transform: 'translate(0, 50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(10px, -4px + 2vh, 20px)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1',
  },
  roundBtn: {
    '&:hover': {
      background: '#99999950',
    },
  },
  bidDisplay: {
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
