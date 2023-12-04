import React from 'react';
import { Route, Routes as AppRoutes } from 'react-router-dom';

import Home from './Home';
import Room from './Room';
import CreateRoom from './CreateRoom';
import { useAuth } from '../contexts/AuthContext';

const Routes = () => {
    const { user } = useAuth();

    return (
        <AppRoutes>
            <Route exact path="/" element={ <Home /> }/>
            { user ? (
                <>
                    <Route exact path="/create" element={ <CreateRoom /> }/>
                    <Route path="/room/:id" element={ <Room /> }/>
                </>
            ) : null }
        </AppRoutes>
    );
};

export default Routes;
