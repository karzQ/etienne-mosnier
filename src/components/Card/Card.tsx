import './Card.css'

import Image from '../Image/Image';
import React from 'react'

const Card = (props: any) => {
    const { page, setOpenedCard, setSelectedCard } = props;
    const { _id, subtitle, image } = page
    const [isShown, setIsShown] = React.useState<boolean>(false)
    
    const handleOpenCard = () => {
        setSelectedCard((v: any) => page)
        setOpenedCard(true)
    }
    
    return (
        <div className='Card'
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            onClick={() => handleOpenCard()}>
            <Image online src={image} />
            <div style={{display: !isShown ? 'none': 'inherit'}} className='card-background'>
                <h2 className='card-title'>
                    {page.title}
                </h2>
            </div>
        </div>
    )
}

export default Card;