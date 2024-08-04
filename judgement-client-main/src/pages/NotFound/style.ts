import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    background: theme.palette.background.paper,
    color: theme.palette.primary.contrastText,
    height: '100vh',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
    justifyContent: 'flex-start',
    minHeight: '400px',
  },
  container: {
    width: '90%',
    flexGrow: '1',
  },
  heading: {
    display: 'flex',
    fontSize: 'clamp(25px, 15px + 3vw , 60px)',
    justifyContent: 'center',
    width: '100%',
  },
  subheading: {
    display: 'flex',
    fontSize: 'clamp(13px, 7px + 1vw + 0.5vh, 24px)',
    justifyContent: 'center',
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '4px',
    fontSize: 'clamp(14px, 10px + 1vw, 22px)',
  },
  icon: {
    paddingBottom: '2px',
    fontSize: 'clamp(18px, 14px + 1vw, 26px)',
  },
}))
