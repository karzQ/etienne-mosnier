import './home.css'

import { HomeComponent, ImageComponent, SubtitleComponent } from '../../../vite-env';

import Image from '../../Image/Image';
import {useState} from "react";

const Home = (props: HomeComponent) => {

    const { title, subtitles, images } = props
    const [hoverImage, setHoverImage] = useState<ImageComponent | null>(null);
 
    return (
        <div className='Home'>
            <div className="leftSide animate__animated animate__fadeInLeft">
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

            <div className='rightSide animate__animated animate__fadeInRight'>
                {
                    images && images.length > 0 && images.map((image: ImageComponent, id: number) => (
                        <div key={`${id}-${image.id}`} className="imageContainer" onClick={() => console.log(image.href)}></div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;