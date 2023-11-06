import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import das páginas
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import EventosPage from "./pages/EventosPage/EventosPage";
import TipoEventosPage from "./pages/TipoEventosPage/TipoEventosPage";
import TestePage from "./pages/TestePage/TestePage";
import Footer from "./components/Footer/Footer";

const Rotas = () => {
    return (
        <>
        <BrowserRouter>
            <Header />
            
            <Routes> 
                <Route element={<HomePage/>} path="/" exact/>
                <Route element={<EventosPage/>} path="/eventos"/>
                <Route element={<TipoEventosPage/>} path="/tiposeventos"/>
                <Route element={<TestePage/>} path="/teste"/>
            </Routes>

            <Footer />
        </BrowserRouter>
        </>
    );
}

export default Rotas;