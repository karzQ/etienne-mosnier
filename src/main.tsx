import './index.css'
import "./config/i18n";

import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from './config/config'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
)
