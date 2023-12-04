import React from 'react';
import { cyan } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';

const theme = createTheme({
    palette: {
        primary: {
            main: cyan[500],
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={ theme }>
            <div className="bg-gray-100 h-screen">
                <NavBar />
                <Router>
                    <section style={{ height: 'calc(100vh - 64px)' }}>
                        <Routes>
                            <Route path="/home" element={ <Home /> }/>
                        </Routes>
                    </section>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
