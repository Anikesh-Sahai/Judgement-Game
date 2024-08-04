import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  showMoreIconBtn: {
    fontSize: 'clamp(20px, 16px + 1vw, 30px)',
    color: theme.palette.primary.contrastText,
  },
  popperBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    background: 'rgba(20, 20, 20, 0.8)',
    minWidth: '200px',
    minHeight: '90px',
    padding: '15px 15px',
    gap: '10px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 15px',
      minHeight: '60px',
      minWidth: '150px',
      gap: '6px',
    },
    borderRadius: '5px',
    boxShadow: '0px 0px 8px #ffffff50',
    marginTop: '10px',
  },
}))
