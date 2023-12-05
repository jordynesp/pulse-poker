import React from 'react';
import { cyan } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import { AuthProvider } from './contexts/AuthContext';

const theme = createTheme({
    palette: {
        primary: {
            main: cyan[500],
            // maybe make button te xt
        },
        secondary: {
            main: '#000000',
        }
    },
});

const App = () => {
    return (
        <ThemeProvider theme={ theme }>
            <div className="bg-gray-100 h-screen">
                <Router>
                    <AuthProvider>
                        <NavBar />
                        <Routes />
                    </AuthProvider>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
