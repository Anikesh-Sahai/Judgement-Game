import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  bottomBtns: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, 50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(10px, -4px + 2vh, 20px)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1',
  },
}))
