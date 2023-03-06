import './gallery.css'

import { GalleryComponent, ImageComponent } from '../../../vite-env';

import { Capitalize } from '../../../helpers/functions';
import Image from "../../Image/Image";
import React from "react";

const Gallery = (props: GalleryComponent) => {

    const {title, text, images, filters} = props

    const [hoverImage, setHoverImage] = React.useState<ImageComponent | null>(null);
    const [flt, setFilter] = React.useState<string | null>(null);
    const [filteredImages, setFilteredImages] = React.useState<Array<any>>(images);

    const applyFilter = (filter: string) => {
        if (flt !== filter) {
            const arrFiltered = images.filter((el: any) => {
                return el.tag === filter;
            })
    
            setFilter(val => filter)
            setFilteredImages(val => arrFiltered)
        } else {
            setFilteredImages(val => images)
            setFilter(val => null)
        }
    }

    return (
        <div className='Gallery'>
            <div className="leftSide">
                <div className="left">
                    <span className="projectName">{title}</span>
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

            <div className='rightSide'>
                <div className={`images ${filteredImages.length > 4 ? 'scrollable' : ''}`}>
                    {
                        filteredImages.map((image: ImageComponent, id) => {
                            return (
                                <div key={`${id}-${image.id}`} className="imageContainer"
                                    onClick={() => console.log(image.href)}
                                    onMouseEnter={() => setHoverImage(val => image)}
                                    onMouseLeave={() => setHoverImage(val => null)}>
                                    {
                                        hoverImage && hoverImage.id === image.id && (
                                            <>
                                                <div className="blackVeil"></div>
                                                <span className="text">{image.text}</span>
                                            </>
                                        )
                                    }
                                    <Image src={image.src} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Gallery;