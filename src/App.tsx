import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './components/templates/home/home'
import Part from './components/templates/part/part'
import Header from './components/Header/header'

const App = () => {

  return (
    <div className="App">
      <Header />
      {/* <Home /> */}
      <Part />
    </div>
  )
}

export default App
