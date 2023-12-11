import React, {useContext} from "react";
import "./PerfilUsuario.css";

import iconeLogout from "../../assets/images/images/icone-logout.svg";
import { Link, useNavigate } from "react-router-dom"; 
import { UserContext } from "../../context/AuthContext";

const PerfilUsuario = () => {
    const {userData, setUserData} = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        setUserData({});
        navigate("/home")
    }

    return (
        <div className="perfil-usuario">
            {userData.nome ? (
                <>
                    <span className="perfil-usuario__menuitem">Olá, {userData.nome}</span>

                    <img
                        onClick={logout}
                        title="Deslogar"
                        className="perfil-usuario__icon"
                        src={iconeLogout}
                        alt="imagem ilustrativa de uma porta de saída do usuário "
                    />
                </>
            ) : (
                <Link to="/" className="perfil-usuario__menuitem"> Login </Link>
            )}
        </div>
    );
};

export default PerfilUsuario;