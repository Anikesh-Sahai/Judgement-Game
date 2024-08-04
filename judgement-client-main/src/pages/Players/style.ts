import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    color: theme.palette.primary.contrastText,
    width: '100%',
    // padding: '0px clamp(5px, 2px + 1vw, 10px)',
  },
  playersListArea: {
    maxWidth: '1600px',

    [theme.breakpoints.down(420)]: {
      width: '100%',
    },
  },
  playersListContent: {
    minWidth: '415px',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      minWidth: '310px',
    },
  },
  title: {
    fontSize: 'clamp(20px, 14px + 4vw, 60px)',
    fontWeight: '400',
  },
  section: {
    padding: '0px clamp(3px, 1px + 4vw, 30px)',
    marginBottom: '50px',
    color: theme.palette.primary.contrastText,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleArea: {
    width: '100%',
    padding: '0px clamp(3px, 1px + 3vw, 40px)',
    display: 'flex',
    margin: '30px 0px',
    alignItems: 'center',
    gap: 'clamp(5px, 3px + 1.5vw, 20px)',
  },
  diamondIcon: {
    height: 'clamp(25px, 20px + 4vw, 60px)',
  },
  playersList: {
    overflow: 'auto',
    backgroundColor: '#000',
    padding: '15px 1.6% 35px',
    borderRadius: '20px',
    [theme.breakpoints.down('md')]: {
      padding: '15px 2.5% 35px',
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: '15px',
      width: '80%',
      padding: '15px 4% 30px',
    },
    [theme.breakpoints.down(420)]: {
      borderRadius: '15px',
      width: '95%',
    },
  },
}))
