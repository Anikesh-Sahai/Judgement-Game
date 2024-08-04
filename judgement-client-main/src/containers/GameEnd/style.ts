import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  finishedContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    boxShadow: '0px 0px 10px 0px #00000035, 0px 0px 10px 0px #ffffff40',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(10,10,10,.85)',
    borderRadius: '10px',
    padding: '20px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    color: theme.palette.primary.contrastText,
  },
  finishedText: {
    fontSize: 'clamp(12px, 8px + 1vw + 0.5vh, 20px)',
  },
  backToHomeLink: {
    fontSize: 'clamp(14px, 10px + 0.6vw + 0.5vh, 22px)',
    display: 'flex',
    gap: '4px',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'inherit',
    padding: '6px 10px',
  },
  backToHomeText: {
    fontSize: 'clamp(10px, 6px + 0.6vw + 0.5vh, 18px)',
    paddingRight: '8px',
  },
}))
