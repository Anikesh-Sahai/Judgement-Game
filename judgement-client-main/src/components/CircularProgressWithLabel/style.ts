import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  progressContainer: {
    position: 'relative',
    display: 'inline-flex',
    color: theme.palette.primary.contrastText,
    fontSize: 'clamp(9px, 5px + 0.8vw + 0.8vh, 18px)',
    background: '#00000075',
    borderRadius: '50%',
  },
  fullSize: {
    zIndex: '1',
    width: '100%',
    height: '100%',
  },
  label: {
    top: 3,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
