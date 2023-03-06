import './text.css'
import 'animate.css'

import { AnnotationsComponent, SubTextComponent, TextComponent } from '../../../vite-env';
import { ApplySup, SanitizeFilename } from '../../../helpers/functions'
import { useCallback, useEffect, useState } from "react";

import Button from '@mui/material/Button';
import Image from '../../Image/Image';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';

const Text = (props: TextComponent) => {

    const {pageId} = useParams()
    const theme = useTheme();
    const { id, pages } = props
    const [pageNumber, setPageNumber] = useState<number>(pageId ? +pageId : 0)
    const [action, setAction] = useState<string>('init')
    const [activePage, setActivePage] = useState<any>(pages[pageNumber])
    const handleUserKeyPress = useCallback((event: any) => {
        const { keyCode } = event;
        if (keyCode === 39) {
            handleNext()
        }
        else if (keyCode === 37) {
            handleBack()
        }
    }, []);

    const handleNext = () => {
        setPageNumber((val: number) => val < pages.length-1 ? val + 1 : val);
    };

    const handleBack = () => {
        setPageNumber((val: number) => val > 0 ? val - 1 : val);
    };

    const TextsList = (props: {texts: SubTextComponent[]}) => {
        const { texts } = props
        
        const ApplyStyles = (id: number, text: any) => {
            const styles: any = {}

            if (id === 1) {
                styles['fontFamily'] = 'Degular Display Italic'
            }

            return styles
        }

        return (
            <>
                {
                    texts.length > 0 && texts.map((text: SubTextComponent, id: number) => (
                        <span style={ApplyStyles(id, text)} key={`${id}-${text.id}`}
                            className='subtext'
                            dangerouslySetInnerHTML={{ __html: ApplySup(text.text) }}>
                        </span>
                    ))
                }
            </>
        )
    }

    const Annotations = (props: {annotations: AnnotationsComponent[]}) => {
        const {annotations} = props
        const numbered = annotations.filter((item: AnnotationsComponent) => item.isNumbered)
        const rest = annotations.filter((item: AnnotationsComponent) => !item.isNumbered)

        return (
            <>
                <div className="numbered">
                    {
                        numbered && numbered.map((item: AnnotationsComponent, id: number) => (
                            <span key={`${id}-${item.id}`} className='content_annotations'>
                                <sup>{item.annotationNumber}</sup>{item.text}
                            </span>
                        ))
                    }
                </div>

                <div className="not_numbered">
                    {
                        rest && rest.map((item: AnnotationsComponent, id: number) => (
                            <span key={`${id}-${item.id}`} className='content_annotations'>{item.text}</span>
                        ))
                    }
                </div>
            </>
        )
    }

    useEffect(() => {
        console.log({props})
    }, [])

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
                <div className="left">
                    <div className="title"
                        dangerouslySetInnerHTML={{ __html: activePage.title}}></div>

                    <div className="subtitle">
                        {activePage.subtitle}
                    </div>
                </div>

                <div className="middle">
                    <div className={'additional_texts'}>
                        {
                            activePage.annotations && activePage.annotations.length > 0 && <Annotations annotations={activePage.annotations} />
                        }
                    </div>

                    {
                        activePage?.text && (
                            <span className={'text'}
                                dangerouslySetInnerHTML={{ __html: ApplySup(activePage?.text) }}></span>
                        )
                    }

                    <div className="texts_container">
                        {
                            activePage?.texts && <TextsList texts={activePage?.texts} />
                        }
                    </div>
                </div>

                <div className='right'>
                    
                </div>
            </div>

            <div className="stepper">
                <MobileStepper
                    variant="progress"
                    steps={pages.length}
                    position="static"
                    activeStep={pageNumber}
                    sx={{ maxWidth: 500, flexGrow: 1 }}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={pageNumber === pages.length-1}>
                            {pageNumber == 0 ?  "Commencer" : "Continuer"}
                            {/* {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )} */}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={pageNumber === 0}>
                            {/* {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )} */}
                            {pageNumber == 0 ?  "" : "Retour"}
                        </Button>
                    }
                />
            </div>
        </>
    )
}

export default Text;