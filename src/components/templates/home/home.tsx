import './home.css'

import { HomeComponent, LinkComponent } from '../../../vite-env';

import React from 'react';
import { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';

const Home = (props: HomeComponent) => {

    const { t } = useTranslation();
    const { title, subtitle, links } = props;

    return (
        <div className='Home'>
            <div className='titles'>
                <h1>{title}</h1>
                <h4>{subtitle}</h4>
            </div>
            <div className='main'>
                <div className="leftSide">
                    <div className='categories'>
                        {
                            links && links.length > 0 && links.map((link: LinkComponent, id: number) => (
                                <div key={`${id}-${link.id}`} className='subtitle'>
                                    <span>0{id+1} |</span>
                                    <span>{link.text}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='rightSide'>
                    <span>{t('abstract')}</span>
                </div>
            </div>
            <div className='footer'>
                <span>Etienne Mosnier | DNSEP 2023 | option design | Mention Design des communs | Objets connectés design des données | ÉSAD | École supérieure d’art et de design d’Orléans | www.esadorleans.fr</span>
                <span className='i18n'>
                    <div className='i18nButtons' onClick={() => changeLanguage('fr')}>FR</div>
                    |
                    <div className='i18nButtons' onClick={() => changeLanguage('en')}>EN</div>
                </span>
            </div>
        </div>
    )
}

export default Home;