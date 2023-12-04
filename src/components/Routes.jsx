import React from 'react';
import { Route, Routes as AppRoutes } from 'react-router-dom';

import Home from './Home';
import Room from './Room';
import CreateRoom from './CreateRoom';
import { useAuth } from '../contexts/AuthContext';

const Routes = () => {
    const { user } = useAuth();

    return (
        <section style={{ height: 'calc(100vh - 64px)' }}>
            <AppRoutes>
                <Route exact path="/" element={ <Home /> }/>
                { user ? (
                    <>
                        <Route exact path="/create" element={ <CreateRoom /> }/>
                        <Route path="/room/:id" element={ <Room /> }/>
                    </>
                ) : null }
            </AppRoutes>
        </section>
    );
};

export default Routes;
