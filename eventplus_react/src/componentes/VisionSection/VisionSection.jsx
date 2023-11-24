import React from "react";
import "./VisionSection.css";
import Titulo from "../Titulo/Titulo";

const VisionSection = () => {
  return (
    <section className="vision">
      <div className="vision__box">
        <Titulo titleText={"Visão"} color="white" potatoClass="vision__title" />
        <p className="vision__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
          incidunt cumque fuga facilis dolorem illo rerum libero reprehenderit,
          assumenda commodi maiores laboriosam, consequuntur est? Pariatur
          exercitationem quisquam unde nulla incidunt,Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Unde, recusandae! Quas earum
          inventore beatae delectus nobis, odio nihil blanditiis, commodi
          dignissimos aut, sit iste pariatur voluptatum exercitationem excepturi
          praesentium. Accusamus!
        </p>
      </div>
    </section>
  );
};

export default VisionSection;
