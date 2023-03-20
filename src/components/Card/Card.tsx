import './Card.css'

import Image from '../Image/Image';
import React from 'react'

const Card = (props: any) => {
    const { page, setOpenedCard, setSelectedCard } = props;
    const {_id, subtitle, image } = page
    
    const handleOpenCard = () => {
        setSelectedCard((v: any) => page)
        setOpenedCard(true)
    }
    
    return (
        <div className='Card' onClick={() => handleOpenCard()}>
            <Image online src={image} />
            {
                _id && <span key={`${_id}`}>{subtitle}</span>
            }
        </div>
    )
}

export default Card;