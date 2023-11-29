import React, { useContext, useState } from "react";
import ImageIllustrator from "../../componentes/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/logo-pink.svg";
import { Input, Button } from "../../componentes/FormComponents/FormComponents";
import loginImage from "../../assets/images/login.svg";
import { loginResource } from "../../Services/Service";
import api from "../../Services/Service";
import Notification from "../../componentes/Notification/Notification";
import "./LoginPage.css";
import { UserContext, userDecodeToken } from "../../Context/AuthContext";

const LoginPage = () => {
  const [notifyUser, setNotifyUser] = useState(); // componente notification
  const [user, setUser] = useState({
    email: "admin@admin.com",
    senha: "admin123",
  });

  const { userData, setUserData } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (user.email.length >= 3 && user.senha.length >= 3) {
      try {
        const retorno = await api.post(loginResource, {
          email: user.email,
          senha: user.senha,
        });

        // traz o Token decodificado
        const userFullToken = userDecodeToken(retorno.data.token);
        setUserData(userFullToken);

        localStorage.setItem("token", JSON.stringify(userFullToken));
      } catch (error) {
        console.log(error);
      }
    } else {
      notifyWarning("Os campos precisam ter pelo menos 3 caracteres!");
    }
  }

  function notifyWarning(textNote) {
    setNotifyUser({
      titleNote: "Alerta",
      textNote,
      imgIcon: "warning",
      imgAlt:
        "Imagem de ilustração de alerta, Moça chutando um símbolo de exclamação!",
      showMessage: true,
    });
  }

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            imageRender={loginImage}
            altText="Imagem de um homem em frente de uma porta de entrada"
            additionalClass="login-illustrator "
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
              manipulationFunction={(e) => {
                setUser({ ...user, email: e.target.value.trim() });
              }}
              placeholder="Username"
            />
            <Input
              additionalClass="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              manipulationFunction={(e) => {
                setUser({ ...user, senha: e.target.value.trim() });
              }}
              placeholder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

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
