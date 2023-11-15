import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './components/Home';

function App() {
    return (
        <div>
            <Router>
                <section>
                    <Routes>
                        <Route path="/" element={ <Home /> }/>
                    </Routes>
                </section>
            </Router>
        </div>
    );
}

export default App;