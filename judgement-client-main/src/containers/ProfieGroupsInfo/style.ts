import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  outletContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContent: {
    alignItems: 'center',
    width: '90%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
    },
  },
  icon: {
    color: theme.palette.primary.contrastText,
    fontSize: 'clamp(14px , 12px + 1vw , 25px)',
  },
  textField: {
    color: theme.palette.primary.contrastText,
    width: '100%',
    fontSize: 'clamp(15px , 8px + 1vw , 23px)',
    padding: '4px',
    '&::placeholder': {
      color: theme.palette.primary.contrastText,
      opacity: '0.8',
    },
  },
  parentList: {
    height: '88%',
    '@media (max-height: 600px)': {
      height: '82%',
    },
    overflow: 'auto',
    marginTop: '2.5vh',
  },
  list: {
    justifyContent: 'center',
    width: '100%',
    gap: '20px',
    flexDirection: 'row',
    [theme.breakpoints.down(750)]: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: '75vh',
      minHeight: '350px',
    },
    maxHeight: '100%',
  },
  cardContainer: {
    width: '100%',
    maxWidth: '300px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '280px',
    },
  },
}))
