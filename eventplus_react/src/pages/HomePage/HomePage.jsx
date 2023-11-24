import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Banner from "../../componentes/Banner/Banner";
import Container from "../../componentes/Container/Container";
import NextEvent from "../../componentes/NextEvent/NextEvent";
import ContactSection from "../../componentes/ContactSection/ContactSection";
import MainContent from "../../componentes/MainContent/MainContent";
import VisionSection from "../../componentes/VisionSection/VisionSection";
import Titulo from "../../componentes/Titulo/Titulo";
import api from "../../Services/Service";
import { nextEventResource } from "../../Services/Service";

const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]); 

  useEffect(()=> {
    async function  getNextEvents() {
      try {
        const promise = await api.get(nextEventResource)
        const dados = await promise.data;

        setNextEvents(dados); //atualiza o estado
      } catch (error) {
        alert("Deu ruim na api!")
      }   
    }
     getNextEvents(); //roda a função
  }, [])



  return (
    <MainContent>
      <Banner />

      <section className="proximos-eventos">
        <Container>
          <Titulo titleText={"Próximos Eventos"} />

          <div className="events-box">

           {
            nextEvents.map((e) => {
              return (
              <NextEvent 
              key={e.idEvento}
              title={e.nomeEvento}
              description={e.descricao}
              eventDate={e.dataEvento}
              idEvent={e.idEvento}
              />
              );
            })
           }

          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
