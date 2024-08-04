import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  profileSection: {
    height: '100%',
    width: '25%',
    minWidth: '100px',
    maxWidth: '260px',
    '@media (max-height: 600px)': {
      maxWidth: 'clamp(144px, 120px + 10vh, 180px)',
    },
    '@media (max-height: 450px)': {
      maxWidth: '144px',
    },
    [theme.breakpoints.down(500)]: {
      maxWidth: '150px',
      height: 'auto',
    },
  },
  contentSection: {
    height: '100%',
    width: '75%',
    minWidth: '300px',
    padding: 'clamp(10px, 3vh + 1vw, 50px) 10px 10px 10px',
    [theme.breakpoints.down('md')]: {
      padding: 'clamp(10px, 1vh + 1vw, 20px) 5px 5px 5px',
    },
    '@media (max-height: 600px)': {
      padding: 'clamp(5px, 1vh + 1vw, 20px) 10px 5px 10px',
    },
    '@media (max-height: 400px)': {
      padding: 'clamp(5px, 0.5vh + 0.5vw, 10px) 10px 5px 10px',
    },
    [theme.breakpoints.down(500)]: {
      width: 'auto',
      minWidth: '120px',
      maxWidth: '250px',
      alignItems: 'center',
      height: 'auto',
      gap: '5px',
    },
    [theme.breakpoints.down(280)]: {
      padding: '5px 10px',
    },
  },
  bottomContent: {
    [theme.breakpoints.down(500)]: {
      flexDirection: 'column',
      maxWidth: '200px',
      alignItems: 'center',
    },
  },
  settingsIcon: {
    position: 'absolute',
    top: 'clamp(5px, 2px + 0.5vw + 1vh, 30px)',
    right: 'clamp(15px, 8px + 2vw + 0.5vh, 35px)',
  },
  groupHeading: {
    fontSize: 'clamp(20px, 15px + 1vw + 0.75vh, 35px)',
    [theme.breakpoints.down(500)]: {
      justifyContent: 'center',
    },
  },
  groupDescription: {
    width: '70%',
    fontSize: 'clamp(12px, 8px + 0.5vw + 0.5vh, 20px)',
    textAlign: 'justify',
    [theme.breakpoints.down(500)]: {
      width: '85%',
      height: '30%',
      textAlign: 'center',
      marginTop: '5px',
      marginBottom: '10px',
    },
  },
  playBtn: {
    fontSize: 'clamp(13px, 8px + 0.75vw + 0.7vh, 25px)',
    padding: 'clamp(4px, 0.4vw + 0.4vh, 8px) clamp(6px, 1vw + 0.75vh, 20px)',
    [theme.breakpoints.down(500)]: {
      padding: '6px 15px 3.5px',
    },
  },
}))
