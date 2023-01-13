import './App.css'

import { architecture, templates } from './config'
import { useEffect, useState } from 'react'

import Header from './components/Header/header'

const App = () => {

  const [pages] = useState(architecture.pages)
  const [selectedLink, setSelectedLink] = useState(null)
  const [activePage, setActivePage] = useState<any>(pages.filter((page:any) => page.id === 'accueil')[0])

  const DynamicComponent = (props: any) => {
    const Component = templates[props.template]
    return <Component {...props} />
  }

  useEffect(() => {
    if (selectedLink && activePage && activePage.id !== selectedLink) {
      setActivePage((val: any) => pages.filter((item: any) => item.id === selectedLink)[0])
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
