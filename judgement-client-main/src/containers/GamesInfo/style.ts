import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  gameInfoContainer: {
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      gap: '20px',
      padding: '0px 5px',
    },
  },
  stats: {
    marginBottom: 'clamp(5px, 2px + 2.5vh, 25px)',
    height: '50%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '15px',
      height: 'auto',
    },
  },
  gameHistory: {
    gap: '10px',
    // height: '45%',
    maxHeight: '45%',
    '@media: (max-height: 600px)': {
      gap: '4px',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
}))
