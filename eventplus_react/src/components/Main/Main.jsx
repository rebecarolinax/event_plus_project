import React from 'react';
import './Main.css';

const Main = ({ children }) => {
    return (
        <div className='main-content'>
            {children}
        </div>
    );
};

export default Main;