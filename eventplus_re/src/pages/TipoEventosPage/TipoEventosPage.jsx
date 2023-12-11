import React, {useEffect, useState} from 'react';
import './TipoEventosPage.css';
import Title from '../../components/Title/Title';
import MainContent from '../../components/Main/MainContent';
import Container from '../../components/Container/Container';
import TableTp from './TableTp/TableTp';
import ImageIllustrator from '../../components/ImageIllustrator/ImageIllustrator';
import tipoEventoImg from '../../assets/images/images/tipo-evento.svg';
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { eventsTypeResource } from '../../services/service';
import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner';

const TipoEventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(false); //está em modo de edição?
    const [titulo, setTitulo] = useState("");
    const [idEvento, setIdEvento] = useState(null);
    const [tipoEvento, setTipoEvento] = useState([]);
    const [notifyUser, setNotifyUser] = useState();
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        async function loadEventsType() {
            setShowSpinner(true); 

            try {
                const retorno = await api.get(eventsTypeResource);
                setTipoEvento(retorno.data)
            } catch(error) {
                setNotifyUser({
                    titleNote: "Erro",
                    textNote: "Não foi possível carregar os próximos eventos. Verifique sua conexão.",
                    imgIcon: "danger",
                    imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
                    showMessage: true
                })
                console.log(error);
            }

            setShowSpinner(false);
        }
        //chama a função/api no carregamento da página/componente
        loadEventsType();
    }, []);

    /**
     * Função que adiciona um tipo de evento na API
     */
    async function handleSubmit(e) {
        e.preventDefault(); //evita o submit do form
        
        //valida se o título a ser cadastrado possui a quantidade mínima de caracteres
        if(titulo.trim().length < 3) {
            setNotifyUser({
                titleNote: "Aviso",
                textNote: "O título deve ter pelo menos 3 caracteres!",
                imgIcon: "warning",
                imgAlt: "",
                showMessage: true
            })
            return;
        }

        setShowSpinner(true);

        try {
            //cadastrar na API
            const retorno = await api.post(eventsTypeResource, {titulo:titulo});
            //limpa o state
            setTitulo(""); 
            //notifica o usuário que deu tudo certo
            setNotifyUser({
                titleNote: "Sucesso",
                textNote: "Tipo de evento cadastrado com sucesso",
                imgIcon: "success",
                imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                showMessage: true
            })
            //atualiza os dados
            const buscaEventos = await api.get(eventsTypeResource);
            setTipoEvento(buscaEventos.data);

        } catch(error) {
            //notifica o usuário que deu tudo errado
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Erro ao cadastrar tipo de evento. Verifique sua conexão.",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
                showMessage: true
            })
        }

        setShowSpinner(false);
    }
    
    /**
     * Função que mostra o formulário de edição do tipo de evento
    */
    async function showUpdateForm(idElement) {
        setFrmEdit(true);
        setIdEvento(idElement); //preenche o id do evento para poder atualizar

        setShowSpinner(true);

        try {
            const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
            setTitulo(retorno.data.titulo);
            console.log(retorno.data)
        } catch (error) {}

        setShowSpinner(false);
    }

    /**
    * Função que cancela a alteração do tipo de evento na API
    */
    function editActionAbort() {
        setFrmEdit(false);

        //reseta as variáveis
        setTitulo("");
        setIdEvento(null);
    }

    /**
    * Função que altera o tipo de evento na API
    */
    async function handleUpdate(e) {
        e.preventDefault(); //para o evento de submit

        setShowSpinner(true);

        try {
            //atualizar na API
            const retorno = await api.put(eventsTypeResource + "/" + idEvento, {"titulo":titulo}); //o id está no state
            if (retorno.status === 204) {
                //notifica o usuário que deu tudo certo
                setNotifyUser({
                    titleNote: "Sucesso",
                    textNote: "Tipo de evento atualizado com sucesso",
                    imgIcon: "success",
                    imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                    showMessage: true
                })
                //atualiza os dados
                const retorno = await api.get(eventsTypeResource);
                setTipoEvento(retorno.data);
                //reseta o state, volta para a tela de cadastro
                editActionAbort();
            }
        } catch (error) {
            //notifica o usuário que deu tudo errado
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Erro ao atualizar tipo de evento. Verifique sua conexão.",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
                showMessage: true
            })
        }

        setShowSpinner(false);
    }

    /**
     * Função que exclui um tipo de evento na API
     */
    async function handleDelete(idElement) {
        if(window.confirm("Certeza que deseja excluir este tipo de evento?")){

            setShowSpinner(true);

            try {
                const promise = await api.delete(eventsTypeResource + `/${idElement}`);

                console.log(promise.status);
    
                if(promise.status == 204){
                    setNotifyUser({
                        titleNote: "Sucesso",
                        textNote: "Tipo de evento excluído com sucesso",
                        imgIcon: "success",
                        imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok",
                        showMessage: true
                    })

                    //atualiza a tela
                    const buscaEventos = await api.get(eventsTypeResource);
                    setTipoEvento(buscaEventos.data);
                }
            } catch(error) {
                setNotifyUser({
                    titleNote: "Erro",
                    textNote: "Não foi possível excluir. Verifique sua conexão.",
                    imgIcon: "danger",
                    imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
                    showMessage: true
                })
                console.log(error)
            } 

            setShowSpinner(false);
        }

    }
    
    return (
        <>
        {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
        {showSpinner ? <Spinner /> : null}
            <MainContent>
                {/* SECTION DE CADASTRO E ATUALIZAÇÃO DE TIPO DE EVENTO */}
                <section className="cadastro-evento-section">
                    <Container>
                        <div className="cadastro-evento__box">
                            <Title titleText={"Cadastro Tipo de Eventos"}/>
                            
                            <ImageIllustrator imgRender={tipoEventoImg} />

                            <form className="ftipo-evento" onSubmit={frmEdit ? handleUpdate: handleSubmit}>
                                {/* cadastrar ou editar? */}
                                {!frmEdit ? (
                                    <>
                                        <Input
                                            id="Titulo"
                                            placeholder="Título"
                                            name={"titulo"}
                                            type={"text"}
                                            required={"required"}
                                            value={titulo}
                                            manipulationFunction={(e) => {setTitulo(e.target.value);}}
                                        />

                                        <Button textButton="Cadastrar" id="cadastrar" name="cadastrar" type="submit"/>
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            id="Titulo"
                                            placeholder=''
                                            name={"titulo"}
                                            type={"text"}
                                            required={"required"}
                                            value={titulo}
                                            manipulationFunction={(e) => {setTitulo(e.target.value);}}
                                        />

                                        <div className="buttons-editbox">
                                            <Button textButton="Atualizar" id="atualizar" name="atualizar" type="submit" additionalClass="button-component--middle" />
                                            <Button textButton="Cancelar" id="cancelar" name="cancelar" type="button" manipulationFunction={editActionAbort} additionalClass="button-component--middle" />
                                        </div>
                                    </>
                                )
                                }
                            </form>
                        </div>
                    </Container>
                </section>

                {/* SECTION DA TABELA DE TIPOS DE EVENTOS */}
                <section className="lista-eventos-section">
                    <Container>
                        <Title titleText={"Lista Tipo de Eventos"} color="white"/>
                        <TableTp
                            dados={tipoEvento}
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