import { combinedMediaMaxQuery, combinedMediaMinMaxQuery } from '@Utils/customMediaQuery'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'block',
    width: '100%',
  },

  box: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    maxHeight: '1000px',
    overflow: 'hidden',
    position: 'relative',
  },

  blackEllipse: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 'min(100vh, 100vw)',
    zIndex: '-2',
  },

  boxContent: {
    display: 'flex',
    margin: '0 auto',
    height: '100%',
    width: '85%',
    maxWidth: '900px',
    minHeight: '250px',
    [theme.breakpoints.up('lg')]: {
      width: '75%',
    },
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down(400)]: {
      width: '95%',
    },
  },

  boxGrid: {
    margin: '0 auto',
    paddingBottom: '7vh',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 'clamp(10px, 5px + 2vh, 60px)',
    },
    [combinedMediaMaxQuery(theme.breakpoints.values.sm, 400)]: {
      flexDirection: 'column',
      gap: '2px',
    },
  },

  boxRight: {
    width: '90%',
    overflow: 'visible',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: '10px 10px 10px clamp(15px, 10px + 2vw, 50px)',
    [theme.breakpoints.down('sm')]: {
      padding: '5px 5px',
    },
    zIndex: '2',
  },

  boxLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    padding: '5px clamp(15px, 10px + 2.5vw, 70px) 5px 5px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 10px',
    },
  },

  textGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heroText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 'clamp(40px, 30px + 2.5vw + 1vh, 100px)',
    lineHeight: 'clamp(50px, 40px + 1.25vw + 1.25vh, 85px)',
    marginBottom: 'clamp(20px, 15px + 0.5vh + 0.5vw, 25px)',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'clamp(20px, 15px + 1vw + 3vh, 50px)',
      marginBottom: 'clamp(8px, 6px + 1vh + 0.5vw, 20px)',
    },
    [combinedMediaMaxQuery(theme.breakpoints.values.sm, 400)]: {
      fontSize: '24px',
      lineHeight: '20px',
      marginBottom: '8px',
    },
  },

  heroTextSecondary: {
    fontFamily: 'inherit',
    width: '90%',
    fontWeight: '400',
    fontSize: 'clamp(10px, 10px + 0.5vw + 0.5vh, 20px)',
    lineHeight: 'clamp(12px, 10px + 0.5vw + 0.5vh, 25px)',
    textAlign: 'center',
    letterSpacing: '0.16em',
    marginBottom: 'clamp(25px, 20px + 1vh + 1vw, 75px)',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 'clamp(11px, 5px + 0.6vw + 1vh, 15px)',
      marginBottom: 'clamp(25px, 10px + 4vh + 0.5vw, 40px)',
      width: '80%',
    },
    [combinedMediaMaxQuery(theme.breakpoints.values.sm, 400)]: {
      fontSize: '11px',
      width: '80%',
      marginBottom: '12px',
    },
  },

  playBtn: {
    fontSize: 'clamp(15px, 10px + 0.5vw + 0.5vh, 25px)',
  },

  redEllipse: {
    width: '90%',
    height: '90%',
    backgroundColor: theme.palette.primary.main,
    filter: 'blur(300px)',
    borderRadius: '50%',
    position: 'absolute',
    zIndex: '-1',
    overflow: 'visible',
  },

  heroFig: {
    display: 'flex',
    justifyContent: 'center',
  },

  heroImg: {
    minWidth: '275px',
    maxWidth: '425px',
    width: '100%',
    zIndex: '1',
    [theme.breakpoints.between('sm', 'xl')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'min(60vw, 30vh)',
      minWidth: '150px',
    },
    [theme.breakpoints.down(350)]: {
      width: '60%',
      minWidth: '100px',
    },
    [theme.breakpoints.down(200)]: {
      width: '60%',
      minWidth: '80px',
    },
    [combinedMediaMaxQuery(theme.breakpoints.values.sm, 400)]: {
      width: 'min(60vw, 30vh)',
      minWidth: '100px',
    },
    [combinedMediaMinMaxQuery(theme.breakpoints.values.sm, 400)]: {
      width: '70%',
      minWidth: '200px',
    },
  },
  section: {
    padding: '30px 0px 100px',
    color: theme.palette.primary.contrastText,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupsSection: {
    background: '#0F1521',
    padding: '30px 0px 60px',
  },
  groupsSlider: {
    color: theme.palette.primary.contrastText,
    width: '100%',
  },
  titleArea: {
    width: '100%',
    padding: '40px clamp(30px, 10px + 8vw, 120px)',
    [theme.breakpoints.down('sm')]: {
      padding: '40px clamp(10px, 5px + 7vw, 40px)',
    },
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  groupsTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexGrow: '1',
  },
  newGroupIcon: {
    fontSize: 'clamp(40px, 25px + 4vw + 1.5vh, 70px)',
    color: theme.palette.primary.light,
  },
  diamondIcon: {
    height: 'clamp(40px, 25px + 4vw + 1vh, 70px)',
  },
  title: {
    fontSize: 'clamp(24px, 12px + 3.2vw, 55px)',
    paddingTop: '5px',
    fontWeight: '400',
  },
  playersSection: {
    background: 'none',
  },
  playersListArea: {
    maxWidth: '1600px',
    [theme.breakpoints.down(420)]: {
      width: '100%',
    },
  },
  playersList: {
    overflow: 'auto',
    backgroundColor: '#000',
    padding: '15px 2.5% 35px',
    borderRadius: '20px',
    [theme.breakpoints.down('md')]: {
      padding: '15px 4% 35px',
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: '15px',
      width: '80%',
      padding: '15px 6% 30px',
    },
    [theme.breakpoints.down(420)]: {
      borderRadius: '15px',
      width: '95%',
    },
  },
  playersListContent: {
    minWidth: '400px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      minWidth: '280px',
    },
  },
}))
