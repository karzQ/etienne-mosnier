import './text.css'

import { ApplySup, Capitalize } from '../../../helpers/functions'
import { useCallback, useEffect, useState, useReducer } from "react";
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import Image from '../../Image/Image';
import MobileStepper from '@mui/material/MobileStepper';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography/Typography';
import Modal from '@mui/material/Modal/Modal';
import Box from '@mui/material/Box/Box';
import { deleteCard } from '../../../config/firebase';

const boxValidationStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bgcolor: 'background.paper',
    boxShadow: 12,
    p: 4,
};

const Text = (props: any) => {
                                
    const navigate = useNavigate()
    const { page, setOpenedCard, close, onChange } = props
    const { id, pages, nextPart } = page
    const [pageNumber, setPageNumber] = useState<number>(id ? +id : 0)
    const [activePage, setActivePage] = useState<any>(pages[pageNumber])
    const [openValidation, setOpenValidation] = useState<boolean>(false)
    const user = useSelector((state: any) => state.user)

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

    const handleDeleteCard = async () => {
        await deleteCard(activePage._id)
        setOpenedCard(false)
        setOpenValidation(false)
        onChange(activePage._id)
    }
    
    const handleOpenValidation = () => {
        setOpenValidation(true)
    }

    const handleCloseValidation = () => {
        setOpenValidation(false)
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
                    <div className="left">
                        <h1>{activePage.title}</h1>
                        <h4>{activePage.subtitle}</h4>
                    </div>

                    <div className="right">
                        {
                            user && (
                                <div className='connected-buttons'>
                                    <Button onClick={handleOpenValidation}>Supprimer</Button>
                                </div>
                            )
                        }
                        
                    </div>
                </div>
                

                <div className="main">
                    <div className={pageNumber == 0 && !setOpenedCard ? "left intro" : "left"}>
                        <div className="text">
                            {
                                activePage.texts && activePage.texts.map((text: any, index: number) => (
                                    <span key={index} className={text.classNames} dangerouslySetInnerHTML={{__html: ApplySup(text.text)}}></span>
                                ))
                            }

                            {
                                !activePage.texts && activePage.text && (
                                    <span dangerouslySetInnerHTML={{__html: ApplySup(activePage.text)}}></span>
                                )
                            }

                            {
                                activePage?.annotations && (
                                    <div className='annotations'>
                                        {
                                            activePage?.annotations.map((annotation: any) => (
                                                <span className="annotation">
                                                    {
                                                        annotation.annotationNumber
                                                        ? <><sup>{annotation.annotationNumber}</sup>{annotation.text}</>
                                                        : <>{annotation.text}</>
                                                    }
                                                </span>
                                            ))
                                        }
                                    </div>
                                )
                            }

                            {
                                activePage?.references && (
                                    <span>{activePage?.references}</span>
                                )
                            }

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
                            <Image online src={activePage.image} zoomable dir={id} />
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

            <Modal open={openValidation} onClose={handleCloseValidation}>
                <Box sx={boxValidationStyle}>
                    <Typography sx={{marginBottom: 3}} className='typo-title' id="modal-title" variant="h4">
                        Supprimer l'article
                    </Typography>

                    <Typography sx={{color: "black", marginBottom: 1}}>
                        Êtes-vous sûr de vouloir supprimer cet article ? 
                    </Typography>

                    <div>
                        <Button id="modal-modal-title"
                            sx={{ mt: 2 }}
                            onClick={handleCloseValidation}>Non</Button>
                        
                        <Button id="modal-modal-description"
                            sx={{ mt: 2 }}
                            onClick={() => handleDeleteCard()}>Oui</Button>
                    </div>
                </Box>
            </Modal>
</>
    )
}

export default Text;