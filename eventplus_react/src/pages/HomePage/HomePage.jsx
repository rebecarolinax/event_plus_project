import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/Main/MainContent";
import Banner from "../../components/Banner/Banner";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";

const HomePage = () => {
  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await axios.get("http://localhost:5000/api/Evento/ListarProximos");
      } catch (error) {}
    }
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
                    title={e.titulo}
                    description={e.descricao}
                    eventDate={e.dataevento}
                    idEvent={e.idevento}
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
