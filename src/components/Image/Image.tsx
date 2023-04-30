import './Image.css'
import React, { Suspense, useEffect, useState } from "react";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { IconButton } from '@mui/material';

const Image = (props: any) => {
    const {src, dir, online, zoomable} = props
    const [imagePath, setImagePath] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [isHovered, setIsHoverd] = useState(false);

    useEffect(() => {
        if (dir && !online) {
            (async () => {
                let path: any = null
                if (dir) {
                    path = await import(`../../assets/img/${dir}/${src}.jpg`);
                } else {
                    path = await import(`../../assets/img/${src}.jpg`);
                }
                setImagePath(path.default);
            })();
        }
    }, [src])

    return (
        <Suspense fallback='Loading..'>
            <div className='image-container' onMouseLeave={() => setIsHoverd(false)} onMouseEnter={() => setIsHoverd(true)} >
                <img className="image" src={online ? src : imagePath} />
                {
                    zoomable && isHovered && (
                        <IconButton className={'expand-button'} onClick={() => setIsClicked(true)}>
                            <OpenInFullIcon sx={{fill: 'black'}} fontSize='medium' />
                        </IconButton>
                    )
                }
            </div>
            {
                zoomable && isClicked && (
                    <>
                        <div className="background" onClick={() => setIsClicked(prev => false)}>
                            <img className="image zoomed" src={online ? src : imagePath} />
                        </div>
                    </>
                )
            }
        </Suspense>
    )
}

export default Image;