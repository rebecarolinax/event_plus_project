import React, { useContext } from 'react';
import './Nav.css';

import { Link } from "react-router-dom";
import logoMobile from "../../assets/images/images/logo-white.svg";
import logoDesktop from "../../assets/images/images/logo-pink.svg";
import { UserContext } from '../../context/AuthContext';

const Nav = ({ exibeNavbar, setExibeNavbar }) => {
    const { userData }  = useContext(UserContext);

    return (
        <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
            <span onClick={() => {setExibeNavbar(false)}} className='navbar__close'>x</span>

            <Link to="/home" className='eventLogo'>
                <img 
                    className='eventlogo__logo-image'
                    src={window.innerWidth >= 992 ? logoDesktop : logoMobile} 
                    alt="Event+ Logo" 
                />
            </Link>
            
            <div className="navbar__items-box">
                <Link onClick={() => {setExibeNavbar(false)}} to="/home" className='navbar__item'>Home</Link>

                {userData.nome && userData.role === "Administrador" ? (
                    <>
                        <Link to="/eventos" className='navbar__item'>Eventos</Link>
                        <Link to="/tiposeventos" className='navbar__item'>Tipos de Eventos</Link>
                        <Link to="/instituicoes" className='navbar__item'>Instituições</Link>
                    </>
                ) : userData.nome && userData.role === "Comum" ? (
                    <Link to="/eventos-aluno" className='navbar__item'>Eventos</Link>
                ) : null}
            </div>
        </nav>
    );
};

export default Nav;