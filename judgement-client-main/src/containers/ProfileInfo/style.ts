import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  profileSection: {
    height: '100%',
    width: '100%',
    gap: 'clamp(10px, -5px + 3.2vh, 28px)',
    [theme.breakpoints.down('sm')]: {
      margin: '20px 0px',
      gap: '15px',
      minHeight: '150px',
    },
    position: 'relative',
  },
  profileMoreBtn: {
    position: 'absolute',
    top: '15px',
    right: '10px',
    [theme.breakpoints.down('sm')]: {
      top: '-8px',
    },
  },
  profilePart: {
    width: '100%',
    gap: 'clamp(6px, 4px + 0.8vh, 12px)',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      gap: '12px',
    },
    [theme.breakpoints.down(280)]: {
      flexDirection: 'column',
      gap: '8px',
    },
    marginBottom: '0.4vh',
    '@media (max-height: 400px)': {
      marginBottom: '0px',
    },
  },
  profilePhoto: {
    width: 'min(60%, 28vh)',
    marginBottom: '0.7vh',
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      width: '30%',
    },
    '@media (max-height: 400px)': {
      width: 'min(60%, 25vh)',
      marginBottom: '0px',
    },
  },
  username: {
    fontSize: 'clamp(20px, 12px + 1.1vw + 0.9vh, 30px)',
    fontWeight: '400',
    marginBottom: '0.4vh',
    [theme.breakpoints.down('md')]: {
      fontWeight: '300',
    },
    '@media (max-height: 400px)': {
      marginBottom: '0px',
    },
  },
  name: {
    fontSize: 'clamp(15px, 10px + 1vw + 0.9vh, 25px )',
    fontWeight: '300',
    [theme.breakpoints.down('md')]: {
      fontWeight: '200',
    },
    marginBottom: '0.5vh',
    '@media (max-height: 400px)': {
      marginBottom: '0px',
    },
  },
  nameSection: {
    width: '100%',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.down(280)]: {
      alignItems: 'center',
    },
  },
  buttons: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    fontSize: 'clamp(12px, 7px + 0.8vw + 0.5vh, 24px )',
    marginBottom: 'clamp(5px, 2px + 1.2vh, 12px)',
    borderRadius: '4px',
    padding: 'clamp(4px, 2px + 0.8vh, 8px) 0px clamp(3px, 1px + 0.6vh, 5px)',
    gap: 'clamp(5px, 2px + 2.5vh, 20px)',
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
    fontWeight: '400',
    '&.active': {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down('md')]: {
      fontWeight: '300',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '6px 0px 4px',
      marginBottom: '5px',
      gap: '15px',
    },
    '@media (max-height: 400px)': {
      marginBottom: '0px',
    },
  },
  btnCount: {
    fontSize: 'inherit',
    width: '40%',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down(1050)]: {
      width: '35%',
    },
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.down(350)]: {
      width: '45%',
    },
    [theme.breakpoints.down(250)]: {
      width: '40%',
    },
  },
  btnCountText: {
    textAlign: 'center',
    minWidth: '50%',
    color: 'inherit',
    fontSize: 'inherit',
  },
  btnText: {
    textAlign: 'left',
    flexGrow: '1',
    color: 'inherit',
    fontSize: 'inherit',
  },
  divider: {
    color: 'white',
    backgroundColor: 'white',
    height: '1px',
    marginBottom: 'clamp(3px, -1px + 1vh, 10px)',
    width: '80%',
  },
}))
