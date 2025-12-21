import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import camisetas from '../../assets/concepto-de-maqueta-de-camisa-con-ropa-sencilla.jpg';
import camisas from '../../assets/fujiphilm-L9mmEncrB6M-unsplash.jpg';
import camisetaBlanca from '../../assets/haryo-setyadi-acn5ERAeSb4-unsplash.jpg';
import chanclas from '../../assets/jakob-owens-WzncgWs3RJ4-unsplash.jpg';
import reloj from '../../assets/saif71-com-brqTWpFkmSQ-unsplash.jpg';
import '../components/Abaut.css';

const AbautHome= () => {
  return (
    <div className='about-landing'>
      <section
        className='about-section'
        style={{ backgroundImage: `url(${chanclas})` }}
      >
        <div className='about-overlay'></div>
        <div className='about-content'>
          <h1 className='about-title'>A Game to Be Explored</h1>
          <p className='about-subtitle'>About manners</p>
        </div>
      </section>

      <section className='about-seccion'>
        <div className='about-image'>
          <img src={reloj} alt='Reloj' />
        </div>

        <div className='about-contenido'>
          <h2>Golf Is Seriously Hard</h2>
          <p>
            Hola, ¿qué tal? brkjfrfnewirnferwnjfwnfrnerkkjjkgberjbjbvjbvbjbrfejekjvjn
            jfvfvjvjvrjenvvjnejrnvjnrejvellenvrlnreelnrkvvelnrkvklnerfnel
            erbkbekjrvervrerjnevnjlrevnvnjernvjfjnnvjlenjjnvnjervnvrelnnvejr
            vfkbverfjjnkrevnjervfnjvrjnrnjvnjkefrnjfrfrenjrnjffr
            jv frb herbh vebrhkvbnjkbnjrkenbjkrnjkfrnbjkrbnvjkrbnjkverv
            rvekbhvrejnkjknvfrenjvrejnnjkvrnklfrewnklfelnkfwerknlklnfreknlfr
            frekbhefrvbhjkfbrjkefbjkrebnjkefrbnjfjrnejfnkrjnbkfrjknnjkr
            refkbvrfebjfbhjkrbfjkhrjkfdejwnjnfewjlnkfewljknbjkncfeejbdwk
          </p>
        </div>
      </section>
    </div>
  );
};

export default AbautHome;
