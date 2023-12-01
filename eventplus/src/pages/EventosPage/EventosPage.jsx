import { useEffect, useState } from "react";

import api, {
  eventTypesResource,
  eventsResource,
} from "../../services/service";

import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import ImageIllustration from "../../components/ImageIllustration/ImageIllustration";
import {Button,Input,Select,} from "../../components/FormComponents/FormComponents";
import Table from "./Table/Table";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

import EventImage from "../../assets/images/evento.svg";

// Constraints
const IdInstitution = "9eea5f2a-ad8f-4e37-8805-134171f59730";

const EventPage = () => {
  // Global
  const [isEditing, setIsEditing] = useState(false);

  // Event states
  const [eventId, setEventId] = useState("");
  const [eventTypeId, setEventTypeId] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Lists
  const [eventTypes, setEventTypes] = useState([]);
  const [events, setEvents] = useState([]);

  // Notification
  const [notifyUser, setNotifyUser] = useState({});

  // Sppiner
  const [showSpinner, setShowSpinner] = useState(false);


  async function register(event) {
    event.preventDefault();


    setShowSpinner(true);

    try {
      await api.post(eventsResource, getEventStates());

      loadEvents();
      resetForm();
      scrollToTable();
      notifySuccess("Evento criado com sucesso");
    } catch (err) {
      notifyError(
        "Houve um error ao enviar. Verifique a sua conexão com a internet!"
      );
    }

    setShowSpinner(false);
  }



  async function loadEventTypes() {
    setShowSpinner(true);

    try {
      const response = await api.get(eventTypesResource);
      const data = response.data.map((eventType) => {
        return { value: eventType.idTipoEvento, text: eventType.titulo };
      });
      setEventTypes(data);
    } catch (err) {
      notifyError(
        "Houve um error no carregamento de dados. Verifique a sua conexão com a internet!"
      );
    }

    setShowSpinner(false);
  }

  async function loadEvents() {
    setShowSpinner(true);

    try {
      const eventsResponse = await api.get(eventsResource);
      const data = eventsResponse.data.map((event) => {
        return {
          id: event.idEvento,
          title: event.nomeEvento,
          description: event.descricao,
          date: event.dataEvento.slice(0, 10),
          eventTypeId: event.idTipoEvento,
          eventTypeTitle: event.tiposEvento.titulo,
        };
      });
      setEvents(data);
    } catch (err) {
      notifyError(
        "Houve um error no carregamento de dados. Verifique a sua conexão com a internet!"
      );
      console.log(err);
    }

    setShowSpinner(false);
  }

  // Update

  async function update(event) {
    event.preventDefault();



    setShowSpinner(true);

    try {
      await api.put(`${eventsResource}/${eventId}`, getEventStates());

      loadEvents();
      resetForm();
      scrollToTable();
      notifySuccess("Evento atualizado com sucesso");
    } catch (err) {
      notifyError(
        "Houve um error ao atualizar. Verifique a sua conexão com a internet!"
      );
    }

    setShowSpinner(true);
  }

  function showEditForm(eventElement) {
    setIsEditing(true);

    setEventId(eventElement.id);
    setEventTitle(eventElement.title);
    setEventDescription(eventElement.description);
    setEventDate(eventElement.date);
    setEventTypeId(eventElement.eventTypeId);

    scrollUp();
  }

  // Delete

  async function deleteById(id) {
    if (!window.confirm("Deseja realmente excluir esse tipo de evento?"))
      return;

    try {
      api.delete(`${eventsResource}/${id}`);
      setEvents(events.filter((event) => event.id != id));
      notifySuccess("Evento removido com sucesso");
    } catch (err) {
      notifyError(
        "Houve um error ao deletar. Verifique a sua conexão com a internet!"
      );
    }
  }

  // Utils

  function resetForm() {
    setIsEditing(false);

    // Reseting event properties
    setEventId("");
    setEventTitle("");
    setEventDescription("");
    setEventDate("");
    setEventTypeId("");
  }

  function getEventStates() {
    return {
      dataEvento: eventDate,
      nomeEvento: eventTitle,
      descricao: eventDescription,
      idTipoEvento: eventTypeId,
      idInstituicao: IdInstitution,
    };
  }

  // Notification functions

  function notifySuccess(textNote) {
    setNotifyUser({
      titleNote: "Sucesso",
      textNote,
      imgIcon: "success",
      imgAlt:
        "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
      showMessage: true,
    });
  }

  function notifyError(textNote) {
    setNotifyUser({
      titleNote: "Erro",
      textNote,
      imgIcon: "danger",
      imgAlt:
        "Imagem de ilustração de erro. Homem segurando um balão com símbolo de X.",
      showMessage: true,
    });
  }

  function notifyWarning(textNote) {
    setNotifyUser({
      titleNote: "Aviso",
      textNote,
      imgIcon: "warning",
      imgAlt:
        "Imagem de ilustração de aviso. Mulher em frente a um grande ponto de exclamação.",
      showMessage: true,
    });
  }

  // Visual effects

  function scrollToTable() {
    const table = document.querySelector("table");
    table.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // On Mount

  useEffect(() => {
    loadEventTypes();
    loadEvents();
  }, []);

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      {showSpinner ? <Spinner /> : null}
      <main>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Title text="Cadastro de evento" />

              <ImageIllustration
                image={EventImage}
                altText="Imagem ilustrativa de evento."
              />

              <form
                className="ftipo-evento"
                onSubmit={isEditing ? update : register}
              >
                <Input
                  id="event-title"
                  name="event-title"
                  type="text"
                  value={eventTitle}
                  required={true}
                  placeholder="Nome"
                  handleChange={(e) => {
                    setEventTitle(e.target.value);
                  }}
                />

                <Input
                  id="event-description"
                  name="event-description"
                  type="text"
                  value={eventDescription}
                  placeholder="Descrição"
                  required={true}
                  handleChange={(e) => {
                    setEventDescription(e.target.value);
                  }}
                />

                <Input
                  id="event-date"
                  name="event-date"
                  type="date"
                  value={eventDate}
                  required={true}
                  handleChange={(e) => {
                    setEventDate(e.target.value);
                  }}
                />

                <Select
                  id="event-type-selector"
                  name="event-type-selector"
                  required={true}
                  options={eventTypes}
                  value={eventTypeId}
                  handleChange={(e) => {
                    setEventTypeId(e.target.value);
                  }}
                />

                {!isEditing ? (
                  <Button
                    id="sendButton"
                    name="sendButton"
                    textButton="Cadastrar"
                  />
                ) : (
                  <>
                    <div className="buttons-editbox">
                      <Button
                        id="updateButton"
                        name="updateButton"
                        textButton="Atualizar"
                        additionalClassName="button-component--middle"
                      />
                      <Button
                        id="cancelButton"
                        name="cancelButton"
                        textButton="Cancelar"
                        additionalClassName="button-component--middle"
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
            <Title text="Lista de Eventos" color="white" />
            <Table
              data={events}
              deleteFn={deleteById}
              showEditFormFn={showEditForm}
            />
          </Container>
        </section>
      </main>
    </>
  );
};

export default EventPage;
