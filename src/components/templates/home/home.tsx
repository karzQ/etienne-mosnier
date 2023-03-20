import './home.css'

import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';

const Home = (props: any) => {

    const navigate = useNavigate()
    const { t, i18n } = useTranslation();
    const { page, onChange } = props
    const { title, subtitle, links  } = page;
    const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language)

    const handleSelectedLanguage = (language: string) => {
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
                            links && links.length > 0 && links.map((link: any, id: number) => {
                                return (
                                    <Link key={`${id}-${link.id}`} to={`/${link.src}`} onClick={() => onChange(link.src)} className='link'>
                                        <span>0{id + 1} | {link.text}</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='right text'>
                    <span>{t('abstract')}</span>
                </div>
            </div>
            <span className='i18n'>
                <div className={selectedLanguage == 'fr' ? 'i18nButtons selected' : 'i18nButtons'} onClick={() => handleSelectedLanguage('fr')}>FR</div>
                |
                <div className={selectedLanguage == 'en' ? 'i18nButtons selected' : 'i18nButtons'} onClick={() => handleSelectedLanguage('en')}>EN</div>
            </span>
        </div>
    )
}

export default Home;