import React from 'react';
import { cyan } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import CreateRoom from './components/CreateRoom';
import { AuthProvider } from './components/AuthContext';

const theme = createTheme({
    palette: {
        primary: {
            main: cyan[500],
        },
        secondary: {
            main: '#000000',
        }
    },
});

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider theme={ theme }>
                <div className="bg-gray-100 h-screen">
                    <Router>
                        <NavBar />
                        <section style={{ height: 'calc(100vh - 64px)' }}>
                            <Routes>
                                <Route path="/" element={ <Home /> }/>
                                <Route path="/create" element={ <CreateRoom /> }/>
                            </Routes>
                        </section>
                    </Router>
                </div>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
