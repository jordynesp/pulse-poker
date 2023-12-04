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
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

import Logo from '../icons/Logo';

const settings = ['Logout'];

const NavBar = () => {
    const navigate = useNavigate();

    const navigateHome = () => {
        // TODO: if the user is not logged in then route to login page
        navigate('/home');
    };

    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;