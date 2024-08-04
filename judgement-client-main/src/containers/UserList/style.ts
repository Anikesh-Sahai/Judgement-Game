import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  mainboxstyling: {
    width: '100%',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
      gap: '15px',
    },
    [theme.breakpoints.down(480)]: {
      gap: '10px',
    },
  },
  headingContainer: {
    width: '100%',
    color: theme.palette.primary.contrastText,
    gap: 'clamp(8px, 4px + 1vw, 15px)',
    margin: '6px 0px',
  },
  itemsContainer: {
    width: '100%',
    minHeight: '250px',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
      gap: '15px',
    },
    [theme.breakpoints.down(480)]: {
      gap: '10px',
    },
  },
  mainheading: {
    textAlign: 'center',
    fontSize: 'clamp(20px, 12px + 1.5vw + 0.5vh, 35px)',
    paddingTop: '8px',
  },
  icon: {
    fontSize: 'clamp(25px, 20px + 1.5vw, 40px)',
  },
}))
