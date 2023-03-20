import './gallery.css'

import { getCards, addCard } from '../../../config/firebase'

import { Box, Button, Modal, Typography } from '@mui/material';

import Card from '../../Card/Card'
import React from "react";

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

const Gallery = (props: any) => {

    const { title, text, id, setActivePage } = props
    const type = id
    
    const [cards, setCards] = React.useState<any[]>([]);
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
            // [field]: e.target.value,
            [field]: value,
            ...formData
            
        }
        setFormData(val => obj)
    }

    const handleValidate = async (data: any) => {
        
        // For Firebase

        // await addCard({ ...data })
        // const res = await getCards()
        // setCards(val => res)
        
        await addCard({...data})
        const res = await getCards(type)
        setCards(val => res)
        handleClose()
    }

    React.useEffect(() => {
        (async () => {
            const card_list: any[] = await getCards(type)
            setCards(val => card_list)
        })()
    }, [])

    React.useEffect(() => {
        const card_list = cards;
        setActivePage((val: any) => {
            return {
                'cards': card_list,
                ...props
            }
        })
    }, [cards])

    return (
        <div className='Gallery container'>
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
                            cards && cards.length > 0 && cards.map((card: any, id: number) => (
                                <Card id={id} cards={cards} {...card} />
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
                            <Button id="modal-modal-description" sx={{ mt: 2 }} onClick={() => handleValidate({...formData, type})}>Valider</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
            
        </div>
    )
}

export default Gallery;