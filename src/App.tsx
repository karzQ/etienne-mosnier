import './App.css'

import Gallery from './components/templates/gallery/gallery'
import Header from './components/Header/header'
import Home from './components/templates/home/home'
import Text from './components/templates/text/text'
import reactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {

  return (
    <div className="App">
      <Header />
      {/* <Home /> */}
      {/* <Gallery /> */}
      <Text />
    </div>
  )
}

export default App
