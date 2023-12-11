import React from 'react';
import Title from '../Title/Title';
import './VisionSection.css'

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className="vision__box">
                <Title titleText={"Visão"} color="white" nomeClass='vision__title'/>
                <p className='vision__text'>A visão do SENAI é consolidar-se como o líder nacional em educação profissional e tecnológica e ser reconhecido como indutor da inovação e da transferência de tecnologias para a Indústria Brasileira, atuando com padrão internacional de excelência.</p>
            </div>
        </section>
    );
};

export default VisionSection;