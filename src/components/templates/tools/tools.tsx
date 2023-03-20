import './tools.css'

import { getCards, addCard } from '../../../config/firebase'

import { Box, Button, Modal, Typography } from '@mui/material';

import Card from '../../Card/Card'
import React from "react";
import Text from '../text/text'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Tools = (props: any) => {

    const { page } = props
    const { title, text, id } = page
    const type = id
    
    const [pages, setPages] = React.useState<any[]>([]);
    const [openedCard, setOpenedCard] = React.useState<boolean>(false)
    const [selectedCard, setSelectedCard] = React.useState<any>(null);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFormData({type})
        setOpen(false)
    };
    
    const handleForm = (field: string) => (e: any) => {
        let value: any = undefined

        if (field === 'image') {
            value = e.target.files[0]
        } else {
            value = e.target.value
        }
        const obj = {
            [field]: value,
            ...formData
            
        }
        setFormData(val => obj)
    }

    const handleValidate = async (data: any) => {
        // For Firebase        
        await addCard({...data})
        const res = await getCards(type)
        setPages((val: any) => res)
        handleClose()
    }

    React.useEffect(() => {
        (async () => {
            const card_list: any[] = await getCards(type)
            setPages((val: any) => card_list)
        })()

        return () => {
            setSelectedCard((val: any) => null)
        }
    }, [])


    if (openedCard) {
        return <Text page={{pages, ...selectedCard}} setOpenedCard={setOpenedCard} close />
    } else {
        return (
            <div className='Tools container'>
                <div className="titles">
                    <h1>{title}</h1>
                    <h4></h4>
                </div>
                <div className="main">
                    <div className="left">
                        <div className="text">
                            <span>{text}</span>
                        </div>
                    </div>
                    <div className='right'>
                        <div className="cards">
                            {
                                pages && pages.length > 0 && pages.map((page: any, id: number) => (
                                    <Card id={id} pages={pages} page={page} setSelectedCard={setSelectedCard} setOpenedCard={setOpenedCard} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            
                <div className="footer">
                    
                    <Button onClick={handleOpen}>Créer +</Button>
        
                    <Modal open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Créer une nouvelle card
                            </Typography>

                            <div className='modalContent'>
                                <label htmlFor="title">Titre</label>
                                <input name="title" type="text" onBlur={handleForm('title')} />

                                <label htmlFor="subtitle">Sous-titre</label>
                                <input name='subtitle' type="text" onBlur={handleForm('subtitle')} />

                                <label htmlFor="text">Texte</label>
                                <input name='text' type="text" onBlur={handleForm('text')} />
                            
                                <label htmlFor="image">Image</label>
                                <input name="image" type="file" onChange={handleForm('image')} />
                            </div>

                            <div className='modalButtons'>
                                <Button id="modal-modal-title" sx={{ mt: 2 }} onClick={handleClose}>Fermer</Button>
                                <Button id="modal-modal-description" sx={{ mt: 2 }} onClick={() => handleValidate({ ...formData, type })}>Valider</Button>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Tools;