import React from "react";
import "./TipoEventosPage.css";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import MainContent from "../../components/Main/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/images/tipo-evento.svg";
import { Input } from "../../components/FormComponents/FormComponents";

const TipoEventosPage = () => {
  return (
    <MainContent>
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Tipos de evento"} />
            <ImageIllustrator imageRender={eventTypeImage} />

            <form action="">
              <p>Componente de formulário</p>
              <Input type={"number"} />
              <Input type={"text"} />
            </form>
          </div>
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoEventosPage;
