import React from 'react';
import './HomePage.css';
import Title from '../../components/Title/Title';
import MainContent from '../../components/Main/MainContent';
import Banner from '../../components/Banner/Banner';
import NextEvent from '../../components/NextEvent/NextEvent';
import Container from '../../components/Container/Container';
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection';

const HomePage = () => {
    return (
        <div>
            <MainContent>
                <Banner/>

                <section className='proximos-eventos'>
                    <Container>
                        <Title titleText={"Próximos Eventos"}/>

                        <div className='events-box'>
                            <NextEvent
                                title={"AMO MEU NAMORADO"}
                                description={"Gustavo"}
                                eventDate={"10/11/2023"}
                                idEvent={"JKSNDXKJD"}
                            />
                            <NextEvent
                                title={"AMO MEU NAMORADO"}
                                description={"Gustavo"}
                                eventDate={"11/11/2023"}
                                idEvent={"KJFKGRG"}
                            />
                            <NextEvent
                                title={"AMO MEU NAMORADO"}
                                description={"Gustavo"}
                                eventDate={"12/11/2023"}
                                idEvent={"SDLFMLFLK"}
                            />
                            <NextEvent
                                title={"AMO MEU NAMORADO"}
                                description={"Gustavo"}
                                eventDate={"13/11/2023"}
                                idEvent={"LKJIJFIHF"}
                            />
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