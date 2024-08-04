import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  hidden: {
    display: 'none',
  },

  avatar: {
    display: 'flex',
    border: '2px solid white',
    height: 'clamp(30px, 24px + 1.25vw, 45px)',
    width: 'clamp(30px, 24px + 1.25vw, 45px)',
  },

  tooltip: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'inherit',
  },

  menuBar: {
    width: '165px',
    overflow: 'visible',
    filter: 'drop-shadow(0px 1px 4px rgba(255, 255, 255, 0.25))',
    color: theme.palette.primary.contrastText,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '15px 50px 0px 0px',
    padding: '0',
  },

  menuBarItem: {
    width: '150px',
    padding: '8px 5px',
    [theme.breakpoints.down('sm')]: {
      padding: '4px 2px',
      minHeight: '32px',
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'inherit',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.25)',
    },
  },

  username: {
    marginLeft: '10px',
    fontSize: 'clamp(14px, 12px + 0.5vw, 22px)',
  },

  downIcon: {
    fontSize: 'clamp(30px, 24px + 1.25vw, 36px)',
  },

  itemIcon: {
    color: theme.palette.primary.contrastText,
  },

  dropdownBtn: {
    background: 'transparent',
    textDecoration: 'none',
    border: '0',
    padding: '6px 10px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 0px 0px 10px',
    },
    [theme.breakpoints.down(300)]: {
      paddingLeft: '6px',
    },
    cursor: 'pointer',
    color: 'inherit',
  },
}))
