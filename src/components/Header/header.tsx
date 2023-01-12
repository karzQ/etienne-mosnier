import './header.css'
import 'animate.css'

import React, { useEffect } from "react";

import { Capitalize } from '../../helpers/functions';
import cailloux_gif from '../../assets/img/cailloux.gif'
import cailloux_static from '../../assets/img/cailloux_fixed.png'

const Header = (props: any) => {
    const {links, setSelectedLink} = props
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
                        {
                            links && links.length > 0 && links.map((item: any, id: number) => (
                                <a key={`${id}-${item.id}`} href="#" onClick={() => setSelectedLink(item.id)}>{Capitalize(item.name)}</a>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Header;