import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  bottomScrollableComponents: {
    maxHeight: '90%',
    '@media (max-height: 1200px)': {
      maxHeight: '85%',
    },
    '@media (max-height: 900px)': {
      maxHeight: '80%',
    },
    '@media (max-height: 650px)': {
      maxHeight: '70%',
    },
    [theme.breakpoints.down(500)]: {
      maxHeight: '150px',
    },
  },
  memberAvatars: {
    overflowY: 'auto',
    [theme.breakpoints.down(500)]: {
      maxHeight: '150px',
    },
  },
  bottomHeading: {
    fontSize: 'clamp(15px, 10px + 1vw + 0.5vh, 25px)',
  },
  avatar: {
    border: `3px solid ${theme.palette.primary.main}`,
    height: 'clamp(35px, 30px + 1.75vw, 65px)',
    width: 'clamp(35px, 30px + 1.75vw, 65px)',
  },
  avatarSkeleton: {
    height: 'clamp(35px, 30px + 1.75vw, 65px)',
    width: 'clamp(35px, 30px + 1.75vw, 65px)',
  },
}))
