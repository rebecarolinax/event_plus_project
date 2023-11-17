import React from "react";
import { useState, useEffect } from "react";
import "./TipoEventosPage.css";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import MainContent from "../../components/Main/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/images/tipo-evento.svg";
import api from "../../Services/Service";
import { Button, Input } from "../../components/FormComponents/FormComponents";
import TableEventType from "./TableEventType/TableEventType";

import Notification from "../../components/Notification/Notification";

const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo] = useState("");

  const [notifyUser, setNotifyUser] = useState({});

  // vai usar um State, sempre tenha um valor inicial.
  const [tipoEventos, setTipoEventos] = useState([]);

  // iniciada a lógica de trazer os dados diretamente da API
  // usando useEffect() para
  useEffect(() => {
    // define a chamada em nossa api (chamada assíncrona)
    async function loadedEventsType() {
      try {
        // usando o await para a espera da função "promisse"
        const retorno = await api.get("/TiposEvento");
        // instanciando e exibindo os dados
        setTipoEventos(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        // caso dê erro, exibir no console
        console.log("Erro na api");
        console.log(error);
      }
    }
    // chama a função/api
    loadedEventsType();
  }, []);

  async function handleDelete(idTipoEvento) {
    // definido ID e usado como interpolação
    try {
      const promise = await api.delete(`${"/TiposEvento"}/${idTipoEvento}`);
      //  se statusCode == OK
      if (promise.status == 204) {
        alert("Cadastro apagado com sucesso!");
        const buscaEventos = await api.get("/TiposEvento");
        setTipoEventos(buscaEventos.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (titulo.trim().length < 3) {
      alert("O título deve ter mais que três caracteres");
      return;
    }
    try {
      const retorno = await api.post("/TiposEvento", { titulo });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      console.log(retorno.data);

      setTitulo("");
    } catch (error) {
      console.log("Deu ruim na API!");
      console.log(error);
    }
  }

  function showUpdateForm() {
    setFrmEdit(true);
  }

  function editActionAbort() {
    setFrmEdit(false);
  }

  function handleUpdate() {}

  // async function handleUpdate(idTipoEvento)
  // {
  //   // try {
  //   //   const promise = await api.put(`${"/TiposEvento"}/${idTipoEvento}`);
  //   //   //  se statusCode == OK
  //   //   if (promise.status == 204) {
  //   //     alert("Cadastro atualizado com sucesso!");
  //   //     const buscaEventos = await api.get("/TiposEvento");
  //   //     setTipoEventos(buscaEventos.data);
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Tipos de evento"} />
            <ImageIllustrator imageRender={eventTypeImage} />

            <form
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                <>
                  <Input
                    type={"text"}
                    id={"titulo"}
                    name={"titulo"}
                    placeholder={"Título"}
                    required={"required"}
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                  />

                  <Button
                    type={"submit"}
                    id={"cadastrar"}
                    name={"cadastrar"}
                    textButton={"Cadastrar"}
                  />
                </>
              ) : (
                <>
                  <Input
                    type={"text"}
                    id={"titulo"}
                    name={"titulo"}
                    placeholder={"Título"}
                    required={"required"}
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                  />

                  <div className="buttons-editbox">
                    <Button
                      type={"submit"}
                      id={"atualizar"}
                      name={"atualizar"}
                      textButton={"Atualizar"}
                      additionalClass={"button-component--middle"}
                    />

                    <Button
                      type={"cancel"}
                      id={"cancelar"}
                      name={"caneclar"}
                      textButton={"Cancelar"}
                      additionalClass={"button-component--middle"}
                      manipulationFunction={() => {
                        editActionAbort();
                      }}
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </Container>
      </section>

      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Listar tipo eventos"} color="white" />
          <TableEventType
            dados={tipoEventos}
            fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoEventosPage;
