import './home.css'
import 'animate.css'

import React from "react";
import { baseUrl } from "../../../config";
import img_documentation from '../../../assets/img/documentation.png';
import img_epernon from '../../../assets/img/epernon.png';
import img_patrimonialisation from '../../../assets/img/patrimonialisation.png';
import img_toolbox from '../../../assets/img/boite a outils.png';

const Home = () => {
    return (
        <div className='Home'>
            <div className="leftSide animate__animated animate__fadeInLeft">
                <div className="left">
                    <div className="projectName">Projet Personnel DNSEP</div>
                    <div className='spans'>
                        <span>Étienne MOSNIER</span>
                        <span>Design des communs</span>
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
                {/* En haut à gauche */}
                <img src={img_epernon} />
                
                {/* En haut à droite */}
                <img src={img_patrimonialisation} />
                
                {/* En bas à gauche */}
                <img src={img_toolbox} />
                
                {/* En bas à droite */}
                <img src={img_documentation} />
            </div>
        </div>
    )
}

export default Home;