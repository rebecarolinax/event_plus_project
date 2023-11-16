import React from "react";
import { useState } from "react";
import "./TipoEventosPage.css";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import MainContent from "../../components/Main/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/images/tipo-evento.svg";
import api from "../../Services/Service";
import { Button, Input } from "../../components/FormComponents/FormComponents";
import TableEventType from "./TableEventType/TableEventType";

const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo] = useState("");

  // vai usar um State, sempre tenha um valor inicial.
  const [tipoEventos, setTipoEventos] = useState([
    { idTipoEvento: "123", titulo: "AMAR MEU NAMORADO" },
    { idTipoEvento: "456", titulo: "REBECA CAROLINA" },
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (titulo.trim().length < 3) {
      alert("O título deve ter mais que três caracteres");
      return;
    }
    try {
      const retorno = await api.post("/TiposEvento", { titulo });
      console.log("Cadastrado com sucesso!");
      console.log(retorno.data);
      setTitulo("");
    } catch (error) {
      console.log("Deu ruim na API!");
      console.log(error);
    }
  }

  function showUpdateForm() {
    alert("Mostrando a tela de Update");
  }

  function handleUpdate() {
    alert("Bora atualizar!");
  }

  function editActionAbort() {
    alert("Cancelar a tela de edição de dados");
  }

  function handleDelete() {
    alert("Bora lá apagar da api!");
  }
  return (
    <MainContent>
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
                  <span>{titulo}</span>
                  <Button
                    type={"submit"}
                    id={"cadastrar"}
                    name={"cadastrar"}
                    textButton={"Cadastrar"}
                  />
                </>
              ) : (
                <p>Tela de edição</p>
              )}
            </form>
          </div>
        </Container>
      </section>

      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista tipo eventos"} color="white" />
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
