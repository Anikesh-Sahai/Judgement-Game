import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  gameScreen: {
    background: '#000',
    width: '100%',
    height: '100vh',
  },
  gameArea: {
    width: '90%',
    height: '80%',
    maxWidth: '1600px',
    maxHeight: '900px',
    background: theme.palette.background.default,
    border: `3px solid ${theme.palette.primary.light}`,
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: '93%',
    },
    '@media (max-height: 500px)': {
      height: '88%',
      border: `2px solid ${theme.palette.primary.light}`,
      borderRadius: '12px',
    },
  },
  heroFigure: {
    height: '50%',
    maxHeight: '75vw',
    paddingBottom: '2%',
    paddingRight: '0.5%',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '3%',
      paddingRight: '0.5%',
    },
  },
  heroImg: {
    height: '100%',
    opacity: '75%',
  },
  avatars: {
    height: '18%',
    aspectRatio: '1',
    position: 'absolute',
    '@media (max-height: 300px)': {
      height: '20%',
    },
  },
  playerZero: {
    bottom: 'clamp(5px, 2px + 1.2vh, 12px)',
  },
  playerOne: {
    left: 'clamp(5px, 2px + 0.9vw, 12px)',
  },
  playerTwo: {
    top: 'clamp(5px, 2px + 1.2vh, 12px)',
  },
  playerThree: {
    right: 'clamp(5px, 2px + 0.9vw, 12px)',
  },
  playerAvatar: {
    height: '100%',
    width: '100%',
    border: `3px solid ${theme.palette.primary.light}`,
    '@media (max-height: 500px)': {
      border: `2px solid ${theme.palette.primary.light}`,
    },
  },
  badgeBtn: {
    background: theme.palette.background.default,
    padding: 'clamp(3.5px, 1.5px + 0.8vh, 12px)',
    height: 'clamp(18px, 10px + 4vh, 50px)',
    '&:hover': {
      background: theme.palette.background.default,
    },
  },
  btns: {
    position: 'absolute',
    top: 'clamp(6px, -8px + 4.5vh, 35px)',
    right: 'clamp(10px, -15px + 4.5vw, 45px)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 'clamp(3px, 2px + 0.6vw, 15px)',
    maxWidth: '35vw',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '30vw',
    },
    [theme.breakpoints.down(450)]: {
      maxWidth: '29vw',
    },
    flexWrap: 'wrap',
  },
}))
