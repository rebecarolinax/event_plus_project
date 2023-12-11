import React from "react";
import "./ContactSection.css";

import Title from "../Title/Title";

import ContatoMap from "../../assets/images/contato-map.png";
import telephoneImg from "../../assets/images/telephone-red.png"

const ContactSection = () => {
  return (
    <section className="contato">
      <Title text="Contato" />

      <div className="contato__endereco-box">
        <img
          src={ContatoMap}
          alt="Imagem puramente ilustrativa de um mapa"
          className="contato__img-map"
        />
        <p>
          Rua Niterói, 180 - Centro <br />
          São Caetano do Sul - SP <br />
          <div className="telephone_contact">
            <img
              src={telephoneImg}
              alt="Imagem ilustrativa de um telefone vermelho"
              className="contato__img-telephone"
            />
            <a href="tel:+551142252000" className="contato__telefone">
              (11) 4225-2000
            </a>
          </div>
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
