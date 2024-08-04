import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()(() => ({
  iconImg: {
    paddingTop: '2px',
    height: 'clamp(15px, 9px + 1vw, 24px)',
  },
}))
