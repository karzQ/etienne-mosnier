import './archive.css'

import { v4 as uuidv4 } from 'uuid';
import { getCards, addCard } from '../../../config/firebase'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ToggleButton from '@mui/material/ToggleButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Autocomplete, Box, Button, Chip, FormControl, IconButton, ImageList, Modal, TextField, Typography } from '@mui/material';
import tags_data from '../../../data/tags.json';
import Card from '../../Card/Card'
import React from "react";
import Text from '../text/text'
import { useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel';


const boxArticleStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1400,
    height: 850,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bgcolor: 'background.paper',
    boxShadow: 12,
    p: 4,
};

const formArticleStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    paddingTop: 5,
    gap: 3
}

interface annotation {
    id: string
    text: string
}

interface Card {
    title?: string
    subtitle?: string
    tag?: string
    text?: string
    image?: any
    legend?: string
    type?: string,
    annotations?: annotation[]
}

const Archive = (props: any) => {

    const { page } = props
    const { title, text, id } = page
    const type = id
    
    const [selectedFilters, setSelectedFilters] = React.useState<string[]>([])
    const [annotations, setAnnotations] = React.useState<annotation[]>([])
    const [pages, setPages] = React.useState<any[]>([]);
    const [tags] = React.useState<any[]>([...tags_data.tags.archive]);
    const [selectedTags, setSelectedTags] = React.useState<any[]>([]);
    const [filteredPages, setFilteredPages] = React.useState<any[]>([]);
    const [openedCard, setOpenedCard] = React.useState<boolean>(false)
    const [selectedCard, setSelectedCard] = React.useState<any>(null);
    const [openArticle, setOpenArticle] = React.useState(false);
    const [formArticle, setFormArticle] = React.useState<Card>({});
    const handleOpenArticle = () => setOpenArticle(true);
    const handleCloseArticle = () => {
        setFormArticle({ type })
        setOpenArticle(false)
        setSelectedTags([])
        setAnnotations([])
    }
    const user = useSelector((state: any) => state.user)
    
    const handleFormArticle = (field: string) => (e: any) => {
        let value: any = undefined

        if (field === 'image') {
            if (!e || !e.target.files[0]) return;
            value = e.target.files[0]
        } else {
            value = e.target.value
        }
        const obj = {
            ...formArticle,
            [field]: value
            
        }
        setFormArticle(val => obj)
    }

    const handleAddAnnotation = () => {
        setAnnotations(prev => [...prev, { id: uuidv4(), text: '' }])
    }

    const handleDeleteAnnotation = (id: string) => {
        setAnnotations(prev => prev.filter((item: annotation) => item.id !== id))
    }

    const handleEditAnnotation = (item: annotation) => (e: any) => {
        setAnnotations(prev => prev.map((el: any) => {
            if (el.id === item.id) {
                return {...el, text: e.target.value}
            }
            return el
        }))
    }

    const handleValidateArticle = async (data: any) => {
        await addCard({...data})
        const res = await getCards(type)
        setPages(prev => res)
        handleCloseArticle()
    }
    
    const handleImage = (image: any) => {
        return URL.createObjectURL(image)
    }

    const handleAddFilter = (tag: string) => {
        if (selectedFilters.includes(tag)) {
            setSelectedFilters(prev => [...prev].filter(item => item !== tag))
        } else {
            setSelectedFilters(prev => [...prev, tag])
        }
    }

    const handleSelectedFilter = (tag: string) => {
        if (!selectedFilters.includes(tag)) {
            return 'tag'
        } else if (selectedFilters.includes(tag)) {
            return 'tag selected'
        }
    }

    React.useEffect(() => {
        (async () => {
            const card_list: any[] = await getCards(type)
            setPages(card_list)
        })()
    }, [])

    React.useEffect(() => {
        handleFormArticle('annotations')({target: {value: annotations}})
    }, [annotations])

    React.useEffect(() => {
        setFilteredPages(prev => pages && [...pages])
    }, [pages])

    React.useEffect(() => {
        if (selectedFilters.length > 0) {
            setFilteredPages(prev => pages.filter((page: any) => selectedFilters.includes(page?.tag)))
        } else {
            setFilteredPages(prev => [...pages])
        }
    }, [selectedFilters])

    if (openedCard) {
        return <Text onChange={(id: string) => id ? setFilteredPages(prev => prev.filter((item) => item._id !== id)) : null}
            page={{ ...selectedCard, pages, id: pages.indexOf(pages.filter((item: any) => item._id === selectedCard._id)[0]) }}
            setOpenedCard={setOpenedCard}
            close />
    } else {
        return (
            <div className='Archive container'>
                <div className="titles">
                    <h1>{title}</h1>
                    <h4></h4>
                </div>
                
                <div className="main">
                    <div className="left">
                        <div className="text">
                            <span>{text}</span>
                        </div>
                        <div className='filter'>
                            <h2>Thèmes :</h2>
                            <div className='tags'>
                                {
                                    tags.map((tag: any, index: number) => (
                                        <div key={index}
                                            className={handleSelectedFilter(tag)}
                                            onClick={() => handleAddFilter(tag)}>
                                            {tag}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='right'>
                        <ImageList
                            sx={{
                                marginTop: 0,
                                width: "100%",
                                height: "100%"
                            }}
                            rowHeight={200}
                            gap={1}>
                            {
                                filteredPages && filteredPages.length > 0 && filteredPages.map((page: any, id: number) => (
                                    <Card id={id} pages={filteredPages} page={page} setSelectedCard={setSelectedCard} setOpenedCard={setOpenedCard} />
                                ))
                            }
                        </ImageList>
                    </div>
                </div>
            
                <div className="footer">
                    {
                        user !== null && <Button onClick={handleOpenArticle}>Contribuer</Button>
                    }
        
                    <Modal open={openArticle} onClose={handleCloseArticle}>
                        <Box sx={boxArticleStyle}>
                            <Typography className='typo-title' id="modal-title" variant="h4">
                                Créer un nouvel article
                            </Typography>

                            <FormControl sx={formArticleStyle} required>
                                <div className='modal-content-left'>
                                    <TextField required id="card-title" sx={{width: "100%"}} label="Titre" variant="outlined" onBlur={handleFormArticle('title')} />
                                    <TextField required id="card-subtitle" sx={{width: "100%"}} label="Sous-titre" variant="outlined" onBlur={handleFormArticle('subtitle')} />                                    
                                    <Autocomplete id='auto-tags'
                                        sx={{ width: "100%" }}
                                        multiple
                                        value={selectedTags}
                                        options={tags}
                                        filterSelectedOptions
                                        getOptionLabel={(option) => option}
                                        onBlur={(e: any) => !selectedTags.includes(e.target.value) && e.target.value !== '' ? setSelectedTags(prev => [...prev, e.target.value]) : ''}
                                        renderTags={(value: readonly string[], getTagProps) =>
                                            value.map((option: string, index: number) => (
                                              <Chip variant="outlined" onDelete={(item) => setSelectedTags(prev => prev.filter((tag: any) => prev.indexOf(tag) !== index))} label={option} />
                                            ))
                                          }
                                        renderOption={(props, option) => (
                                            <Box component="li" {...props} onClick={() => setSelectedTags(prev => [...prev, option])}>{option}</Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField required {...params}
                                                id="card-tags"
                                                label="Tags"
                                                variant="outlined"
                                                onBlur={() => handleFormArticle('tag')({target: {value: selectedTags[0]}})} />
                                        )} />
                                    
                                    <TextField required id="card-text" sx={{ width: "100%" }} label="Texte" variant="outlined" multiline rows={6} onBlur={handleFormArticle('text')} />
                                    <div className='annotations'>
                                        <div className='top'>
                                            <Typography  sx={{color: 'gray', display: 'flex'}} variant='subtitle1'>Annotations&nbsp;<div style={{color: "red"}}>*</div></Typography>
                                            <IconButton size='small' onClick={handleAddAnnotation} >
                                                <AddIcon />
                                            </IconButton>
                                        </div>

                                        <div className="annotations-list">
                                            {
                                                annotations.length > 0 ? annotations.map((annotation: any, index: number) => (
                                                    <div key={index} className='annotation'>
                                                        <TextField sx={{ width: 509 }}
                                                            size='small'
                                                            id='card-annotation-text'
                                                            label="Texte"
                                                            variant='outlined'
                                                            type='text'
                                                            onBlur={handleEditAnnotation(annotation)} />
                                                        
                                                        <IconButton size='small' onClick={() => handleDeleteAnnotation(annotation.id)} >
                                                            <RemoveCircleIcon sx={{fill: 'red'}} />
                                                        </IconButton>
                                                    </div>
                                                )) : (<span style={{color: 'black', width: '100%', textAlign: 'center'}}>Pas de référence</span>)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className='modal-content-right'>
                                    <Button sx={{ marginBottom: "19px" }} component="label"
                                        variant="outlined">
                                        <>
                                            {
                                                formArticle?.['image'] ?
                                                    formArticle?.['image']['name']
                                                    : <>Choisir une image&nbsp;<div style={{ color: 'red' }}>*</div></>
                                                
                                            }
                                            
                                            <input required name="image" hidden type="file" onChange={handleFormArticle('image')} />
                                        </>
                                    </Button>
                                    <div className='image-preview-container'>
                                        {
                                            formArticle?.['image'] ? (
                                                <img className='image-preview' src={handleImage(formArticle['image'])} />
                                            ) : "Aucune image"
                                        }
                                    </div>
                                    <TextField required id="card-legend" label="Légende" variant="outlined" onBlur={handleFormArticle('legend')} />
                                    
                                </div>
                            </FormControl>

                            <div className='modal-buttons'>
                                <Button id="modal-button-close"
                                    sx={{ mt: 2, color: 'orangered' }}
                                    onClick={handleCloseArticle}>Fermer</Button>
                                
                                <Button id="modal-button-validate"
                                    sx={{ mt: 2, color: 'orangered' }}
                                    onClick={() => handleValidateArticle({ ...formArticle, type })}>Valider</Button>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Archive;