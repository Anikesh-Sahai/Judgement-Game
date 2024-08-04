import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#cc0d00',
      light: '#ee0f00',
      dark: '#aa0b00',
      contrastText: '#fff',
    },
    secondary: {
      main: '#3985f9',
      light: '#5a99fa',
      contrastText: '#3c3c3c',
    },
    error: {
      main: '#aa0b00',
      contrastText: '#FF5F5F',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#171e31',
      paper: '#080714',
    },
  },
  typography: {
    fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#222',
        },
      },
    },
  },
})

export default theme
