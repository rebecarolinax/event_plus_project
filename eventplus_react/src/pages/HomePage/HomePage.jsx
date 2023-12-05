import React, { useEffect, useState } from 'react';
import './HomePage.css';

import Banner from '../../components/Banner/Banner';
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import NextEvent from '../../components/NextEvent/NextEvent';
import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';

import api, { listNextEventsResource }  from '../../services/service';

import Notification from '../../components/Notification/Notification';

const HomePage = () => {
    const [nextEvents, setNextEvents] = useState([]);
    const [notifyUser, setNotifyUser] = useState()

    const getNextEvents = async () => {
        try {
            const promise = await api.get(listNextEventsResource);
            const data = promise.data;

            setNextEvents(data);
        }
        catch(error) {
            notifyError('Houve um error no carregamento de informações. Verifique a sua conexão com a internet!')
        }
    }

    useEffect(() => {
        getNextEvents();
    }, []);

    function notifyError(textNote) {
        setNotifyUser({
            titleNote: "Erro",
            textNote,
            imgIcon: 'danger',
            imgAlt: 'Imagem de ilustração de erro. Homem segurando um balão com símbolo de X.',
            showMessage: true
        });
    }

    return (
        <>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
            <main>
                <Banner />
                <section className='proximos-eventos'>
                    <Container>
                        <Title text='Próximos Eventos' />

                        <div className="events-box">
                            { nextEvents.map(nextEvent => {
                                return (
                                    <NextEvent key={ nextEvent.idEvento }
                                            title={ nextEvent.nomeEvento } 
                                            description={ nextEvent.descricao } 
                                            date={ nextEvent.dataEvento } 
                                            idEvent={ nextEvent.idEvento } />
                                )
                            })}
                        </div>
                    </Container>
                </section>
                <VisionSection />
                <ContactSection />
            </main>
        </>
    );
};

export default HomePage;