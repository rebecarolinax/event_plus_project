import React from 'react';
import './Nav.css';
import { Link } from "react-router-dom";
import logoMobile from "../../assets/images/images/logo-white.svg";
import logoDesktop from "../../assets/images/images/logo-pink.svg";

const Nav = ({exibeNavbar, setExibeNavbar}) => {

    console.log(`EXIBE O MENU ${exibeNavbar}`);

    return (
        <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
            <span onClick={() => {setExibeNavbar(false)}} className='navbar__close'>x</span>

            <Link to="/" className='eventLogo'>
                <img 
                    className='eventlogo__logo-image'
                    src={window.innerWidth >= 992 ? logoDesktop : logoMobile} 
                    alt="Event+ Logo" 
                />
            </Link>
            
            <div className="navbar__items-box">
                <Link onClick={() => {setExibeNavbar(false)}} to="/" className='navbar__item'>Home</Link>
                <Link onClick={() => {setExibeNavbar(false)}} to="/eventos" className='navbar__item'>Eventos</Link>
                <Link onClick={() => {setExibeNavbar(false)}} to="/tiposeventos" className='navbar__item'>Tipos de Eventos</Link>
                <Link onClick={() => {setExibeNavbar(false)}} to="/teste" className='navbar__item'>POCs</Link>
            </div>
        </nav>
    );
};

export default Nav;