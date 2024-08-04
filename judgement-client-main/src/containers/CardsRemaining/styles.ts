import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  cardBtn: {
    background: 'transparent',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}))
