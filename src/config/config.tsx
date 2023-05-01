import { createBrowserRouter } from 'react-router-dom';
import { green, grey, purple } from '@mui/material/colors'
import createTheme from '@mui/material/styles/createTheme'
import pages from '../data/pages.json'

export const baseUrl = 'https://frabjous-pika-33094a.netlify.app'
export const architecture: any = pages
export const theme = createTheme({
    palette: {
      primary: {
        main: grey[900],
      },
      secondary: {
        main: green[500],
      },
    },
});

export interface Login {
  login?: string
  password?: string
}