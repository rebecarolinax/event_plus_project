import React, { useEffect, useState } from 'react';
import api from '../../service/Service';
import { nextEventResource } from '../../service/Service';
import './HomePage.css';
import Notification from '../../components/Notification/Notification';

import Title from '../../components/Title/Title';
import MainContent from '../../components/Main/MainContent';
import Banner from '../../components/Banner/Banner';
import NextEvent from '../../components/NextEvent/NextEvent';
import Container from '../../components/Container/Container';
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection';

const HomePage = () => {
    //dados em "mocados"
    const [nextEvents, setNextEvents] = useState([]);
    const [notifyUser, setNotifyUser] = useState();

    //roda somente na inicialização do componente
    useEffect(() => {
        async function getNextEvents() {
            try {
                const promise = await api.get(nextEventResource)
                const dados = await promise.data;
                setNextEvents(dados); //atualiza o state
                console.log(dados);
            } 
            catch (error) {
                setNotifyUser({
                    titleNote: "Erro",
                    textNote: "Não foi possível carregar os próximos eventos. Verifique sua conexão.",
                    imgIcon: "danger",
                    imgAlt: "Imagem de ilustração de falha. Rapaz segurando um balão com símbolo x.",
                    showMessage: true
                })
            }
        }

        getNextEvents(); //roda a função
    }, [])

    return (
        <div>
            <MainContent>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
                <Banner/>

                <section className='proximos-eventos'>
                    <Container>
                        <Title titleText={"Próximos Eventos"}/>

                        <div className='events-box'>
                            {/* dentro da div event blocks nós criamos um código de javascript usando as chaves */}
                            {
                                // Aqui chamamos a array criada e criamos um componente para cada item dela
                                nextEvents.map((e) => {
                                    return (
                                        <NextEvent
                                            key={e.idEvento}
                                            idEvent={e.idEvento}
                                            title={e.nomeEvento}
                                            description={e.descricao}
                                            eventDate={e.dataEvento}
                                            
                                        />
                                    );
                                })
                            }
                        </div>
                    </Container>
                </section>

                <VisionSection/>
                <ContactSection/>
            </MainContent>
        </div>
    );
};

export default HomePage;