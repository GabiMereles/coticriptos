import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

var Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

var Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
var Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  var [moneda, guardarMoneda] = useState('');
  var [criptomoneda, guardarCriptomoneda] = useState('');
  var [resultado, guardarResultado] = useState({});
  var [cargando, guardarCargando] = useState(false);



  useEffect( () => {

    var cotizarCriptomoneda = async () => {
        //evitamos la ejecucion la primera vez
        if(moneda === '') return;



    // consultar la api para obtener la cotizacion
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    var resultado = await axios.get(url);

        //mostrar cargando
        guardarCargando(true);

        //ocultar el spinner y moestrar resultado
        setTimeout(() => {
        //cambiar el estado de cargando
        guardarCargando(false);

        //Guarda la cotizacion
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda] );
      }, 3000);

       }  
      cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  // Mostrar Spinner o resultado

  var componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
      <Contenedor>
          <div>
            <Imagen
            src={imagen}
            alt="imagen cripto"/>
          </div>
          <div>
          <Heading> Cotiza criptomondeas al instante </Heading>
            <Formulario 
              guardarMoneda={guardarMoneda}
              guardarCriptomoneda={guardarCriptomoneda}
            />

              {componente}

           </div>
      </Contenedor>
  );
}

export default App;
