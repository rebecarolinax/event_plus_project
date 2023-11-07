import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import logoMobile from "../../assets/images/logo-white.svg";
import logoDesktop from "../../assets/images/logo-pink.svg";

const Nav = ({ exibeNavbar, setExibeNavbar }) => {
  return (
    <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
      <span
        onClick={() => {
          setExibeNavbar(false);
        }}
        className="navbar__close"
      >
        x
      </span>

      <Link to="/" className="eventLogo">
        <img
          className="eventlogo__logo-image"
          src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
          alt="Event+ Logo"
        />
      </Link>

      <div className="navbar__items-box">
        <Link to="/" className="navbar__item">
          Home
        </Link>
        <Link to="/eventos" className="navbar__item">
          Eventos
        </Link>
        <Link to="/tiposeventos" className="navbar__item">
          Tipos de Eventos
        </Link>
        <Link to="/teste" className="navbar__item">
          POCs
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
