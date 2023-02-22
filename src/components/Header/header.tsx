import './header.css'
import 'animate.css'

import React, { useEffect } from "react";

import { Capitalize } from '../../helpers/functions';
import { Link } from 'react-router-dom';
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
                    <div className="links">
                        {
                            links && links.length > 0 && links.map((item: any, id: number) => (
                                <>
                                    <Link key={`${id}-${item.id}`} to={`/${item.id}`} onClick={() => setSelectedLink(item.id)}>{Capitalize(item.name)}</Link>
                                    {
                                        id < links.length-1 ? <span className='separator'>|</span> : ''
                                    }
                                </>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Header;