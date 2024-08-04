import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  searchBar: {
    width: '100%',
    display: 'flex',
    height: 'clamp(25px , 10px + 2vw + 1.5vh , 40px)',
    alignItems: 'center',
    marginBottom: '1vh',
    borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
  },

  icon: {
    color: theme.palette.primary.contrastText,
    fontSize: 'clamp(14px , 12px + 1vw , 25px)',
  },

  textField: {
    color: theme.palette.primary.contrastText,
    width: '100%',
    fontSize: 'clamp(15px , 8px + 1vw , 23px)',
    padding: '5px',
    '&::placeholder': {
      color: theme.palette.primary.contrastText,
      opacity: '0.8',
    },
  },
}))
