import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { ReactComponent as GoogleSignInLogo } from '../icons/web_light_sq_SI.svg';

import Logo from '../icons/Logo';
import { useAuth } from './AuthContext';

const NavBar = () => {
    const navigate = useNavigate();
    const { isSignedIn, signIn, signOut } = useAuth();

    const navigateHome = () => {
        navigate('/');
    };

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button onClick={navigateHome}>
                        <Logo size={50} />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: 'flex',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            PULSE POKER
                        </Typography>
                    </Button>

                    <Box sx={{ flexGrow: 1, display: 'flex' }} />


                    <Box sx={{ flexGrow: 0 }}>
                        { isSignedIn ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem key="Logout" onClick={handleCloseUserMenu}>
                                        <Typography className="flex justify-center text-center" onClick={signOut}>
                                            Logout
                                            <LogoutTwoToneIcon className="ml-2"/>
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button onClick={signIn}>
                                <GoogleSignInLogo />
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;