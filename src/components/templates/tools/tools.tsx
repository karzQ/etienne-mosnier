import './tools.css'

import { getCards, addCard } from '../../../config/firebase'
import { Autocomplete, Box, Button, Chip, FormControl, ImageList, Modal, TextField, Typography } from '@mui/material';
import tags_data from '../../../data/tags.json';
import Card from '../../Card/Card'
import React from "react";
import Text from '../text/text'
import { useSelector } from 'react-redux';


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
    const [openArticle, setOpenArticle] = React.useState(false);
    const [formArticle, setFormArticle] = React.useState<Card>({});
    const handleOpenArticle = () => setOpenArticle(true);
    const handleCloseArticle = () => {
        setFormArticle({ type })
        setOpenArticle(false)
        setSelectedTags([])
    }
    const user = useSelector((state: any) => state.user)
    
    const handleFormArticle = (field: string) => (e: any) => {
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
            ...formArticle,
            [field]: value
            
        }
        console.log({obj})
        setFormArticle(val => obj)
    }

    const handleValidateArticle = async (data: any) => {
        // For Firebase
        await addCard({...data})
        const res = await getCards(type)
        setPages(prev => res)
        handleCloseArticle()
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
            console.log({card_list})
            setPages(card_list)
        })()
    }, [])

    React.useEffect(() => {
        setFilteredPages(prev => pages && [...pages])
        console.log({pages})
    }, [pages])

    const applyFilters = (data: any[], filters: any[]) => {
        const arr: any[] = []

        data.forEach((page: any) => {
            filters.forEach((filter: any) => {
                if (page?.tags?.includes(tags[filter])) {
                    console.log({ page, filter: tags[filter] })
                    
                    if (arr.length > 0) {
                        if (!arr.some((obj: any) => obj.title === page.title)) arr.push(page)
                    }
                }
            })
        })

        return arr
    }

    React.useEffect(() => {
        if (selectedFilters.length > 0) {
            setFilteredPages(prev => prev.filter((obj: any) => obj?.tags?.some((tag: any) => filteredPages.includes(tag))))
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
                                                onBlur={() => handleFormArticle('tags')(selectedTags)} />
                                        )} />
                                    
                                    <TextField required id="card-text" sx={{width: "100%"}} label="Texte" variant="outlined" multiline rows={10} onBlur={handleFormArticle('text')} />
                                    <TextField required id="card-annotations" sx={{width: "100%"}} label="Références" variant="outlined" multiline rows={6} onBlur={handleFormArticle('references')} />
                                </div>

                                <div className='modal-content-right'><Button sx={{ marginBottom: "19px"}} component="label"
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
                                                <img className='image-preview' src={URL.createObjectURL(formArticle['image'])} />
                                            ) : "Aucune image"
                                        }
                                    </div>
                                    <TextField required id="card-legend" label="Légende" variant="outlined" onBlur={handleFormArticle('legend')} />
                                    
                                </div>
                            </FormControl>

                            <div className='modal-buttons'>
                                <Button id="modal-modal-title" sx={{ mt: 2 }} onClick={handleCloseArticle}>Fermer</Button>
                                <Button id="modal-modal-description" sx={{ mt: 2 }} onClick={() => handleValidateArticle({ ...formArticle, type })}>Valider</Button>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Tools;