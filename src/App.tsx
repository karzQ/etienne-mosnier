import React, { useEffect, useState } from 'react'
import './App.css'

import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import { architecture } from './config/config'

import Header from './components/Header/header'
import Home from './components/templates/home/home';
import Text from './components/templates/text/text';
import Epernon from './components/templates/epernon/epernon';
import Patrimo from './components/templates/patrimo/patrimo';
import Tools from './components/templates/tools/tools';
import Archive from './components/templates/archive/archive';


const App = () => {
  const location = useLocation()
  const [pages] = useState(architecture.pages);
  const [activePage, setActivePage] = useState<any>(pages.filter((page:any) => page.id === 'accueil')[0]);

  const nextPage = (pageName: string) => {
    setActivePage((val: any) => pages.filter((page: any) => {
      if (page?.nextPart) {
        console.log({ next: page.nextPart, pageName })
        return page.nextPart.id === pageName
      }
    } )[0])
  }

  const setPage = (pageName: string) => {
    setActivePage((val: any) => pages.filter((page:any) => page.id === pageName)[0])
  }

  useEffect(() => {
    setActivePage((val: any) => pages.filter((page:any) => location.pathname.includes(page.id))[0])
  }, [])

  useEffect(() => {
    if (location.pathname !== activePage.id) {
      if (location.pathname === '' || location.pathname === '/') {
        setActivePage((val: any) => pages.filter((page:any) => page.id === 'accueil')[0])
      } else {
        setActivePage((val: any) => pages.filter((page: any) => location.pathname.includes(page.id))[0])
      }
    }
  }, [location])

  return (
    <div className="App">
      <Header pages={pages} setPage={setPage} />
      <Routes>
        <Route index element={<Home page={activePage} onChange={(data: any) => setPage(data)} />} />
        <Route path='accueil' element={<Home page={activePage} onChange={(data: any) => setPage(data)} />} />
        <Route path='epernon' element={<Epernon page={activePage} onChange={(data: any) => nextPage(data)} />} />
        <Route path='patrimonialisation' element={<Patrimo page={activePage} onChange={(data: any) => nextPage(data)} />} />
        <Route path='boite_a_outils' element={<Tools page={activePage} setActivePage={setActivePage} />}>
          <Route path=':cardId' element={<Text page={activePage} />} />
        </Route>
        <Route path='archivage' element={<Archive page={activePage} setActivePage={setActivePage} />}>
          <Route path=':cardId' element={<Text page={activePage} />} />
        </Route>
      </Routes>
      <div className='footer'>
        <span>Etienne Mosnier | DNSEP 2023 | option design | Mention Design des communs | Objets connectés design des données | ÉSAD | École supérieure d’art et de design d’Orléans | www.esadorleans.fr | CC-BY-SA</span>
      </div>
    </div>
  )
}

export default App
