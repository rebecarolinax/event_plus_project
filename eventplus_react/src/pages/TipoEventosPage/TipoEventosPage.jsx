import React, { useEffect, useState } from "react";
import Titulo from "../../componentes/Titulo/Titulo";
import MainContent from "../../componentes/MainContent/MainContent";
import Container from "../..//componentes/Container/Container";
import ImageIllustrator from "../../componentes/ImageIllustrator/ImageIllustrator";
import tipoEventoImagem from "../../assets/images/tipo-evento.svg";
import TableTp from "./TableTp/TableTp";
import { Input, Button } from "../../componentes/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../Services/Service";
import Notification from "../../componentes/Notification/Notification";
import Spinner from "../../componentes/Spinner/Spinner";
import "./TipoEventosPage.css";

const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false); //esta em modo de edição?
  const [titulo, setTitulo] = useState();
  const [idEvento, setIdEvento] = useState(null);
  const [tipoEventos, setTipoEvento] = useState([]); //array
  const [notifyUser, setNotifyUser] = useState(); // componente notification
  const [showSpinner, setShowSpinner] = useState(false); // componente notification

  useEffect(() => {
    // define  a chamda da nossa api
    async function loadEventsType() {
      setShowSpinner(true);
      try {
        const retorno = await api.get(eventsTypeResource);
        setTipoEvento(retorno.data);
        console.log(retorno);
      } catch (error) {
        console.log("Erro na API");
        console.log(error);
      }
      setShowSpinner(false);
    }

    loadEventsType();
  }, []);

  async function loadEventsType() {
    setShowSpinner(true);
    try {
      const retorno = await api.get(eventsTypeResource);
      setTipoEvento(retorno.data);
      console.log(retorno);
    } catch (error) {
      console.log("Erro na API");
      console.log(error);
    }
    setShowSpinner(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (titulo.trim().length < 3) {
      notifyWarning("O título dever ter ao menos 3 caracteres!");
      return;
    }
    setShowSpinner(true);
    try {
      const retorno = await api.post(eventsTypeResource, {
        titulo,
      });

      setTitulo("");
      notify("Tipo de Evento cadastrado com sucesso!");
      console.log(retorno);
      loadEventsType();
    } catch (error) {
      notifyDanger("Erro ao cadastrar. Verifique a conexão!");
    }
    setShowSpinner(false);
  }

  //* APAGAR DADOS
  //apaga o tipo de evento na api
  async function handleDelete(idElement) {
    setShowSpinner(true);
    try {
      const retorno = await api.delete(`${eventsTypeResource}/${idElement}`);
      if (retorno.status === 204) {
        notify("Tipo de Evento excluído com sucesso!");
        loadEventsType();
      }
    } catch (error) {
      notifyDanger("Erro ao deletar. Verifique a conexão!");
    }
    setShowSpinner(false);
  }

  // EDIÇÃO DOS DADOS
  //mostra o formulário de edição
  async function showUpdateForm(idElement) {
    setFrmEdit(true);
    setIdEvento(idElement);
    try {
      const eventoBuscado = await api.get(
        `${eventsTypeResource}/${idElement}`,
        idElement
      );
      setTitulo(eventoBuscado.data.titulo);
      console.log(eventoBuscado.data);
    } catch (error) {}
  }

  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
    setIdEvento(null);
  }

  // cancela a tela de edição (volta para a tela de cadastro)
  async function handleUpdate(e) {
    e.preventDefault();
    if (titulo.trim().length < 3) {
      notifyWarning("O título dever ter ao menos 3 caracteres!");
      return;
    }
    setShowSpinner(true);
    try {
      const retorno = await api.put(`${eventsTypeResource}/${idEvento}`, {
        titulo,
      });
      console.log(retorno);
      if (retorno.status === 204) {
        notify("Tipo de Evento atualizado com sucesso");
        const retorno = await api.get(eventsTypeResource);
        setTipoEvento(retorno.data);
        editActionAbort();
        loadEventsType();
      }
    } catch (error) {
      notifyDanger("Erro ao atualizar. Verifique a conexão!");
    }
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
      titleNote: "Erro",
      textNote,
      imgIcon: "danger",
      imgAlt:
        "Imagem de ilustração de error, Homem segurando um balão com  símbolo de error!",
      showMessage: true,
    });
  }
  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

      {showSpinner ? <Spinner /> : null}
      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Titulo titleText={"Tipo Eventos"} />

              <ImageIllustrator imageRender={tipoEventoImagem} />
              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit ? (
                  // cadastrar
                  <>
                    <Input
                      id="Titulo"
                      placeholder="Título"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />
                    {/* <span>{titulo}</span> */}
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
                      id="Titulo"
                      placeholder="Título"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
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

        <section className="lista-eventos-section">
          <Container>
            <Titulo titleText={"Lista Tipo de Evento"} color="white" />
            <TableTp
              dados={tipoEventos}
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TipoEventosPage;
