import './gallery.css'

import { GalleryComponent, ImageComponent } from '../../../vite-env';

import { Capitalize } from '../../../helpers/functions';
import Image from "../../Image/Image";
import React from "react";

const Gallery = (props: GalleryComponent) => {

    const {title, text, images} = props

    const [hoverImage, setHoverImage] = React.useState<ImageComponent | null>(null);
    const [flt, setFilter] = React.useState<string | null>(null);
    const [filteredImages, setFilteredImages] = React.useState<Array<any>>(images);

    return (
        <div className='Gallery'>
            <div className="leftSide">
                <div className="left">
                    <span className="projectName">{title}</span>
                </div>
                <div className="right">
                    <span>{text}</span>
                </div>
            </div>

            <div className='rightSide'>
                <div className="">
                    
                </div>
            </div>
        </div>
    )
}

export default Gallery;