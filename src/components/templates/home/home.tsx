import './home.css'

import { HomeComponent, ImageComponent, SubtitleComponent } from '../../../vite-env';

import Image from '../../Image/Image';
import { changeLanguage } from 'i18next';
import {useState} from "react";

const Home = (props: HomeComponent) => {

    const { title, subtitles, images } = props
    const [hoverImage, setHoverImage] = useState<ImageComponent | null>(null);
 
    return (
        <div className='Home'>
            <div className='main'>
                <div className="leftSide">
                    <div className="left">
                        <div className="projectName">{title}</div>
                        <div className='subtitles'>
                            {
                                subtitles && subtitles.length > 0 && subtitles.map((subtitle: SubtitleComponent, id: number) => (
                                    <span key={`${id}-${subtitle.id}`} className='subtitle'>{subtitle.text}</span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="right">
                        <span></span>
                    </div>
                </div>

                <div className='rightSide'>
                    {
                        images && images.length > 0 && images.map((image: ImageComponent, id: number) => (
                            <div key={`${id}-${image.id}`} className="imageContainer" onClick={() => console.log(image.href)}></div>
                        ))
                    }
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