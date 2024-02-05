import React, { useContext, useEffect, useState } from "react";
import "./EventosAlunoPage.css";

import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Title/Title";
import TableEventosAluno from "./TableEventosAluno/TableEventosAluno";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Notification from "../../components/Notification/Notification";
import Modal from "../../components/Modal/Modal";
import { UserContext } from "../../context/AuthContext";
import api, {
  eventsResource,
  myEventsResource,
  presencesEventResource,
  eventsTypeResource,
  instituicaoResource,
} from "../../service/Service";

const EventosAlunoPage = () => {
  const [exibeNavbar, setExibeNavbar] = useState(false);
    const [eventos, setEventos] = useState([]); //Eventos para serem buscados
    // select mocado
    const [quaisEventos, setQuaisEventos] = useState([
        { value: 1, text: "Todos os eventos" },
        { value: 2, text: "Meus eventos" },
    ]);

    const [notifyUser, setNotifyUser] = useState(); //Componente Notification
    const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido É UMA STRING
    const [showSpinner, setShowSpinner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { userData, setUserData } = useContext(UserContext);

  async function loadStudentEventsType() {
    setShowSpinner(true); 
    if (tipoEvento === "1") {
      //todos os eventos
      try {
        const retornoTodosEventos = await api.get(eventsResource);

        const retornoEvntos = await api.get(`${myEventsResource}/${userData.userId}`);

        const eventosMarcados = verificaPresenca(retornoTodosEventos, retornoEvntos);

        setEventos(eventosMarcados);

        console.log("Todos eventos");
        console.log(retornoTodosEventos.data);
        console.log("MEus Eventos");
        console.log(retornoEvntos.data);
        console.log("eventos marcados");
        console.log(eventosMarcados.data);
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: "Erro ao carregar eventos. Verifique sua conexão.",
          imgIcon: "danger",
          imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
          showMessage: true,
        });
      }
    } else if (tipoEvento === "2") {
      /**
       * Lista os meus eventos (PresencasEventos) 
       * retorna um formato diferente de array
       */
      try {
        const retornoEventos = await api.get(`${myEventsResource}/${userData.userId}`);
        console.clear()
        console.log("MINHAS PRESENÇAS");
        console.log(retornoEventos.data);
        
        const arrEventos = [];//array vazio
        
        retornoEventos.data.forEach((e) => {arrEventos.push({...e.evento, situacao : e.situacao, idPresencaEvento : e.idPresencaEvento})});

        setEventos(arrEventos);
        
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: "Erro ao carregar eventos. Verifique sua conexão.",
          imgIcon: "danger",
          imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
          showMessage: true,
        });
      }
    } else {
      setEventos([]);
    }
    setShowSpinner(false);
}

  useEffect(() => {
    loadStudentEventsType();
  }, [tipoEvento]);

  const verificaPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {
      //para cada evento principal
      for (let i = 0; i < eventsUser.length; i++) {
        //procurar a correspondência em minhas presenças
        if(arrAllEvents[x].idEvento === eventsUser[i].eventos.idEvento) {
          arrAllEvents[x].situacao = true;
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break;//paro de procurar para o evento principal atual
        }
      }
    }
    
    return arrAllEvents;
  }

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }
  
  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  //remove o comentário
  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  //posta o comentário
  async function postMyCommentary(idCommentary) {
    return "????";
  }

  //carrega o comentário
  async function loadMyCommentary(idCommentary) {
    return "????";
  }

  async function handleConnect(eventId, whatTheFunction, presencaId = null) {
    //CONNECT
    if (whatTheFunction === "connect") {
      try {
        const promise = await api.post(presencesEventResource, {situacao : true, idUsuario : userData.userId, idEvento : eventId});

        if (promise.status === 201) {
          loadStudentEventsType();
        
          setNotifyUser({
            titleNote: "Sucesso",
            textNote: "Sua presença foi confirmada para este evento!",
            imgIcon: "success",
            imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
            showMessage: true
          })
        }
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: "Não foi possível se conectar ao evento. Verifique sua conexão.",
          imgIcon: "danger",
          imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
          showMessage: true,
          });
      }
      return;
    }

    //UNCONNECT - aqui seria o else
    try {
      const unconnect = api.delete(`${presencesEventResource}/${presencaId}`);

      if (unconnect.status === 204) {
        loadStudentEventsType();

        setNotifyUser({
          titleNote: "Sucesso",
          textNote: "Sua presença foi desconfirmada para este evento!",
          imgIcon: "success",
          imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true
          })
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: "Não foi possível se desconectar do evento. Verifique sua conexão.",
        imgIcon: "danger",
        imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
        });
    }
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      {showSpinner ? <Spinner /> : null}

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos}
            manipulationFunction={(e) => myEvents(e.target.value)} 
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <TableEventosAluno
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {showHideModal();}}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyCommentary}
          fnPost={postMyCommentary}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
