import './text.css'
import 'animate.css'

import React from "react";
import { baseUrl } from "../../../config";
import img_documentation from '../../../assets/img/documentation.png';
import img_epernon from '../../../assets/img/epernon.png';
import img_patrimonialisation from '../../../assets/img/patrimonialisation.png';
import img_toolbox from '../../../assets/img/boite a outils.png';

const Text = () => {
    return (
        <div className='Text'>
            <div className="left animate__animated animate__fadeInLeft">
                <div className="title">
                    Patrimonialisation des techniques
                </div>
                <div className='subtitle'>
                    This is a subtitle
                </div>
            </div>

            <div className="middle">
                <div className='additional_texts animate__animated  animate__fadeInUp animate__delay-1s'>
                    <span className='content_annotations'>4. Hicham Saddou, “Patrimoine et patrimonialisation : Processus et nouvel enjeu de valorisation territoriale.”, O Ideário Patrimonial, 2020.</span>
                    <span>Guy Di Méo, “Processus de patrimonialisation et construction des territoires”, Colloque ”Patrimoine et industrie en Poitou-Charentes : connaître pour valoriser”, septembre 2007, p. 87-109.</span>
                    <span>Etienne Berthold, Mathieu Dormaels, Josée Laplace (dirs.), “Patrimoine et sacralisation”, Éditions Multimondes, Montréal, 2008</span>
                    <span>Madina Regnault, Olivier Givre (dirs.), “Patrimonialisations croisées”, Presses universitaires de Lyon, Lyon, 2015.</span>
                </div>
                <span className='text animate__animated  animate__fadeInDown animate__delay-1s'>On peut donc constater l'existence d'un certain désintérêt du public pour ces questions de patrimoine. À quoi peut-on attribuer cela ? Une première hypothèse émerge : le manque de transversalité dans les processus de patrimonialisation. En effet, comme vu précédemment, le patrimoine se voit installer au sein d’un lieu d’exposition, pour donner à voir, mais pas forcément pour être vécu. En effet, pour se projeter dans une histoire patrimoniale, les éléments qui la constituent doivent faire partie du milieu, cela offre la possibilité d’une interaction entre le territoire et l’usager. Par exemple, les villes historiques ont un enjeu urbain de la patrimonialisation, elles cherchent à donner à leurs habitants, et aux visiteurs une lecture de leur patrimoine au travers d’édifices architecturaux, monuments… Toutes sortes d’éléments distinctifs qui permettent de mettre en valeur ce patrimoine au sein du territoire. Mais cela peut mener à une forme de sacralisation de celui-ci, et notamment une « sacralisation des objets patrimoniaux ». Cela découle d’une volonté qui consiste à placer une certaine spiritualité dans ce qui fait patrimoine, afin de projeter le sens de ces éléments de l’espace réel, à l’espace imaginé. On peut imaginer qu’un tel processus peut permettre à chacun de s’approprier un patrimoine qui lui est propre, et ainsi d’être en mesure de se positionner par rapport à ce dernier. Cependant, un tel phénomène vient figer ce qui fait patrimoine, tant sur le plan temporel, que spatial. En effet, cette action de sacraliser provoque une perte de droit sur ces éléments, car il ne serait plus personnifié, moins tangible. Cette sacralisation d’un patrimoine dépend également d’une volonté politique de valorisation touristique. Créer des marqueurs d’unicité, pour créer de l’attractivité, et ainsi instaurer un marché économique sur ces « objets de patrimoines ». Les différents protocoles mis en place pour une patrimonialisation, peuvent être contestables, car ils revêtent, le plus souvent, d’un intérêt de politique urbaine et touristique, plutôt que d’une volonté de transmission d’une culture. Cependant l’idée de transmission n’est-elle pas centrale dans cette notion de patrimoine ? Ne doit-on pas transmettre pour préserver, sauvegarder ce qui fait patrimoine ?
                </span>
            </div>

            <div className='right animate__animated  animate__fadeInRight'>
                <div className='image_container'>
                    <img src={img_epernon} />
                    <span className='image_title'>This is a title (example) - MOSNIER Etienne.</span>
                </div>
            </div>
        </div>
    )
}

export default Text;