import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    background: '#141414',
    minWidth: '300px',
    maxWidth: '500px',
    minHeight: '180px',
    [theme.breakpoints.down('sm')]: {
      minHeight: '255px',
      minWidth: '160px',
      maxWidth: '200px',
    },
    borderRadius: '5px',
    boxShadow: '0px 0px 8px #ffffff50',
    marginTop: '10px',
    position: 'relative',
    zIndex: '21',
  },
  info: {
    minHeight: '70px',
    padding: '8px 20px 0px',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      minHeight: '140px',
    },
  },
  avatar: {
    height: '60px',
    width: '60px',
    border: '2px solid red',
  },
  navbtn: {
    display: 'inline-block',
    maxWidth: '350px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    fontSize: '23px',
    padding: '0px',
    '&:hover': {
      color: theme.palette.primary.light,
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '150px',
      fontSize: '20px',
    },
  },
  btnTab: {
    padding: '12px 15px 10px',
    height: '105px',
    [theme.breakpoints.down('sm')]: {
      height: '100px',
    },
    width: '100%',
    background: '#000',
  },
  statsArea: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      alignItems: 'center',
    },
  },
  statsText: {
    fontSize: '17px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
  },
  btnsArea: {
    height: '100%',
  },
  btn: {
    fontSize: '16px',
    padding: '4px 14px 6px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
      padding: '4px 14px 6px',
    },
  },
  btnIconFont: {
    height: '17px',
    [theme.breakpoints.down('sm')]: {
      height: '15px',
    },
  },
}))
