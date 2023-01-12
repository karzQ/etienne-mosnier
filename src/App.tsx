import './App.css'

import Header from './components/Header/header'
import { useState, useEffect } from 'react'
import { architecture, templates } from './config'

const App = () => {

  const pages = architecture.pages
  const [selectedLink, setSelectedLink] = useState(null)
  const [activePage, setActivePage] = useState<any | null>(null)

  const DynamicComponent = (props: any) => {
    const Component = templates[props.template]
    return <Component />
  }

  useEffect(() => {
    if (activePage && activePage.id !== selectedLink) {
      setActivePage((val: any | null) => pages.filter((item: any) => item.id === selectedLink)[0])
    }
  }, [selectedLink])

  return (
    <div className="App">
      <Header links={pages} setSelectedLink={setSelectedLink} />
      {
        activePage && <DynamicComponent {...activePage} />
      }
    </div>
  )
}

export default App
