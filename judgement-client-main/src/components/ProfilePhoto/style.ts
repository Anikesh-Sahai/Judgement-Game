import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  profile: {
    border: `3px solid ${theme.palette.primary.contrastText}`,
    width: '90%',
    minWidth: '80px',
    aspectRatio: '1',
    borderRadius: '50%',
    overflow: 'hidden',
  },
}))
