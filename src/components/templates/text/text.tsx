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

    useEffect(() => {
        console.log({props})
    }, [])

    useEffect(() => {
        setActivePage((val: any) => pages[pageNumber])
        console.log({activePage})
    }, [pageNumber])

    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    return (
        <>
            <div className='Text container'>
                <div className="titles">
                    <h1>{activePage.title}</h1>
                    <h4>{activePage.subtitle}</h4>
                </div>

                <div className="main">
                    <div className={pageNumber == 0 ? "left intro" : "left"}>
                        <div className="text">
                            {
                                activePage.texts && activePage.texts.map((text: any) => (
                                    <span className={text.classNames}>{text.text}</span>
                                ))
                            }
                        </div>

                        <div className="stepper">
                            <MobileStepper
                                variant="progress"
                                steps={pages.length}
                                position="static"
                                activeStep={pageNumber}
                                sx={{ width: 500, justifyContent: 'flex-start', gap: 2, paddingLeft: 0}}
                                nextButton={
                                    <Button size="small" onClick={handleNext} disabled={pageNumber === pages.length-1}>
                                        {pageNumber == 0 ?  "Commencer" : "Continuer"}
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={handleBack} disabled={pageNumber === 0}>
                                        Retour
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                    <div className={pageNumber == 0 ? "right intro" : "right"}>
                        <div className='image'>
                            <Image src={activePage.image} dir={id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Text;