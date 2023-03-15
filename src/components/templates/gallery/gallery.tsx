import './gallery.css'

import { Box, Button, Modal, Typography } from '@mui/material';
import { GalleryComponent, ImageComponent } from '../../../vite-env';

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

const Gallery = (props: GalleryComponent) => {

    const { title, text, id } = props
    const type = id
    
    const [cards, setCards] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({ type });
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFormData({type})
        setOpen(false)
    };

    
    const handleForm = (field: string) => (e: any) => {
        // let value: any = undefined

        // if (field === 'image') {
        //     value = new FormData()
        //     value.append("file", e.target)
        //     console.log(e.target.value)
        // } else {
        //     value = e.target.value
        // }
        
        // console.log({value})

        const obj = {
            [field]: e.target.value,
            ...formData
            
        }
        setFormData(val => obj)
    }

    const handleValidate = async (data: any) => {
        console.log({data, stfy: JSON.stringify(data)})
        const res = await fetch(`http://127.0.0.1:4000/api/add-card`, {
            method: "POST",
            headers: {
                'Content-Type': "multipart/form-data",
                'accept-encoding': 'gzip, deflate, br',
                'content-length': '69051'
            },
            body: JSON.stringify(data)
        })
        const search_res = await searchCards()
        setCards(val => search_res)
        handleClose()
    }

    const searchCards = async () => {
        const res = await (await fetch(`http://127.0.0.1:4000/api/cards`)).json()
        
        try {
            console.log({ res })
            return res.cards
        } catch (err) {
            console.error({ err })
            return []
        }
    }

    React.useEffect(() => {
        (async () => {
            const res: [] = await searchCards()
            setCards(val => res)
        })()
        // if (res?.data) {
        //     setCards(res?.data)
        // }
    }, [])

    React.useEffect(() => {
        console.log({cards})
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
                                <Card {...card} />
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
                            <Button id="modal-modal-description" sx={{ mt: 2 }} onClick={() => handleValidate(formData)}>Valider</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
            
        </div>
    )
}

export default Gallery;