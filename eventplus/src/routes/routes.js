import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Header from '../components/Header/Header';

import TiposEventoPage from '../pages/TiposEventoPage/TiposEventoPage'
import EventosPage from '../pages/EventosPage/EventosPage';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import Footer from '../components/Footer/Footer';
import { PrivateRoute } from './PrivateRoutes';

const RouteView = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route element={ <HomePage/> } path="/" exact/>

                <Route 
                path="/tipo-eventos"
                element={ 
                    <PrivateRoute redirectTo="/">
                        <TiposEventoPage/> 
                    </PrivateRoute>
                } 
                />

                <Route 
                    path="/eventos"
                    element={ 
                    <PrivateRoute redirectTo="/">
                        <EventosPage/> 
                    </PrivateRoute>
                    }
                />

                <Route element={ <LoginPage/> } path="/login"/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default RouteView;