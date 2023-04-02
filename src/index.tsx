import './index.css'

import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import Preloader from './components/Preloader'
import reportWebVitals from './reportWebVitals'

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: 'Orbitron, sans-serif'
  }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<Preloader />}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={createTheme(themeOptions)}>
              <App />
            </ThemeProvider>
          </LocalizationProvider>
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
