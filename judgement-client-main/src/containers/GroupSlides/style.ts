import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  noGroups: {
    height: '360px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'clamp(24px, 16px + 2vw, 40px)',
  },
  errorMsg: {
    height: '360px',
    fontSize: 'clamp(12px, 10px + 1.8vw, 40px)',
  },
  createGroupLink: {
    textDecoration: 'underline',
    color: theme.palette.primary.light,
    fontSize: 'inherit',
    textTransform: 'none',
  },
  detectorElement: {
    width: '100%',
  },
}))
