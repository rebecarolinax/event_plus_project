import React, { useContext, useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import Title from "../../components/Title/Title";
import Table from "./Table/Table";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, {
  eventsResource,
  eventPresencesResource,
} from "../../services/service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";

const EventosAlunoPage = () => {
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);

  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1");
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    async function loadEventsType() {
      if (tipoEvento === "1") {
        try {
          const retornoEventos = await api.get(eventsResource);
          setEventos(retornoEventos.data);
          return retornoEventos.data.map((event) => {
            return {
              idEvento: event.idEvento,
              nomeEvento: event.nomeEvento,
              dataEvento: event.dataEvento.slice(0, 10),
            };
          });
        } catch (error) {
          console.log("Erro na API");
          console.log(error);
        }
      } else {
        try {
          const myEventsResponse = await api.get(
            `${eventPresencesResource}/ListarMinhas/${userData.id}`
          );
          const events = myEventsResponse.data.map((presence) => {
            const idEvento = presence.evento.idEvento;
            const nomeEvento = presence.evento.nomeEvento;
            const dataEvento = presence.evento.dataEvento;

            return {
              idEvento,
              nomeEvento,
              dataEvento,
            };
          });
          setEventos(events);
        } catch (error) {
          console.log("Erro na API");
          console.log(error);
        }
      }
    }

    loadEventsType();
  }, [tipoEvento]);

  const verifyPresence = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {
      for (let i = 0; i < eventsUser.length; i++) {
        if (arrAllEvents[x].idEvento === eventsUser[i].IdEvento) {
          arrAllEvents[x].situacao = true;
          break;
        }
      }
    }
  };

  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  function handleConnect() {
    alert("Desenvolver a função conectar evento");
  }
  return (
    <>
      <Main>
        <Container>
          <Title text={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            handleChange={(e) => {
              myEvents(e.target.value);
            }} // aqui só a variável state
            value={tipoEvento}
            additionalClassNmae="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </Main>

      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
