import React from "react";
import './Header.css';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <br />
                <Link to="/eventos">Eventos</Link>
                <br />
                <Link to="/tiposeventos">Tipos de Eventos</Link>
                <br />
                <Link to="/teste">POCs</Link>
            </nav>
        </header>
    );
}

export default Header;