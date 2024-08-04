import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  avatarGroup: {
    '.MuiAvatarGroup-avatar': {
      height: 'clamp(25px, 18px + 0.75vh + 0.75vw, 40px)',
      width: 'clamp(25px, 18px + 0.75vh + 0.75vw, 40px)',
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  medalBadge: {
    height: '110%',
    width: '110%',
    marginTop: '-8px',
    marginRight: '5px',
  },
  bottomHeading: {
    fontSize: 'clamp(15px, 10px + 1vw + 0.5vh, 25px)',
  },
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
  gameHistoryTable: {
    [theme.breakpoints.down(500)]: {
      maxHeight: '300px',
    },
    alignItems: 'flex-start',
    flexGrow: '1',
    maxWidth: '100%',
    overflow: 'auto',
  },
  playerColumn: {
    display: 'flex',
    justifyContent: 'center',
  },
  tableRowBox: {
    width: '100%',
    position: 'relative',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  gameHistoryGameLink: {
    textDecoration: 'none',
    background: '#ffffff08',
    '&:hover': {
      background: 'none',
    },
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
  },
}))
