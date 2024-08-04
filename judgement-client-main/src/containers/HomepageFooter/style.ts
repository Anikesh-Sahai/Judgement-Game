import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  footer: {
    color: theme.palette.primary.contrastText,
    padding: '10px clamp(15px, 10px + 1vw, 25px)',
    overflow: 'auto',
  },
  container: {
    padding: '10px clamp(20px, 15px + 2vw, 45px)',
    width: '50%',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '20px clamp(10px, 8px + 2vw, 35px)',
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: '0px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '47%',
    },
  },
  heading: {
    fontSize: 'clamp(16px, 10px + 2vw, 35px)',
    textTransform: 'capitalize',
  },
  content: {
    fontSize: 'clamp(13px, 9px + 0.7vw, 17px)',
    lineHeight: 'clamp(12px, 8px + 1.1vw, 24px)',
    textAlign: 'justify',
  },
  gridItem: {
    paddingBottom: '18px',
  },
  bottomContainer: {
    paddingTop: '0px',
  },
  icons: {
    width: 'clamp(14px, 30px + 1vw, 45px)',
    height: 'clamp(14px, 30px + 1vw, 45px)',
  },
  iconLink: {
    display: 'flex',
    alignItems: 'center',
  },
  bottomGrid: {
    paddingBottom: '15px',
  },
}))
