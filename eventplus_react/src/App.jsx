import { useEffect, useState } from 'react';
import './App.css';

import { UserContext } from './context/AuthContext';
import Rotas from '../src/routes/routes';

const App = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        setUserData(token === null ? {} : JSON.parse(token))
    }, [])

    return (
        <UserContext.Provider value={ {userData, setUserData} }>
            <Rotas/>
        </UserContext.Provider>
    );
};

export default App;
