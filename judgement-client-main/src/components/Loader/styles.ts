import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()(() => ({
  loaderArea: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '1%',
  },
}))
