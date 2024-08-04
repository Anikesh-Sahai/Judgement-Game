import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  statsContainer: {
    height: '100%',
    marginBottom: '8px',
    [theme.breakpoints.down('sm')]: {
      minHeight: '200px',
      marginBottom: '4px',
    },
  },
  heading: {
    fontSize: 'clamp(15px, 10px + 1vw + 0.5vh, 25px)',
    fontWeight: '400',
  },
  chart: {
    overflow: 'auto',
    height: '80%',
    width: '90%',
    [theme.breakpoints.down(650)]: {
      width: '100%',
    },
    minHeight: '150px',
  },
  topBar: {
    marginBottom: '5px',
    [theme.breakpoints.down(380)]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px',
      marginBottom: '10px',
    },
  },
}))
