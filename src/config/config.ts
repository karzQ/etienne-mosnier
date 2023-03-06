import { green, grey, purple } from '@mui/material/colors'

import Gallery from '../components/templates/gallery/gallery'
import Home from '../components/templates/home/home'
import Text from '../components/templates/text/text'
import createTheme from '@mui/material/styles/createTheme'
import pages from '../data/pages.json'

export const baseUrl = 'https://frabjous-pika-33094a.netlify.app'

export const architecture: any = pages
export const baseURL: string = ''
export const templates: any = {
  gallery: Gallery,
  home: Home,
  text: Text
}

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