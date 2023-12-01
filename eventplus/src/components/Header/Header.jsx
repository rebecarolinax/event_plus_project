import React, { useState } from 'react';
import './Header.css';

import Container from '../Container/Container';
import Nav from '../Nav/Nav';
import UserProfile from '../UserProfile/PerfilUsuario';


import MenuBarImage from '../../assets/images/menubar.png';

const Header = () => {
    const [showMobileNavBar, setShowMobileNavBar] = useState(false);

    function toggleShowMobileNavBar() {
        setShowMobileNavBar(!showMobileNavBar);
    }

    return (
        <header className='headerpage'>
            <Container>
                <div className="header-flex">
                    <img  
                        onClick={toggleShowMobileNavBar} 
                        className='headerpage__menubar'
                        src={MenuBarImage} 
                        alt="Imagem de menu de barras que ao clicar exibe ou esconde o menu em dispositivos móveis." 
                    />

                    <Nav showMobileNavBar={showMobileNavBar} toggleShowMobileNavBar={toggleShowMobileNavBar} />

                    <UserProfile/>
                </div>
            </Container>
        </header>
    );
};

export default Header;