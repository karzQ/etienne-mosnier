import './text.css'
import 'animate.css'

import { AnnotationsComponent, PageComponent, SubTextComponent, TextComponent } from '../../../vite-env';
import { createTheme, useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from "react";

import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';

const Text = (props: TextComponent) => {

    const theme = useTheme();
    const { title, pages, annotations } = props
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [activePage, setActivePage] = useState<any>(pages[pageNumber])
    const handleUserKeyPress = useCallback((event: any) => {
        const { keyCode } = event;
        if(keyCode === 39){
            setPageNumber((val: number) => val < pages.length-1 ? val + 1 : val);
        }
        else if(keyCode === 37 ){
            setPageNumber((val: number) => val > 0 ? val - 1 : val);
        }
    }, []);

    const handleNext = () => {
        setPageNumber((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setPageNumber((prevActiveStep) => prevActiveStep - 1);
      };

    const TextsList = (props: any) => {
        const {texts} = props
        return (
            <div className="texts_container  animate__animated  animate__fadeInDown  animate__delay-1s">
                {
                    texts.length > 0 && texts.map((text: SubTextComponent, id: number) => (
                        <span key={`${id}-${text.id}`}
                            className='subtext'
                            style={text.font ? {'fontFamily': text.font} : {}} >
                            {text.text}
                        </span>
                    ))
                }
            </div>
        )
    }

    useEffect(() => {
        setActivePage((val: any) => pages[pageNumber])
    }, [pageNumber])

    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    return (
        <>
            <div className='Text'>
                <div className="left animate__animated animate__fadeInLeft">
                    <div className="title">
                        {title}
                    </div>

                    <div className="subtitle">
                        {activePage.subtitle}
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
                        activePage?.text && (
                            <span className='text animate__animated  animate__fadeInDown animate__delay-1s'>{activePage?.text}</span>
                        )
                    }

                    {
                        activePage?.texts && <TextsList texts={activePage?.texts} />
                    }
                </div>

                <div className='right animate__animated  animate__fadeInRight'>
                    <div className='image_container'>
                        <img src={`/src/assets/img/${activePage.image.src}`} />
                        {
                            activePage.image.legend && <span className='image_title'>{activePage.image.legend}</span>
                        }
                    </div>
                </div>
            </div>

            <div className="stepper animate__animated  animate__fadeInUp">
                <MobileStepper
                    variant="progress"
                    steps={pages.length}
                    position="static"
                    activeStep={pageNumber}
                    sx={{ maxWidth: 500, flexGrow: 1 }}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={pageNumber === pages.length-1}>
                        Continuer
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={pageNumber === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Retour
                        </Button>
                    }
                />
            </div>
        </>
    )
}

export default Text;