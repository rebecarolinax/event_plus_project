import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children, redirectTo = "/home"}) => {
    //Verificar se está autenticado
    const isAuthenticated = localStorage.getItem("token") !== null;

    //Retornar o componente ou navegar para a home
    return isAuthenticated ? children : <Navigate to={redirectTo}/>
};