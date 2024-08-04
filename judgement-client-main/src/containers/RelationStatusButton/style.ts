import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  play: {
    fontSize: 'clamp(12px, 7px + 1vw, 20px)',
    padding: '4px 20px 6px',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(12px, 3px + 2vw, 15px)',
      padding: '3px 15px 6px',
    },
    width: '100%',
  },
  rejectBtn: {
    backgroundColor: '#272727',
    '&:hover': {
      background: '#99999950',
    },
  },
}))
