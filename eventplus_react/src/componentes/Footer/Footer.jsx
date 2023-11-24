import React from "react";
import "./Footer.css";
import Container from "../Container/Container";

const Footer = ({ textRights = "Escola Senai de Informática - 2023" }) => {
  return (
    <Container>
      <footer className="footer-page">
        <p className="footer-page__rights">{textRights}</p>
      </footer>
    </Container>
  );
};

export default Footer;
