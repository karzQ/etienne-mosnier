import './header.css'
import 'animate.css'

import React from "react";
import { baseUrl } from "../../config";
import cailloux_gif from '../../assets/img/cailloux.gif'
import cailloux_static from '../../assets/img/cailloux_fixed.png'

const Header = (props: any) => {
    const {setActivePage} = props
    const [isShown, setIsShown] = React.useState(false);

    

    return (
        <div className='header'
            onMouseLeave={() => isShown && setIsShown(val => false)}>
            <img className='cailloux'
                src={isShown ? cailloux_gif : cailloux_static}
                onMouseOver={() => setIsShown(val => true)} />

            {
                isShown && (
                    <div className="links animate__animated animate__fadeInRight animate__faster">
                        <a href="#" onClick={() => setActivePage('home')}>Accueil</a>
                        <a href="#" onClick={() => setActivePage('text')}>Epernon</a>
                        <a href="#" onClick={() => setActivePage('text')}>Patrimonialisation</a>
                        <a href="#" onClick={() => setActivePage('gallery')}>Boîte à outils</a>
                        <a href="#">Documentation</a>
                    </div>
                )
            }
        </div>
    )
}

export default Header;