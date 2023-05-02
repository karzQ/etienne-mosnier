import './header.css'

import React from "react";

import { Capitalize } from '../../helpers/functions';
import { Link } from 'react-router-dom';
import cailloux_gif from '../../assets/img/cailloux.gif'
import cailloux_static from '../../assets/img/cailloux_fixed.png'
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material';
import {UserActions} from '../../reducers/userReducer';
import { Login } from '../../config/config';
import { SignIn, SignOut } from '../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';

const boxLoginStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bgcolor: 'background.paper',
    boxShadow: 12,
    p: 4,
};

const Header = (props: any) => {
    const {pages, setPage} = props
    const [isShown, setIsShown] = React.useState(false);
    const [formLogin, setFormLogin] = React.useState<Login>({})
    const [openLogin, setOpenLogin] = React.useState<boolean>(false)
    const [error, setError] = React.useState<boolean>(false)
    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()

    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => {
        setError(false)
        setFormLogin({})
        setOpenLogin(false)
    };

    const handleFormLogin = (field: string) => (e: any) => {
        const obj = {
            ...formLogin,
            [field]: e.target.value
        }
        setFormLogin(obj)
    }

    const handleDispatch = (data: any, action: string) => {
        dispatch({payload: data, type: action})
    }

    const handleSignOut = async () => {
        await SignOut()
        handleDispatch(null, UserActions.CLEAR_CURRENT_USER)
    }

    const handleValidateLogin = async (data: Login) => {
        if (data.login && data.password) {
            const res: any = await SignIn({ ...data })
            if (res?.error || !res) {
                setError(true)
            } else {
                handleDispatch({ ...res?.user }, UserActions.SET_CURRENT_USER)
                handleCloseLogin()
            }
        }
    }

    return (
        <div className='header' onMouseLeave={() => isShown && setIsShown(val => false)}>
            <div className='left'>
                <img className='cailloux'
                    src={isShown ? cailloux_gif : cailloux_static}
                    onMouseOver={() => setIsShown(val => true)} />
                {
                    isShown && (
                        <div className="links">
                            {
                                pages && pages.length > 0 && pages.map((page: any, id: number) => (
                                    <React.Fragment key={`${id}-${page.id}`}>
                                        <Link to={`/${page.id}`} onClick={() => setPage(page.id)}>{Capitalize(page.name)}</Link>
                                        {
                                            id < pages.length-1 ? <span className='separator'>|</span> : ''
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className='right'>
                {
                    user === null ? <Button sx={{color: "lightgray"}} onClick={handleOpenLogin}>Connexion</Button>
                    : <Button sx={{color: "lightgray"}} onClick={() => handleSignOut()}>Se Déconnecter</Button>
                }
                
            </div>

            <Modal open={openLogin} onClose={handleCloseLogin}>
                <Box sx={boxLoginStyle}>
                    <Typography sx={{paddingBottom: 3}} className='typo-title' id="modal-title" variant="h4">
                        Connexion
                    </Typography>

                    <FormControl sx={{gap: 2}} required>
                        <TextField
                            error={error ? true : false}
                            required
                            id="login-id"
                            sx={{ width: "100%" }}
                            label="Identifiant"
                            variant="outlined"
                            onBlur={handleFormLogin('login')} />
                        
                        <TextField
                            error={error ? true : false}
                            required
                            id="login-password"
                            sx={{ width: "100%" }}
                            label="Mot de passe"
                            type='password'
                            variant="outlined"
                            onBlur={handleFormLogin('password')} />
                    </FormControl>

                    <div style={{marginTop: 20, justifyContent: 'center'}} className='modal-buttons'>
                        
                        <Button disabled={!formLogin.login || !formLogin.password}
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                            onClick={() => handleValidateLogin(formLogin)}>Valider</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Header;