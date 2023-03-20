import './header.css'

import React, { useEffect } from "react";

import { Capitalize } from '../../helpers/functions';
import { Link } from 'react-router-dom';
import cailloux_gif from '../../assets/img/cailloux.gif'
import cailloux_static from '../../assets/img/cailloux_fixed.png'

const Header = (props: any) => {
    const {pages, setPage} = props
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
                            pages && pages.length > 0 && pages.map((page: any, id: number) => (
                                <React.Fragment key={`${id}-${page.id}`}>
                                    <Link to={`/${page.id}`} onClick={() => setPage(page.id)}>{Capitalize(page.name)}</Link>
                                    {
                                        id < pages.length-1 ? <span className='separator'>|</span> : ''
                                    }
                                </React.Fragment>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Header;