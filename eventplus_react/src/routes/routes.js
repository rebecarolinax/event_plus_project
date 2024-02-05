import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

//import das páginas
import Header from "../components/Header/Header";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import EventosPage from "../pages/EventosPage/EventosPage";
import TipoEventosPage from "../pages/TipoEventosPage/TipoEventosPage";
import InstituicaoPage from "../pages/InstituicaoPage/InstituicaoPage";
import EventosAlunoPage from "../pages/EventosAlunoPage/EventosAlunoPage";
import Footer from "../components/Footer/Footer";

const Rotas = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
            
                <Routes> 
                    {/* ROTAS PÚBLICAS */}
                    <Route element={<LoginPage/>} path="/" exact/>
                    <Route element={<HomePage/>} path="/home"/>

                    {/* ROTAS PRIVADAS */}
                    <Route 
                        element={<PrivateRoute redirectTo="/home"> <TipoEventosPage/> </PrivateRoute>} 
                        path="/tiposeventos"
                    />

                    <Route 
                        element={<PrivateRoute redirectTo="/home"> <EventosPage/> </PrivateRoute>} 
                        path="/eventos"
                    />

                    <Route 
                        element={<PrivateRoute redirectTo="/home"> <InstituicaoPage/> </PrivateRoute>} 
                        path="/instituicoes"
                    />

                    <Route 
                        element={<PrivateRoute redirectTo="/home"> <EventosAlunoPage/> </PrivateRoute>} 
                        path="/eventos-aluno"
                    />
                </Routes>

                <Footer />
            </BrowserRouter>
        </>
    );
}

export default Rotas;