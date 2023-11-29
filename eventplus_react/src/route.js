import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import TipoEventosPage from "./pages/TipoEventosPage/TipoEventosPage";
import EventosPage from "./pages/EventosPage/EventosPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Header from "./componentes/Header/Header";
import Footer from "./componentes/Footer/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route element={<HomePage />} path={"/"} exact />
        <Route element={<EventosPage />} path={"/eventos"} />
        <Route element={<TipoEventosPage />} path={"/tipo-eventos"} />
        <Route element={<LoginPage />} path={"/login"} />
        <Route element={<NotFoundPage />} path={"*"} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;
