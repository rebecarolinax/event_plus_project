import React, { useEffect, useState } from "react";
import ImageIllustrator from "../../componentes/ImageIllustrator/ImageIllustrator";
import Titulo from "../../componentes/Titulo/Titulo";
import eventoImage from "../../assets/images/evento.svg";
import TableEv from "./TableEv/TableEv";
import "./EventosPage.css";
import MainContent from "../../componentes/MainContent/MainContent";
import {
  Input,
  Button,
  Select,
} from "../../componentes/FormComponents/FormComponents";
import api, { eventResource, eventsTypeResource } from "../../Services/Service";
import Container from "../../componentes/Container/Container";
import Notification from "../../componentes/Notification/Notification";
import Spinner from "../../componentes/Spinner/Spinner";

const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false); //esta em modo de edição?
  const [nomeEvento, setNomeEvento] = useState();
  const [descricaoEvento, setDescricaoEvento] = useState();
  const [idTipoEventos, setIdTipoEventos] = useState(null);
  const [idEvento, setIdEvento] = useState(null);
  const [date, setDate] = useState();

  const [eventos, setEventos] = useState([]); //array
  const [optionsTipoEventos, setOptionsTipoEventos] = useState([]);

  const [showSpinner, setShowSpinner] = useState(false); // componente notification
  const [notifyUser, setNotifyUser] = useState(); // componente notification

  const instituicaoId = "d0742109-c90b-43f4-bd0b-cbcaa0723939";

  async function loadEventsType() {
    try {
      const retorno = await api.get(eventsTypeResource);
      setOptionsTipoEventos(retorno.data);
      console.log(retorno);
    } catch (error) {
      console.log("Erro na API");
      console.log(error);
    }
  }

  //chamada do tipo de eventos na api
  async function loadEvents() {
    try {
      const retorno = await api.get(eventResource);
      setEventos(retorno.data);
      console.log(retorno);
    } catch (error) {
      console.log("Erro na API");
      console.log(error);
    }
  }

  useEffect(() => {
    // define  a chamda da nossa api
    loadEventsType();
    loadEvents();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (nomeEvento.trim().length < 3 || descricaoEvento.trim().length < 3) {
      notifyWarning("O título e a descrição dever ter ao menos 3 caracteres!");
      return;
    }

    setShowSpinner(true);
    try {
      const retorno = await api.post(eventResource, {
        dataEvento: date,
        nomeEvento: nomeEvento,
        descricao: descricaoEvento,
        idTipoEvento: idTipoEventos,
        idInstituicao: instituicaoId,
      });
      notify("Evento cadastrado com sucesso!");
      console.log(retorno);
      loadEvents();
      limparForms();
    } catch (error) {
      notifyDanger("Erro ao cadastrar. Verifique a sua conexão!");
    }
    setShowSpinner(false);
  }

  async function handleDelete(idElement) {
    setShowSpinner(true);
    try {
      const retorno = await api.delete(`${eventResource}/${idElement}`);
      if (retorno.status === 204) {
        notify("Evento excluído com sucesso!");
        loadEvents();
      }
    } catch (error) {
      notifyDanger("Erro ao deletar. Verifique a sua conexão!");
    }
    setShowSpinner(false);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setShowSpinner(true);
    try {
      const retorno = await api.put(`${eventResource}/${idEvento}`, {
        dataEvento: date,
        nomeEvento: nomeEvento,
        descricao: descricaoEvento,
        idTipoEvento: idTipoEventos,
        idInstituicao: instituicaoId,
      });
      console.log(retorno);
      if (retorno.status === 204) {
        notify("Evento atualizado com sucesso");
        const retorno = await api.get(eventResource);
        setEventos(retorno.data);
        editActionAbort();
        loadEvents();
      }
    } catch (error) {
      notifyDanger("Erro ao atualizar. Verifique a conexão!");
    }
    setShowSpinner(false);
  }

  async function showUpdateForm(idElement) {
    setFrmEdit(true);
    setIdEvento(idElement);
    setShowSpinner(true);
    try {
      const eventoBuscado = await api.get(
        `${eventResource}/${idElement}`,
        idElement
      );
      setNomeEvento(eventoBuscado.data.nomeEvento);
      setDescricaoEvento(eventoBuscado.data.descricao);
      setDate(eventoBuscado.data.dataEvento.slice(0, 10));
      setIdTipoEventos(eventoBuscado.data.idTipoEvento);
      console.log(eventoBuscado.data);
    } catch (error) {
      notifyDanger("Erro na tela de edição!");
    }
    setShowSpinner(false);
  }

  function editActionAbort() {
    setFrmEdit(false);
    setShowSpinner(true);
    limparForms();
    loadEventsType();
    setShowSpinner(false);
  }

  function notify(textNote) {
    setNotifyUser({
      titleNote: "Sucesso",
      textNote,
      imgIcon: "Success",
      imgAlt:
        "Imagem de ilustração de sucesso, Moça segurando um balão com símbolo de configuração ok",
      showMessage: true,
    });
  }

  function notifyWarning(textNote) {
    setNotifyUser({
      titleNote: "Alerta",
      textNote,
      imgIcon: "warning",
      imgAlt:
        "Imagem de ilustração de alerta, Moça chutando um símbolo de exclamação!",
      showMessage: true,
    });
  }
  function notifyDanger(textNote) {
    setNotifyUser({
      titleNote: "Error",
      textNote,
      imgIcon: "danger",
      imgAlt:
        "Imagem de ilustração de error, Homem segurando um balão com  símbolo de error!",
      showMessage: true,
    });
  }

  function limparForms() {
    setNomeEvento("");
    setDescricaoEvento("");
    setIdTipoEventos("");
    setDate("");
  }

  function dePara(retornoAPi) {
    let arrayOptions = [];
    retornoAPi.forEach((e) => {
      arrayOptions.push({ value: e.idTipoEvento, titulo: e.titulo });
    });
    return arrayOptions;
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      {showSpinner ? <Spinner /> : null}

      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Titulo titleText="Eventos" />
              <ImageIllustrator imageRender={eventoImage} />
              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit ? (
                  // cadastrar
                  <>
                    <Input
                      id="Nome"
                      placeholder="Nome"
                      name={"nome"}
                      type={"text"}
                      required={"required"}
                      value={nomeEvento}
                      manipulationFunction={(e) => {
                        setNomeEvento(e.target.value);
                      }}
                    />
                    <Input
                      id="Descricao"
                      placeholder="Descrição"
                      name={"descricao"}
                      type={"text"}
                      required={"required"}
                      value={descricaoEvento}
                      manipulationFunction={(e) => {
                        setDescricaoEvento(e.target.value);
                      }}
                    />
                    <Select
                      id="TipoEventos"
                      name={"tipoEventos"}
                      required={"required"}
                      options={dePara(optionsTipoEventos)}
                      value={idTipoEventos}
                      manipulationFunction={(e) => {
                        setIdTipoEventos(e.target.value);
                      }}
                    />
                    <Input
                      id="Date"
                      placeholder="dd/mm/aaaa"
                      name={"Date"}
                      type={"date"}
                      required={"required"}
                      value={date}
                      manipulationFunction={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                    <Button
                      textButton="Cadastrar"
                      id="cadastrar"
                      name="cadastrar"
                      type="submit"
                    />
                  </>
                ) : (
                  // editar
                  <>
                    <Input
                      id="Nome"
                      placeholder="Nome"
                      name={"nome"}
                      type={"text"}
                      required={"required"}
                      value={nomeEvento}
                      manipulationFunction={(e) => {
                        setNomeEvento(e.target.value);
                      }}
                    />
                    <Input
                      id="Descricao"
                      placeholder="Descrição"
                      name={"descricao"}
                      type={"text"}
                      required={"required"}
                      value={descricaoEvento}
                      manipulationFunction={(e) => {
                        setDescricaoEvento(e.target.value);
                      }}
                    />
                    <Select
                      id="TipoEventos"
                      name={"tipoEventos"}
                      required={"required"}
                      options={dePara(optionsTipoEventos)}
                      value={idTipoEventos}
                      manipulationFunction={(e) => {
                        setIdTipoEventos(e.target.value);
                      }}
                    />
                    <Input
                      id="Date"
                      placeholder="dd/mm/aaaa"
                      name={"Date"}
                      type={"date"}
                      required={"required"}
                      value={date}
                      manipulationFunction={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                    <div className="buttons-editbox">
                      <Button
                        additonalClass="button-component--middle"
                        textButton="Atualizar"
                        id="atualizar"
                        name="atualizar"
                        type="submit"
                        manipulationFunction={handleUpdate}
                      />
                      <Button
                        additonalClass="button-component--middle"
                        textButton="Cancelar"
                        id="cancelar"
                        name="cancelar"
                        type="submit"
                        manipulationFunction={editActionAbort}
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          </Container>
        </section>

        {/* Section card de eventos */}
        <section className="lista-eventos-section">
          <Container>
            <Titulo titleText={"Lista de Evento"} color="white" />
            <TableEv
              dados={eventos}
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default EventosPage;
