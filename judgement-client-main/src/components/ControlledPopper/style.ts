import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()(() => ({
  sizeOverride: {
    width: '100%',
    height: '100%',
  },
  button: {
    background: 'transparent',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  },
}))
