import './App.css'

import Gallery from './components/templates/gallery/gallery'
import Header from './components/Header/header'
import Home from './components/templates/home/home'
import Text from './components/templates/text/text'
import reactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {

  const [activePage, setActivePage] = useState('home')

  return (
    <div className="App">
      <Header setActivePage={setActivePage} />
      {activePage == 'home' && (
        <Home />
      )}
      {activePage == 'gallery' && (
        <Gallery />
      )}
      {activePage == 'text' && (
        <Text />
      )}
    </div>
  )
}

export default App
