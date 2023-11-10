import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/Main/MainContent";
import Banner from "../../components/Banner/Banner";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import api from "../../Services/Service";

const HomePage = () => {
  useEffect(() => {
    async function getProximosEventos() {
      try {
        const promise = await api.get(
          "http://localhost:5000/api/Evento/ListarProximos"
        );

        console.log(promise.data);
        setNextEvents(promise.data);
      } catch (error) {
        alert("Deu ruim na API");
      }
    }
    getProximosEventos();
    console.log("A home foi montada");
  }, []);

  // FAKE MOCK - API MOCADA
  const [nextEvents, setNextEvents] = useState([]);
  return (
    <div>
      <MainContent>
        <Banner />

        <section className="proximos-eventos">
          <Container>
            <Title titleText={"Próximos Eventos"} />

            <div className="events-box">
              {nextEvents.map((e) => {
                return (
                  <NextEvent
                    title={e.nomeEvento}
                    description={e.descricao}
                    eventDate={e.dataEvento}
                    idEvent={e.idEvento}
                  />
                );
              })}
            </div>
          </Container>
        </section>

        <VisionSection />
        <ContactSection />
      </MainContent>
    </div>
  );
};

export default HomePage;
