import React from 'react';
import './VisionSection.css';
import Title from '../Title/Title';

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className='vision__box'>
                <Title titleText={"Visão"} color='white' />
                <p className='vision__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sed voluptatem, aperiam repellat nemo et commodi sunt veritatis deserunt pariatur voluptate numquam minus perspiciatis autem ratione facere quos eveniet? Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores itaque quo et aspernatur alias ratione consectetur placeat amet laborum perferendis quos sunt, labore aliquid at vero sit voluptates ipsum fuga!</p>
            </div>
        </section>
    );
};

export default VisionSection;