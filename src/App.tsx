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
      <Header key='header' pages={pages} setPage={setPage} />
      <Routes>
        <Route index element={<Home key='home' page={activePage} onChange={(data: any) => setPage(data)} />} />
        <Route path='accueil' element={<Home key='home' page={activePage} onChange={(data: any) => setPage(data)} />} />
        <Route path='epernon' element={<Epernon key='epernon' page={activePage} onChange={(data: any) => nextPage(data)} />} />
        <Route path='patrimonialisation' element={<Patrimo key='patrimonialisation' page={activePage} onChange={(data: any) => nextPage(data)} />} />
        <Route path='boite_a_outils' element={<Tools key='tools' page={activePage} setActivePage={setActivePage} />}/>
        <Route path='journal_des_chantiers' element={<Archive key='archive' page={activePage} setActivePage={setActivePage} />}/>
      </Routes>
      <div className='footer'>
        <span>Etienne Mosnier | emosnier@esad-orleans.fr | DNSEP 2023 | option design | Mention Design des communs | Objets connectés design des données | ÉSAD | École supérieure d’art et de design d’Orléans | www.esadorleans.fr | CC-BY-SA</span>
      </div>
    </div>
  )
}

export default App
