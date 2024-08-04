import theme from '@Themes/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  autocompleteOption: {
    cursor: 'pointer',
    padding: '8px 12px',
    background: '#111',
    '&:hover': {
      background: '#333',
    },
  },
  playerListItem: {
    gap: '12px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 5px + 0.5vw, 9px)',
  },
  userTextSection: {
    gap: '6px',
  },
  infoText: {
    maxWidth: '160px',
    lineHeight: '100%',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]: {
      maxWidth: '135px',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '120px',
    },
    [theme.breakpoints.down(480)]: {
      maxWidth: '100px',
    },
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  username: {
    fontSize: 'clamp(11px, 7px + 0.9vw, 18px)',
    color: theme.palette.primary.contrastText,
    fontWeight: '500',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(12px, 3px + 1.5vw, 15px)',
    },
  },
  name: {
    fontSize: 'clamp(11px, 7px + 0.7vw, 17px)',
    lineHeight: '100%',
    fontWeight: '400',
    [theme.breakpoints.down(480)]: {
      fontSize: 'clamp(11px, 3px + 1.5vw, 15px)',
    },
  },
  avatars: {
    height: 'clamp(30px, 20px + 2.2vw, 50px)',
    width: 'clamp(30px, 20px + 2.2vw, 50px)',
    border: `3px solid ${theme.palette.primary.main}`,
  },
}))
