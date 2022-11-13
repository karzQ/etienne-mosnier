import React from "react";
import './part.css'
import { images, filters } from "./config";
const Part = () => {

    const [image, setImage] = React.useState<number | null>(null);
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
        <div className='Part'>
            <div className="leftSide">
                <div className="left">
                    <span className="projectName">Boîte à outils : Revalorisation des territoires</span>
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
                <div className="images">
                    {
                        filteredImages.map((img, id) => {
                            return (
                                <div className="imageContainer" key={id}
                                    onClick={() => console.log(img.target)}
                                    onMouseEnter={() => setImage(val => img.id)}
                                    onMouseLeave={() => setImage(val => null)}>
                                    {
                                        image === img.id && (
                                                <>
                                                    <div className="blackVeil"></div>
                                                    <span className="text">{img.hover}</span>
                                                </>
                                        )
                                    }
                                    <img className="image" src={img.src} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='filters'>
                    <h2>Collections</h2>
                    {
                        filters.map((filter, id) => {
                            return (
                                <span className="filter-container">
                                    <div className={`filter ${(flt && flt === filter) && 'selected'}`}
                                    onClick={() => applyFilter(filter)}
                                        key={id}>{filter}</div>
                                </span>
                            )
                        })
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Part;