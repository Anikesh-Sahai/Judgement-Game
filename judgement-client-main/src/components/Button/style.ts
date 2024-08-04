import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  btn: {
    color: 'inherit',
    textDecoration: 'none',
    fontFamily: 'inherit',
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
    border: 'none',
    background: theme.palette.primary.main,
    fontWeight: '400',
    fontSize: 'clamp(12px, 10px + 0.7vw, 22px)',
    borderRadius: '100px',
    padding: '3px 30px 3px',
    '&:disabled': {
      background: 'transparent',
    },
  },
}))
