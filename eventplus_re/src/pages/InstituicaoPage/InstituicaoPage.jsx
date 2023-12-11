import React, {useEffect, useState} from 'react';
import './InstituicaoPage.css';
import Title from '../../components/Title/Title';
import MainContent from '../../components/Main/MainContent';
import Container from '../../components/Container/Container';
import TableInstituicao from './TableInstituicao/TableInstituicao';
import ImageIllustrator from '../../components/ImageIllustrator/ImageIllustrator';
import tipoEventoImg from '../../assets/images/images/tipo-evento.svg';
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { instituicaoResource } from '../../Services/Service';
import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner';

const InstituicaoPage = () => {
    const [frmEdit, setFrmEdit] = useState(false); //está em modo de edição?
    const [nomeFantasia, setNomeFantasia] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");
    const [idInstituicao, setIdInstituicao] = useState(null);
    const [instituicao, setInstituicao] = useState([]);
    const [notifyUser, setNotifyUser] = useState();
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        async function loadInstituicao() {
            setShowSpinner(true); 

            try {
                const retorno = await api.get(instituicaoResource);
                setInstituicao(retorno.data)
                console.log(idInstituicao);
                console.log(instituicao);
            } catch(error) {
                setNotifyUser({
                    titleNote: "Erro",
                    textNote: "Não foi possível carregar as instituições. Verifique sua conexão.",
                    imgIcon: "danger",
                    imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
                    showMessage: true
                })
                console.log(error);
            }

            setShowSpinner(false);
        }
        //chama a função/api no carregamento da página/componente
        loadInstituicao();
    }, []);

    /**
     * Função que adiciona uma instituição na API
     */
    async function handleSubmit(e) {
        e.preventDefault(); //evita o submit do form
        
        //valida se o título a ser cadastrado possui a quantidade mínima de caracteres
        if(nomeFantasia.trim().length < 3) {
            setNotifyUser({
                titleNote: "Aviso",
                textNote: "O nome fantasia deve ter pelo menos 3 caracteres!",
                imgIcon: "warning",
                imgAlt: "",
                showMessage: true
            })
            return;
        }

        setShowSpinner(true);

        try {
            //cadastrar na API
            const retorno = await api.post(instituicaoResource, {nomeFantasia:nomeFantasia, cnpj:cnpj, endereco:endereco});
            //limpa o state
            setNomeFantasia(""); 
            //notifica o usuário que deu tudo certo
            setNotifyUser({
                titleNote: "Sucesso",
                textNote: "Instituição cadastrada com sucesso",
                imgIcon: "success",
                imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                showMessage: true
            })
            //atualiza os dados
            const buscaInstituicoes = await api.get(instituicaoResource);
            setInstituicao(buscaInstituicoes.data); 

        } catch(error) {
            //notifica o usuário que deu tudo errado
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Erro ao cadastrar instituição. Verifique sua conexão.",
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
        setIdInstituicao(idElement); //preenche o id do evento para poder atualizar

        setShowSpinner(true);

        try {
            const retorno = await api.get(`${instituicaoResource}/${idElement}`);
            setNomeFantasia(retorno.data.nomeFantasia);
            setCnpj(retorno.data.cnpj);
            setEndereco(retorno.data.endereco);
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
        setNomeFantasia("");
        setCnpj("");
        setEndereco("");
        setIdInstituicao(null);
    }

    /**
    * Função que altera o tipo de evento na API
    */
    async function handleUpdate(e) {
        e.preventDefault(); //para o evento de submit

        setShowSpinner(true);

        try {
            //atualizar na API
            const retorno = await api.put(instituicaoResource + "/" + idInstituicao, {"nomeFantasia":nomeFantasia, cnpj:cnpj, endereco:endereco}); //o id está no state
            if (retorno.status === 204) {
                //notifica o usuário que deu tudo certo
                setNotifyUser({
                    titleNote: "Sucesso",
                    textNote: "Instituição atualizada com sucesso",
                    imgIcon: "success",
                    imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                    showMessage: true
                })
                //atualiza os dados
                const retorno = await api.get(instituicaoResource);
                setInstituicao(retorno.data);
                //reseta o state, volta para a tela de cadastro
                editActionAbort();
            }
        } catch (error) {
            //notifica o usuário que deu tudo errado
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Erro ao atualizar instituição. Verifique sua conexão.",
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
        if(window.confirm("Certeza que deseja excluir esta instituição?")){

            setShowSpinner(true);

            try {
                const promise = await api.delete(instituicaoResource + `/${idElement}`);

                console.log(promise.status);
    
                if(promise.status == 204){
                    setNotifyUser({
                        titleNote: "Sucesso",
                        textNote: "Instituição excluída com sucesso",
                        imgIcon: "success",
                        imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok",
                        showMessage: true
                    })

                    //atualiza a tela
                    const buscaInstituicoes = await api.get(instituicaoResource);
                    setInstituicao(buscaInstituicoes.data);
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
                            <Title titleText={"Cadastro de Instituições"}/>
                            
                            <ImageIllustrator imgRender={tipoEventoImg} />

                            <form className="ftipo-evento" onSubmit={frmEdit ? handleUpdate: handleSubmit}>
                                {/* cadastrar ou editar? */}
                                {!frmEdit ? (
                                    <>
                                        <Input
                                            id="NomeFantasia"
                                            placeholder="Nome fantasia"
                                            name={"nomeFantasia"}
                                            type={"text"}
                                            required={"required"}
                                            value={nomeFantasia}
                                            manipulationFunction={(e) => {setNomeFantasia(e.target.value);}}
                                        />

                                        <Input
                                            id="CNPJ"
                                            placeholder="CNPJ"
                                            name={"cnpj"}
                                            type={"text"}
                                            required={"required"}
                                            value={cnpj}
                                            manipulationFunction={(e) => {setCnpj(e.target.value);}}
                                        />

                                        <Input
                                            id="Endereco"
                                            placeholder="Endereço"
                                            name={"endereco"}
                                            type={"text"}
                                            required={"required"}
                                            value={endereco}
                                            manipulationFunction={(e) => {setEndereco(e.target.value);}}
                                        />

                                        <Button textButton="Cadastrar" id="cadastrar" name="cadastrar" type="submit"/>
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            id="NomeFantasia"
                                            placeholder=''
                                            name={"nomeFantasia"}
                                            type={"text"}
                                            required={"required"}
                                            value={nomeFantasia}
                                            manipulationFunction={(e) => {setNomeFantasia(e.target.value);}}
                                        />

                                        <Input
                                            id="CNPJ"
                                            placeholder=''
                                            name={"cnpj"}
                                            type={"text"}
                                            required={"required"}
                                            value={cnpj}
                                            manipulationFunction={(e) => {setCnpj(e.target.value);}}
                                        />

                                        <Input
                                            id="Endereco"
                                            placeholder=''
                                            name={"endereco"}
                                            type={"text"}
                                            required={"required"}
                                            value={endereco}
                                            manipulationFunction={(e) => {setEndereco(e.target.value);}}
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
                        <Title titleText={"Lista de Instituições"} color="white"/>
                        <TableInstituicao
                            dados={instituicao}
                            fnUpdate={showUpdateForm}
                            fnDelete={handleDelete}
                        />
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default InstituicaoPage;