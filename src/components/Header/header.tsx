import React from "react";
import './header.css'


const Header = () => {

    const [isShown, setIsShown] = React.useState(false);

    return (
        <div className='header'
            onMouseLeave={() => isShown && setIsShown(val => false)}>
            <img className='cailloux'
                src={`src/assets/img/${isShown ? 'cailloux.gif' : 'cailloux_fixed.png'}`}
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