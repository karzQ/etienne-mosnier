import './text.css'
import 'animate.css'

import { AnnotationsComponent, SubTextComponent, TextComponent } from '../../../vite-env';

import { useState } from "react";

const Text = (props: TextComponent) => {

    const { title, subtitle, images, pages, annotations } = props
    const [pageNumber, setPageNumber] = useState<number>(0)

    return (
        <div className='Text'>
            <div className="left animate__animated animate__fadeInLeft">
                <div className="title">
                    {title}
                </div>
                <div className='subtitle'>
                    {subtitle}
                </div>
            </div>

            <div className="middle">
                <div className='additional_texts animate__animated  animate__fadeInUp animate__delay-1s'>
                    {
                        annotations && annotations.length > 0 && annotations.map((item: AnnotationsComponent, id: number) => (
                            <span key={`${id}-${item.id}`} className='content_annotations'>{item.text}</span>
                        ))
                    }
                </div>
                {
                    pages[pageNumber]?.text && (
                        <span className='text animate__animated  animate__fadeInDown animate__delay-1s'>{pages[pageNumber].text}</span>
                    )
                }

                {
                    pages[pageNumber]?.texts && pages[pageNumber].texts?.map((text: SubTextComponent, id: number) => (
                        <span key={`${id}-${text.id}`} className='text animate__animated  animate__fadeInDown animate__delay-1s'
                            style={text.font ? {'fontFamily': text.font} : {}} >
                            {text.text}
                        </span>
                    ))
                }
            </div>

            <div className='right animate__animated  animate__fadeInRight'>
                <div className='image_container'>
                    <img src={images[pageNumber].src} />
                    {
                        images[pageNumber]?.text && <span className='image_title'>{images[pageNumber].text}</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Text;