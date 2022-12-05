import './header.css'

import React from "react";
import { baseUrl } from "../../config";
import cailloux_gif from '../../assets/img/cailloux.gif'
import cailloux_static from '../../assets/img/cailloux_fixed.png'

const Header = () => {

    const [isShown, setIsShown] = React.useState(false);

    return (
        <div className='header'
            onMouseLeave={() => isShown && setIsShown(val => false)}>
            <img className='cailloux'
                src={isShown ? cailloux_gif : cailloux_static}
                onMouseOver={() => setIsShown(val => true)} />

            {
                isShown && (
                    <div className="links">
                        <a href="#">Epernon</a>
                        <a href="#">Patrimonialisation</a>
                        <a href="#">Boîte à outils</a>
                        <a href="#">Documentation</a>
                    </div>
                )
            }
        </div>
    )
}

export default Header;