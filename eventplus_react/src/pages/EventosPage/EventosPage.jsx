import React, {useEffect, useState} from 'react';
import './EventosPage.css';
import Title from '../../components/Title/Title';
import MainContent from '../../components/Main/MainContent';
import Container from '../../components/Container/Container';
import ImageIllustrator from '../../components/ImageIllustrator/ImageIllustrator';
import eventoImg from '../../assets/images/images/evento.svg';
import { Input, Button, Select } from "../../components/FormComponents/FormComponents";
import api, { eventsResource, eventsTypeResource, instituicaoResource } from '../../service/Service';
import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner';
import TableEvento from './TableEvento/TableEvento';

const EventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(false); //está em modo de edição?
    const [nomeEvento, setNomeEvento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataEvento, setDataEvento] = useState("");
    const [evento, setEvento] = useState([]);
    const [tiposEvento, setTipoEventos] = useState([]); 
    const [idTipoEvento, setIdTipoEvento] = useState('');
    const [instituicao, setInstituicao] = useState([]);
    const [idInstituicao, setIdInstituicao] = useState('');
    const [notifyUser, setNotifyUser] = useState();
    const [showSpinner, setShowSpinner] = useState(false);

    async function loadEventsType() {

        setShowSpinner(true);
        try {
            const retorno = await api.get(eventsTypeResource);
            setTipoEventos(retorno.data)
        }

        catch (error) {
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Erro ao cadastrar evento. Verifique sua conexão.",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
                showMessage: true
            })

        } setShowSpinner(false);
    }

    async function loadInstituicao() {

        setShowSpinner(true);
        try {
            const retorno = await api.get(instituicaoResource);
            setIdInstituicao(retorno.data)
        }

        catch (error) {
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Erro ao cadastrar evento. Verifique sua conexão.",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
                showMessage: true
            })

        } setShowSpinner(false);
    }

    async function loadEvents() {
        setShowSpinner(true); 

        try {
            const retorno = await api.get(eventsResource);
            setEvento(retorno.data)
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

    useEffect(() => {
        loadEventsType()
        loadInstituicao()
        loadEvents()
    }, []);

    /**
     * Função que chama a listagem de tipos de eventos pro select
     */
    function tituloTipo(tipoEventos) {
        let arrayOptions = []

        tipoEventos.forEach(element => {
            arrayOptions.push({ value: element.idTipoEvento, text: element.titulo })
        })
        return arrayOptions
    }

    /**
     * Função que chama a listagem de instituições pro select
     */
    function tituloInstituicao(instituicao) {
        let arrayOptions = []

        instituicao.forEach(element => {
            arrayOptions.push({ value: element.idInstituicao, text: element.nomeFantasia })
        })
        return arrayOptions
    }

    /**
     * Função que adiciona um evento na API
     */
    async function handleSubmit(e) {
        e.preventDefault(); //evita o submit do form
        
        // valida se o nome a ser cadastrado possui a quantidade mínima de caracteres
        if(nomeEvento.trim().length < 3) {
            setNotifyUser({
                titleNote: "Aviso",
                textNote: "O nome do evento deve ter pelo menos 3 caracteres!",
                imgIcon: "warning",
                imgAlt: "",
                showMessage: true
            })
            return;
        }

        setShowSpinner(true);

        try {
            // cadastrar na API
            const retorno = await api.post(eventsResource, {nomeEvento:nomeEvento, descricao:descricao, dataEvento:dataEvento, idTipoEvento:idTipoEvento, idInstituicao:idInstituicao});
            // limpa o state
            setNomeEvento(""); 
            // notifica o usuário que deu tudo certo
            setNotifyUser({
                titleNote: "Sucesso",
                textNote: "Evento cadastrado com sucesso",
                imgIcon: "success",
                imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                showMessage: true
            })
            // atualiza os dados
            const buscaEventos = await api.get(eventsResource);
            setEvento(buscaEventos.data);

        } catch(error) {
            // notifica o usuário que deu tudo errado
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Erro ao cadastrar evento. Verifique sua conexão.",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
                showMessage: true
            })
        }

        setShowSpinner(false);
    }
    
    // /**
    //  * Função que mostra o formulário de edição do tipo de evento
    // */
    // async function showUpdateForm(idElement) {
    //     setFrmEdit(true);
    //     setIdEvento(idElement); //preenche o id do evento para poder atualizar

    //     setShowSpinner(true);

    //     try {
    //         const retorno = await api.get(`${eventsResource}/${idElement}`);
    //         setTitulo(retorno.data.titulo);
    //         console.log(retorno.data)
    //     } catch (error) {}

    //     setShowSpinner(false);
    // }

    // /**
    // * Função que cancela a alteração do tipo de evento na API
    // */
    // function editActionAbort() {
    //     setFrmEdit(false);

    //     reseta as variáveis
    //     setTitulo("");
    //     setIdEvento(null);
    // }

    /**
    * Função que altera o tipo de evento na API
    */
    async function handleUpdate(e) {
        e.preventDefault(); //para o evento de submit

        setShowSpinner(true);

        try {
           
        } catch (error) {
            
        }

        setShowSpinner(false);
    }

    /**
     * Função que exclui um evento na API
     */
    async function handleDelete(idElement) {
        if(window.confirm("Certeza que deseja excluir este evento?")){

            setShowSpinner(true);

            try {
                const promise = await api.delete(eventsResource + `/${idElement}`);

                console.log(promise.status);
    
                if(promise.status == 204){
                    setNotifyUser({
                        titleNote: "Sucesso",
                        textNote: "Evento excluído com sucesso",
                        imgIcon: "success",
                        imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok",
                        showMessage: true
                    })

                    //atualiza a tela
                    const buscaEventos = await api.get(eventsResource);
                    setEvento(buscaEventos.data);
                }
            } catch(error) {
                alert("Problemas para excluir o evento");
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
                {/* SECTION DE CADASTRO E ATUALIZAÇÃO DO EVENTO */}
                <section className="cadastro-evento-section">
                    <Container>
                        <div className="cadastro-evento__box">
                            <Title titleText={"Cadastro de Eventos"}/>
                            
                            <ImageIllustrator imgRender={eventoImg} />

                            <form className="f-evento" onSubmit={frmEdit ? handleUpdate: handleSubmit}>
                                {/* cadastrar ou editar? */}
                                {!frmEdit ? (
                                    // Nome
                                    <>
                                        <Input
                                            id="Nome"
                                            placeholder="Nome"
                                            name={"nomeEvento"}
                                            type={"text"}
                                            required={"required"}
                                            value={nomeEvento}
                                            manipulationFunction={(e) => {setNomeEvento(e.target.value);}}
                                        />

                                        <Input
                                            id="Descricao"
                                            placeholder="Descrição"
                                            name={"descricao"}
                                            type={"text"}
                                            required={"required"}
                                            value={descricao}
                                            manipulationFunction={(e) => {setDescricao(e.target.value);}}
                                        />

                                        <Select
                                            id='TiposEvento'
                                            name={'tiposEvento'}
                                            required={'required'}
                                            options={tituloTipo(tiposEvento)}
                                            value={idTipoEvento}
                                            manipulationFunction={(e) => {setIdTipoEvento(e.target.value)}}
                                        />

                                        <Select
                                            id='Instituicao'
                                            name={'instituicao'}
                                            required={'required'}
                                            options={tituloInstituicao(instituicao)}
                                            value={idInstituicao}
                                            manipulationFunction={(e) => {setIdInstituicao(e.target.value)}}
                                        />

                                        <Input
                                            id="DataEvento"
                                            // placeholder="dd/mm/aaaa"
                                            name={"dataEvento"}
                                            type={"date"} //MUDAR!!
                                            required={"required"}
                                            value={dataEvento}
                                            manipulationFunction={(e) => {setDataEvento(e.target.value);}}
                                        />

                                        <Button textButton="Cadastrar" id="cadastrar" name="cadastrar" type="submit"/>
                                    </>
                                ) : (
                                    <></>
                                    // <>
                                    //     <Input
                                    //         id="Nome"
                                    //         placeholder=""
                                    //         name={"nomeEvento"}
                                    //         type={"text"}
                                    //         required={"required"}
                                    //         value={nomeEvento}
                                    //         manipulationFunction={(e) => {setNomeEvento(e.target.value);}}
                                    //     />

                                    //     <Input
                                    //         id="Descricao"
                                    //         placeholder=""
                                    //         name={"descricao"}
                                    //         type={"text"}
                                    //         required={"required"}
                                    //         value={descricao}
                                    //         manipulationFunction={(e) => {setDescricao(e.target.value);}}
                                    //     />

                                    //     <Select
                                    //         id="TipoEvento"
                                    //         placeholder=""
                                    //         name={"tipoEvento"}
                                    //         type={"text"} 
                                    //         required={"required"}
                                    //         value={tipoEvento}
                                    //         manipulationFunction={(e) => {setTipoEvento(e.target.value);}}
                                    //     />

                                    //     <Select
                                    //         id="Instituicao"
                                    //         placeholder=""
                                    //         name={"instituicao"}
                                    //         type={"text"} 
                                    //         required={"required"}
                                    //         value={instituicao}
                                    //         manipulationFunction={(e) => {setInstituicao(e.target.value);}}
                                    //     />

                                    //     <Input
                                    //         id="DataEvento"
                                    //         // placeholder=""
                                    //         name={"dataEvento"}
                                    //         type={"date"} //MUDAR!!
                                    //         required={"required"}
                                    //         value={dataEvento}
                                    //         manipulationFunction={(e) => {setDataEvento(e.target.value);}}
                                    //     />

                                    //     <div className="buttons-editbox">
                                    //         <Button textButton="Atualizar" id="atualizar" name="atualizar" type="submit" additionalClass="button-component--middle" />
                                    //         <Button textButton="Cancelar" id="cancelar" name="cancelar" type="button" manipulationFunction={editActionAbort} additionalClass="button-component--middle" />
                                    //     </div>
                                    // </>
                                )
                                }
                            </form>
                        </div>
                    </Container>
                </section>

                
                {/* SECTION DA TABELA DE EVENTOS */}
                <section className="lista-eventos-section">
                    <Container>
                        <Title titleText={"Lista de Eventos"} color="white"/>
                        <TableEvento
                            dados={evento}
                            // fnUpdate={showUpdateForm}
                            fnDelete={handleDelete}
                        />
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default EventosPage;