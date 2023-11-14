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

const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo] = useState("");
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
  function handleUpdate() {
    alert("Bora atualizar!");
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
    </MainContent>
  );
};

export default TipoEventosPage;
