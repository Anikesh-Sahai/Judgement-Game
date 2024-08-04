import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  errorArea: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.error.light,
    textAlign: 'center',
    fontSize: 'clamp(12px, 8px + 1vw + 0.5vh, 25px)',
    paddingBottom: '4%',
  },
}))
