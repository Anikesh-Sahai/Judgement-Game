import { combinedMediaMaxQuery, combinedMediaMinMaxQuery } from '@Utils/customMediaQuery'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  box: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: '100vh',
    minHeight: '280px',
    width: '100vw',
    overflow: 'auto',
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
    width: '85%',
    height: '100%',
    maxWidth: '900px',
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

  boxLeft: {
    width: '90%',
    overflow: 'visible',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: '10px clamp(15px, 10px + 2vw, 55px) 10px 10px',
    [theme.breakpoints.down('sm')]: {
      padding: '5px 5px',
    },
    zIndex: '2',
  },

  boxRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    padding: '5px 5px 5px clamp(15px, 10px + 1.75vw, 55px)',
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
    lineHeight: 'clamp(12px, 10px + 0.7vw + 1vh, 25px)',
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
}))
