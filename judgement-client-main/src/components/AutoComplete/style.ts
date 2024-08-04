import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  autoComplete: {
    color: theme.palette.primary.contrastText,
    width: '95%',
  },
  fieldBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    width: '100%',
    color: theme.palette.secondary.contrastText,
    background: theme.palette.primary.contrastText,
    borderRadius: '5px',
    marginBottom: '5px',
    fontSize: '30px',
    '& .MuiInputLabel-root': {
      fontSize: '16px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '15px',
      },
    },
    '& .MuiFilledInput-input': {
      width: '100%',
      fontSize: '15px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
    },
  },
  fieldError: {
    minHeight: '12px',
    width: '95%',
    color: theme.palette.error.contrastText,
    lineHeight: '12px',
    fontSize: '12px',
    margin: '2px 0px',
    paddingLeft: '2px',
  },
}))
