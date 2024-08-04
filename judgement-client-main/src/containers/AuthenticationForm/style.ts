import { combinedMediaMaxQuery } from '@Utils/customMediaQuery'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    overflow: 'auto',
  },

  blackEllipse: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 'min(100vh, 100vw)',
    zIndex: '-2',
    overflow: 'hidden',
    '@media (max-height: 450px)': {
      display: 'none',
    },
  },

  boxContent: {
    display: 'flex',
    margin: '0 auto',
    height: '100%',
    width: '75%',
    minHeight: '450px',
    maxWidth: '1000px',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      width: '80%',
    },
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    [theme.breakpoints.down(400)]: {
      width: '95%',
    },
  },

  boxGrid: {
    width: '100%',
    margin: '0 auto',
    paddingBottom: '7vh',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 'clamp(10px, 5px + 2vh, 60px)',
      width: '80%',
    },
    [theme.breakpoints.down(400)]: {
      width: '90%',
    },
  },

  boxLeft: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingRight: 'clamp(20px, 15px + 2.5vw, 70px)',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 10px',
    },
    [combinedMediaMaxQuery(theme.breakpoints.values.sm, 750)]: {
      display: 'none',
    },
  },

  boxRight: {
    width: '100%',
    overflow: 'visible',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    paddingLeft: 'clamp(12px, 15px + 1.5vw, 30px)',
    [theme.breakpoints.down('sm')]: {
      padding: '5px 5px',
    },
    zIndex: '2',
  },

  redEllipse: {
    width: '70%',
    height: '70%',
    backgroundColor: theme.palette.primary.main,
    filter: 'blur(350px)',
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
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '60%',
      minWidth: '200px',
    },
    [theme.breakpoints.down(350)]: {
      width: '60%',
      minWidth: '100px',
    },
    [theme.breakpoints.down(200)]: {
      width: '60%',
      minWidth: '80px',
    },
    width: '100%',
    minWidth: '250px',
    maxWidth: '400px',
    zIndex: '1',
  },
}))

export const useAuthFormStyles = makeStyles()((theme) => ({
  container: {
    width: '80%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 'clamp(12px, 12px + 1.5vh + 1vw, 20px) clamp(10px, 5px + 1vw, 18px)',
    color: theme.palette.primary.contrastText,
    borderRadius: 'clamp(10px, 5px + 1vw, 18px)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '15px -20px 50px #0A0B1C',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    [theme.breakpoints.down(750)]: {
      width: '100%',
    },
  },
  heading: {
    textAlign: 'center',
    fontSize: 'clamp(20px, 15px + 1vh + 1vw, 30px)',
    marginBottom: 'clamp(4px, 3px + 0.3vh + 0.2vw, 6px)',
  },
  form: {
    width: '90%',
    color: 'inherit',
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(5px, 2px + 0.8vh, 10px)',
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '95%',
    },
  },
  formResponse: {
    minHeight: '12px',
    width: '95%',
    lineHeight: '12px',
    textAlign: 'center',
    margin: '0px',
    padding: '0px',
    fontSize: '13px',
  },
  formError: {
    color: theme.palette.error.contrastText,
  },
  formMessage: {
    color: theme.palette.success.main,
  },
  btnSubmit: {
    margin: '5px 5px 10px 5px',
  },
  question: {
    fontSize: '15px',
    [theme.breakpoints.down(750)]: {
      fontSize: '14px',
    },
  },
  firstQuestion: {
    marginBottom: '-5px',
  },
  link: {
    outline: 'none',
    color: theme.palette.primary.main,
  },
  stepper: {
    marginBottom: '6px',
    background: 'transparent',
    '& .MuiMobileStepper-dot': {
      background: theme.palette.primary.contrastText,
      margin: '0px 5px',
    },
    '& .MuiMobileStepper-dotActive': {
      background: theme.palette.primary.main,
      width: '8.5px',
      height: '8.5px',
    },
  },
  btnNext: {
    margin: '5px 5px 10px 5px',
    fontSize: '20px',
  },
  btnBack: {
    color: 'white',
    position: 'absolute',
    fontSize: 'clamp(24px, 18px + 1.25vw, 35px)',
    top: '15px',
    left: '15px',
    transition: 'all ease-in-out .1s',
    '&:hover': {
      scale: '1.1',
    },
  },
}))
