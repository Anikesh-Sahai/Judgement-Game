import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  cardContainer: {
    width: '100%',
    position: 'relative',
  },
  cardLink: {
    position: 'absolute',
    textDecoration: 'none',
    width: '100%',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
  },
  card: {
    width: '100%',
    backgroundColor: '#0F1521',
    borderRadius: '20px',
    height: '320px',
    minWidth: '300px',
    [theme.breakpoints.down('sm')]: {
      height: '250px',
      minWidth: '160px',
    },
    '& .MuiCardMedia-root': {
      height: '140px',
      [theme.breakpoints.down('sm')]: {
        height: '110px',
      },
    },
  },
  afterImageArea: {
    height: '180px',
    padding: '8px 6px',
    [theme.breakpoints.down('sm')]: {
      height: '140px',
      padding: '4px 3px',
    },
  },
  textContent: {
    padding: '6px 8px',
    [theme.breakpoints.down('sm')]: {
      padding: '5px clamp(6px, 3px + 2.5vw, 20px)',
    },
  },
  heading: {
    fontSize: '22px',
    marginBottom: '2px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineClamp: '1',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
    fontWeight: '500',
    [theme.breakpoints.down('sm')]: {
      fontWeight: '400',
      fontSize: '18px',
    },
    textAlign: 'left',
    color: '#ECECEC',
  },
  content: {
    fontSize: '16px',
    fontWeight: '300',
    color: theme.palette.primary.contrastText,
    width: '100%',
    textAlign: 'justify',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineClamp: '2',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  memberActions: {
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
      padding: '8px clamp(8px, 4px + 2.5vw, 20px)',
    },
  },
  play: {
    color: theme.palette.primary.contrastText,
    fontSize: '18px',
    padding: '4px 16px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '15px',
      padding: '2px 12px 2px',
    },
  },
  avatarGroup: {
    '.MuiAvatarGroup-avatar': {
      height: '42px',
      width: '42px',
      border: `3px solid ${theme.palette.primary.main}`,
      [theme.breakpoints.down('sm')]: {
        height: '30px',
        width: '30px',
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
    '.MuiAvatar-colorDefault': {
      zIndex: 10,
      border: `3px solid ${theme.palette.primary.contrastText}`,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontSize: 'clamp(16px, 13px + 0.8vw, 22px)',
      [theme.breakpoints.down('sm')]: {
        fontSize: 'clamp(11px, 8px + 0.6vw, 14px)',
        border: `2px solid ${theme.palette.primary.contrastText}`,
      },
    },
  },
}))
