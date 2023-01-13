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
                    <span>Eratusam enitioritius seque ne cuptatium quidelis 
                        num int ullatum res idenien imagnia ne sapeditaque 
                        offic tem qui volectem ipsaped itatio omnimpore 
                        ventiat emporepra comnitatur, que numquias quaessi mporess equatur? Feris molestor sapedi voluptium 
                        faccum, qui dolorum simincta doluptas dendae. Nequia dit erume nobis et arumquas magniendi tem 
                        rem et fugiti ut quia voleste lam es ent la que nam eos 
                        quiandi dolo exero blautem aspiciet pro doluptatem 
                        etur sed magnia dest mollam iusdae nis sumqui officimaiore sunt volum exped ma soluptas verchil exeris 
                        quos explatist andae quos aut eat accab invelig enihit 
                        verio. Eceperi dolo conseque nullaci dolorit et et et 
                        voluptas veribusame cum sin nihictur, ut laccae vidis 
                        pro ducipis vid moluptium, untibusande dolupta eribus.
                        Me volo ma dunt veremodit eiusame eveles et et volestrum escientis nem archil modio quis quost, is eturiscia ipsam andi nihicipsum quam, con pa solorit quam 
                        vero dolor sequo quam et que nest officabo. Ommolestiur ab id quameni hiliqui assequam fuga. Et omnis 
                        sunt vollorehenem samusci llorit, omnime odiosanit, 
                        optatur?
                        Optus ditium cus nonsed mossitiorem. Nequi dest, si-
                    </span>
                </div>
            </div>

            <div className='rightSide animate__animated animate__fadeInRight'>
                {
                    images && images.length > 0 && images.map((image: ImageComponent, id: number) => (
                        <div key={`${id}-${image.id}`} className="imageContainer"
                            onClick={() => console.log(image.href)}
                            onMouseEnter={() => setHoverImage(val => image)}
                            onMouseLeave={() => setHoverImage(val => null)}>
                            {
                                hoverImage && hoverImage.id === image.id && (
                                    <>
                                        <div className="blackVeil"></div>
                                        <span className="text animate__animated animate__fadeInUp animate__faster">{image.text}</span>
                                    </>
                                )
                            }
                            <Image src={image.src} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;