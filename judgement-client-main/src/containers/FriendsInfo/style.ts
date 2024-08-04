import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  outletContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendsContainer: {
    width: '80%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  friendsSection: {
    height: '90%',
    width: '100%',
    minHeight: '250px',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      minHeight: '200px',
      maxHeight: '500px',
    },
    alignItems: 'flex-start',
  },
  list: {
    minWidth: '280px',
    padding: 'clamp(5px, 3px + 1vh, 10px) clamp(6px , 5px + 1vw , 15px)',
    paddingLeft: '0px',
  },
}))
