import './tools.css'

import { getCards, addCard } from '../../../config/firebase'

import { Autocomplete, Box, Button, Chip, FormControl, IconButton, ImageList, ImageListItem, ImageListItemBar, InputBase, InputLabel, Modal, TextField, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import tags_data from '../../../data/tags.json';

import Card from '../../Card/Card'
import React, { SyntheticEvent } from "react";
import Text from '../text/text'
import Image from '../../Image/Image';

const style = {
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

const formStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    paddingTop: 5,
    gap: 3
}

interface Card {
    title?: string
    subtitle?: string
    tags?: string[]
    text?: string
    image?: any
    legend?: string
    type?: string
}

const Tools = (props: any) => {

    const { page } = props
    const { title, text, id } = page
    const type = id
    
    const [selectedFilters, setSelectedFilters] = React.useState<number[]>([])
    const [tags] = React.useState<any[]>([...tags_data.tags]);
    const [selectedTags, setSelectedTags] = React.useState<any[]>([]);
    const [pages, setPages] = React.useState<any[]>([]);
    const [filteredPages, setFilteredPages] = React.useState<any[]>([]);
    const [openedCard, setOpenedCard] = React.useState<boolean>(false)
    const [selectedCard, setSelectedCard] = React.useState<any>(null);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState<Card>({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFormData({ type })
        setOpen(false)
        setSelectedTags([])
    };
    
    const handleForm = (field: string) => (e: any) => {
        let value: any = undefined

        if (field === 'image') {
            if (!e || !e.target.files[0]) return;
            value = e.target.files[0]
        } else if (field === 'tags') {
            value = e
        } else {
            value = e.target.value
        }
        const obj = {
            ...formData,
            [field]: value
            
        }
        console.log({obj})
        setFormData(val => obj)
    }

    const handleValidate = async (data: any) => {
        // For Firebase        
        await addCard({...data})
        const res = await getCards(type)
        setPages(prev => res)
        handleClose()
    }

    const handleAddFilter = (index: number) => {
        if (selectedFilters.includes(index)) {
            setSelectedFilters(prev => [...prev].filter(item => item !== index))
        } else {
            setSelectedFilters(prev => [...prev, index])
        }
    }

    const handleSelectedFilter = (index: number) => {
        if (!selectedFilters.includes(index)) {
            return 'tag'
        } else if (selectedFilters.includes(index)) {
            return 'tag selected'
        }
    }

    React.useEffect(() => {
        (async () => {
            const card_list: any[] = await getCards(type)
            setPages(prev => card_list)
        })()

        return () => {
            setSelectedCard((val: any) => null)
        }
    }, [])

    React.useEffect(() => {
        console.log({selectedCard})
    }, [selectedCard])

    React.useEffect(() => {
        console.log({formData})
    }, [formData])

    React.useEffect(() => {
        setFilteredPages(prev => pages && [...pages])
    }, [pages])

    React.useEffect(() => {
        // console.log({filteredPages})
    }, [filteredPages])

    React.useEffect(() => {
        if (selectedFilters.length > 0) {
            setFilteredPages(prev => prev.filter((page: any) => {
                selectedFilters.forEach((filter: any) => {
                    if (page?.tags && page?.tags.includes(tags[filter])) {
                        return page
                    }
                })
            }))
        } else {
            setFilteredPages(prev => [...pages])
        }
    }, [selectedFilters])

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
                        <div className='filter'>
                            <h2>Thèmes :</h2>
                            <div className='tags'>
                                {
                                    tags.map((tag: any, index: number) => (
                                        <div className={handleSelectedFilter(index)} onClick={() => handleAddFilter(index)}>
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
                    <Button onClick={handleOpen}>Contribuer</Button>
        
                    <Modal open={open} onClose={handleClose}>
                        <Box sx={style}>
                            <Typography className='typo-title' id="modal-title" variant="h4">
                                Créer un nouvel article
                            </Typography>

                            <FormControl sx={formStyle} required>
                                <div className='modal-content-left'>
                                    <TextField required id="card-title" sx={{width: "100%"}} label="Titre" variant="outlined" onBlur={handleForm('title')} />
                                    <TextField required id="card-subtitle" sx={{width: "100%"}} label="Sous-titre" variant="outlined" onBlur={handleForm('subtitle')} />
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
                                                onBlur={() => handleForm('tags')(selectedTags)} />
                                        )} />
                                    
                                    <TextField required id="card-text" sx={{width: "100%"}} label="Texte" variant="outlined" multiline rows={10} onBlur={handleForm('text')} />
                                    <TextField required id="card-annotations" sx={{width: "100%"}} label="Références" variant="outlined" multiline rows={6} onBlur={handleForm('references')} />
                                </div>

                                <div className='modal-content-right'><Button sx={{ marginBottom: "19px"}} component="label"
                                        variant="outlined">
                                        <>
                                            {
                                                formData?.['image'] ?
                                                    formData?.['image']['name']
                                                    : <>Choisir une image&nbsp;<div style={{ color: 'red' }}>*</div></>
                                                
                                            }
                                            
                                            <input required name="image" hidden type="file" onChange={handleForm('image')} />
                                        </>
                                    </Button>
                                    <div className='image-preview-container'>
                                        {
                                            formData?.['image'] ? (
                                                <img className='image-preview' src={URL.createObjectURL(formData['image'])} />
                                            ) : "Aucune image"
                                        }
                                    </div>
                                    <TextField required id="card-legend" label="Légende" variant="outlined" onBlur={handleForm('legend')} />
                                    
                                </div>
                            </FormControl>

                            <div className='modal-buttons'>
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