import './text.css'

import { ApplySup, Capitalize } from '../../../helpers/functions'
import { useCallback, useEffect, useState, useReducer } from "react";
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import Image from '../../Image/Image';
import MobileStepper from '@mui/material/MobileStepper';
import { useParams } from 'react-router-dom'

const Text = (props: any) => {
                                
    const navigate = useNavigate()
    const { page, setOpenedCard, close } = props
    const { id, pages, nextPart, } = page
    const [pageNumber, setPageNumber] = useState<number>(id ? +id : 0)
    const [activePage, setActivePage] = useState<any>(pages[pageNumber])

    const handleUserKeyPress = useCallback((event: any) => {
        const { keyCode } = event;
        if (keyCode === 39) {
            handleNext(pageNumber)
        }
        else if (keyCode === 37) {
            handleBack()
        }
    }, []);

    const handleNext = (num: number) => {
        if (num === pages.length - 1 && nextPart) {
            navigate(`/${nextPart.id}`)
            setPageNumber(0)
        } else {
            setPageNumber((val: number) => val < pages.length-1 ? val + 1 : val);
        }
    };

    const handleBack = () => {
        setPageNumber((val: number) => val > 0 ? val - 1 : val);
    };

    const handleTextNextButton = (pageNum: number) => {
        if (pageNum == 0) {
            return 'Commencer'
        } else if (pageNum === pages.length - 1 && nextPart) {
            return 'Passer'
        } else {
            return 'Continuer'
        }
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
            <div className='Text container'>
                <div className="titles">
                    <h1>{activePage.title}</h1>
                    <h4>{activePage.subtitle}</h4>
                </div>

                <div className="main">
                    <div className={pageNumber == 0 && !setOpenedCard ? "left intro" : "left"}>
                        <div className="text">
                            {
                                activePage.texts && activePage.texts.map((text: any) => (
                                    <span className={text.classNames} dangerouslySetInnerHTML={{__html: ApplySup(text.text)}}></span>
                                ))
                            }

                            {
                                !activePage.texts && activePage.text && (
                                    <span dangerouslySetInnerHTML={{__html: ApplySup(activePage.text)}}></span>
                                )
                            }

                            <div className='annotations'>
                                {
                                    activePage.annotations && activePage.annotations.map((annotation: any) => (
                                        <span className="annotation">
                                            <sup>{annotation.annotationNumber}</sup>{annotation.text}
                                        </span>
                                    ))
                                }
                            </div>

                        </div>

                        <div className="stepper">
                            <MobileStepper
                                variant="progress"
                                steps={pages.length}
                                position="static"
                                activeStep={pageNumber}
                                sx={{
                                    display: 'flex', flexDirection: 'row',
                                    width: 500, justifyContent: 'space-between', gap: 2, paddingLeft: 0
                                }}
                                nextButton={
                                    <Button size="small" onClick={() => handleNext(pageNumber)} disabled={pageNumber === pages.length-1 && !nextPart}>
                                        {handleTextNextButton(pageNumber)}
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={() => handleBack()} disabled={pageNumber === 0}>
                                        Retour
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                    <div className={pageNumber == 0 && !setOpenedCard ? "right intro" : "right"}>
                        <div className='image'>
                            <Image online src={activePage.image} dir={id} />
                        </div>
                        <span className="legend">{activePage.legend}</span>
                    </div>
                </div>

                <div className="footer">
                    {
                        close && (
                            <Button onClick={() => setOpenedCard(false)}>Quitter</Button>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Text;