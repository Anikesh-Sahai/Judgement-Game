import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  buttons: {
    fontSize: 'clamp(8px , 7px + 1vw , 20px )',
    [theme.breakpoints.up('md')]: {
      fontWeight: '400',
    },
    padding: '5px 10px',

    [theme.breakpoints.down('sm')]: {
      fontWeight: '300',
    },
    height: 'clamp(25px , 20px + 2vw , 50px )',
    textTransform: 'none',
    background: theme.palette.primary.main,
  },
  downIcon: {
    marginLeft: '6px',
    height: 'clamp(6px , 3px + 1vw , 12px)',
  },

  menuBarAccountItem: {
    [theme.breakpoints.down('sm')]: {
      width: '70px',
    },
  },
  menuBar: {
    [theme.breakpoints.down('sm')]: {
      width: '85px',
    },
  },

  menuBarBtn: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
  },

  menuBarBtnText: {
    fontSize: 'clamp(7px , 6px + 1vw , 18px)',
  },

  dropDown: {
    alignSelf: 'center',
  },
}))
