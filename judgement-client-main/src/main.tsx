import React from 'react'
import ReactDOM from 'react-dom/client'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@Themes/theme'
import { store } from '@Stores/index'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarCloseButton } from '@Components/Snackbars'
import { AppSocket } from '@Containers/AppSocket'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SnackbarProvider
            classes={{ root: 'snackbarRoot', anchorOriginBottomRight: 'snackbarBottomRight' }}
            action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
            disableWindowBlurListener
          >
            <CssBaseline />
            <AppSocket>
              <App />
            </AppSocket>
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
