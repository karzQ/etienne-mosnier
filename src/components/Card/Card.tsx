import './Card.css'

import Image from '../Image/Image';
import React from 'react'

const Card = (props: any) => {
    const { _id, subtitle, image } = props;
    return (
        <div className='Card'>
            <Image src={image} />
            {
                _id && <span key={`${_id}`}>{subtitle}</span>
            }
        </div>
    )
}

export default Card;