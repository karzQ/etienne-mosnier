import './App.css'

import { Navigate, Route, BrowserRouter as Router, Routes, redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { architecture, templates } from './config/config'

import Header from './components/Header/header'
import credits from './credits'

const App = () => {

  const [pages] = useState(architecture.pages)
  const [selectedLink, setSelectedLink] = useState(null)
  const [activePage, setActivePage] = useState<any>(pages.filter((page:any) => page.id === 'accueil')[0])

  const DynamicComponent = (props: any) => {

    console.log({props})

    const Component = templates[props.template]
    return (
      <Component {...props} />
    )
  }

  const CustomRoute = (props: any) => {
    console.log({props})
    return (
      <Routes>
        <Route path={`/${activePage.id}`} element={activePage ? <DynamicComponent {...props} /> : <ErrorPage />} />
        <Route path='/' element={activePage ? <Navigate to={`/${activePage.id}`}/>  : <ErrorPage />} />
      </Routes>
    )
  }

  const ErrorPage = (props: any) => {
    return (
      <div>
        An error has occured
      </div>
    )
  }

  useEffect(() => {
    console.log(credits)
    console.log(selectedLink)
  }, [])

  useEffect(() => {
    if (selectedLink && activePage && activePage.id !== selectedLink) {
      setActivePage((val: any) => pages.filter((item: any) => item.id === selectedLink)[0])
    }
  }, [selectedLink])

  return (
    <div className="App">
      <Router>
        <Header links={pages} setSelectedLink={setSelectedLink} />
        <CustomRoute {...activePage} setSelectedLink={setSelectedLink} />
        <div className='footer'>
          <span>Etienne Mosnier | DNSEP 2023 | option design | Mention Design des communs | Objets connectés design des données | ÉSAD | École supérieure d’art et de design d’Orléans | www.esadorleans.fr</span>
        </div>
                
      </Router>
    </div>
  )
}

export default App
