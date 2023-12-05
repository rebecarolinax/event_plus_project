import React, { useContext } from 'react';
import './Nav.css';

import { Link } from 'react-router-dom';

import LogoMobile from '../../assets/images/logo-white.svg';
import LogoDeskTop from '../../assets/images/logo-pink.svg';

import { UserContext, userDecodeToken } from '../../context/AuthContext';

const Nav = ({ showMobileNavBar, toggleShowMobileNavBar }) => {
    const { userData } = useContext(UserContext);

    return (
        <nav className={`navbar ${showMobileNavBar ? 'exibeNavbar' : ''}`}>
            <span className="navbar__close" onClick={toggleShowMobileNavBar}>x</span>

            <Link to='/' className="eventlogo">
                <img className='eventlogo__logo-image' src={window.innerWidth >= 992 ? LogoDeskTop : LogoMobile} alt="" />
            </Link>

            <div className="navbar__items-box">
                <Link to='/' className='navbar__item'>Home</Link>

                {userData.nome && userData.role === "Administrador" ? (
                    <>
                        <Link to='/tipo-eventos' className='navbar__item'>Tipos de Evento</Link>
                        <Link to='/eventos' className='navbar__item'>Eventos</Link>
                    </>
                ):userData.nome && userData.role === "Comum" ?(
                    <Link to='/eventosaluno' className='navbar__item'>Eventos Aluno</Link>
                ):(
                    null
                )}
                
            </div>
        </nav>
    );
};

export default Nav;