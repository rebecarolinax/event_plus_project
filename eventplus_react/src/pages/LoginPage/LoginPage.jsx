import React, { useState, useContext } from "react";
import "./LoginPage.css";

import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/images/logo-pink.svg";
import loginImage from "../../assets/images/images/login.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { loginResource } from "../../service/Service";
import Notification from '../../components/Notification/Notification';
import { UserContext, userDecodeToken } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
    const [user, setUser] = useState({email: "comum@comum.com", senha: "comum123"});
    const {userData, setUserData} = useContext(UserContext); //importa os dados globais do usuário
    const navigate = useNavigate();
    // const [notifyUser, setNotifyUser] = useState();

    async function handleSubmit(e) {
        e.preventDefault();

        if (user.email.length >= 3 && user.senha.length >= 3) {
            try {
                const promise = await api.post(loginResource,{email: user.email, senha: user.senha});

                console.log("Dados do usuario:");
                console.log(promise.data);

                const userFullToken = userDecodeToken(promise.data.token); //decodifica o token vindo
                setUserData(userFullToken); //guarda o token globalmente
                localStorage.setItem("token", JSON.stringify(userFullToken));
                navigate("/home")

            } catch (error) {
              //erro da api: bad request (401) ou erro de conexao
              alert("Verifique os dados e conexão")
              console.log(error);
            }
        } else {
            alert("prenche direito pangare")
        }
    }

    return (
        <div className="layout-grid-login">
            <div className="login">
                <div className="login__illustration">
                    <div className="login__illustration-rotate"></div>
                        <ImageIllustrator
                            imgRender={loginImage}
                            altText="Imagem de um homem em frente de uma porta de entrada"
                            additionalClass="login-illustrator"
                        />
                </div>

            <div className="frm-login">
                <img src={logo} className="frm-login__logo" alt="" />

                <form className="frm-login__formbox" onSubmit={handleSubmit}>
                    <Input
                        additionalClass="frm-login__entry"
                        type="email"
                        id="login"
                        name="login"
                        required={true}
                        value={user.email}
                        manipulationFunction={(e) => {setUser({...user, email: e.target.value.trim()})}} //trim é uma função nativa utilizada para remover os espaçamentos do inicio e do fim da string
                        placeholder="Insira seu email"
                    />

                    <Input
                        additionalClass="frm-login__entry"
                        type="password"
                        id="senha"
                        name="senha"
                        required={true}
                        value={user.senha}
                        manipulationFunction={(e) => {setUser({...user, senha: e.target.value.trim()})}} //esses 3 pontinhos em user se chamam rest
                        placeholder="Insira sua senha"
                    />

                    <a href="" className="frm-login__link"> Esqueceu a senha? </a>

                    <Button
                        textButton="Login"
                        id="btn-login"
                        name="btn-login"
                        type="submit"
                        additionalClass="frm-login__button"
                    />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
