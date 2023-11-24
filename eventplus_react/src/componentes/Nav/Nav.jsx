import React from "react";
import "./Nav.css";

import logMobile from "../../assets/images/logo-white.svg";
import logDesktop from "../../assets/images/logo-pink.svg";

import { Link } from "react-router-dom";

const Nav = ({ exibeNavbar, setExibeNavbar }) => {
  console.log(`EXIBE O MENU? ${exibeNavbar}`);

  return (
    <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
      <span
        onClick={() => {
          setExibeNavbar(false);
        }}
        className="navbar__close"
      >
        X
      </span>

      <Link to="/" className="eventlogo">
        <img
          className="eventlogo__logo-image"
          src={window.innerWidth >= 992 ? logDesktop : logMobile}
          alt="Event Plus logo"
        />
      </Link>

      <div className="navbar__items-box">
        <Link to="/" className="navbar__item">Home</Link>
        <Link to="/tipo-eventos" className="navbar__item">Tipos de Eventos</Link>
        <Link to="/eventos" className="navbar__item">Eventos</Link>
        <Link to="/login" className="navbar__item">Login</Link>
      </div>
    </nav>
  );
};

export default Nav;
