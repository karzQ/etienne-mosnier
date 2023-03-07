import './home.css'

import { HomeComponent, LinkComponent } from '../../../vite-env';

import { Link } from 'react-router-dom';
import React from 'react';
import { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';

const Home = (props: HomeComponent) => {

    const { t, i18n } = useTranslation();
    const { title, subtitle, links, setSelectedLink } = props;

    const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language)

    const handleSelectedLanguage = (language: string) => {
        console.log({i18n})
        console.log({language})
        setSelectedLanguage(value => language)
    }

    React.useEffect(() => {
        changeLanguage(selectedLanguage)
    }, [selectedLanguage])

    return (
        <div className='Home container'>
            <div className='titles'>
                <h1>{title}</h1>
                <h4>{subtitle}</h4>
            </div>
            <div className='main'>
                <div className="left">
                    <div className='categories'>
                        {
                            links && links.length > 0 && links.map((link: LinkComponent, id: number) => (
                                <Link key={`${id}-${link.id}`} to={`/${link.src}`} className='link' onClick={() => setSelectedLink(link.src)}>
                                    <span>0{id+1} |<br></br>{link.text}</span>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className='right text'>
                    <span>{t('abstract')}</span>
                </div>
            </div>
            {/* <span>Etienne Mosnier | DNSEP 2023 | option design | Mention Design des communs | Objets connectés design des données | ÉSAD | École supérieure d’art et de design d’Orléans | www.esadorleans.fr</span> */}
            <span className='i18n'>
                <div className={selectedLanguage == 'fr' ? 'i18nButtons selected' : 'i18nButtons'} onClick={() => handleSelectedLanguage('fr')}>FR</div>
                |
                <div className={selectedLanguage == 'en' ? 'i18nButtons selected' : 'i18nButtons'} onClick={() => handleSelectedLanguage('en')}>EN</div>
            </span>
        </div>
    )
}

export default Home;