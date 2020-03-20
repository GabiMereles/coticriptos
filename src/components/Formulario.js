import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

var Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

var  Formulario = ({guardarMoneda,  guardarCriptomoneda }) => {

    // State del listado de criptomonedas
    var[ listacripto, guardarCriptomonedas ] = useState([]);
    var[error, guardarError]= useState(false);

    var MONEDAS = [
     {codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
     {codigo: 'EUR', nombre: 'Euro' }

    ];

    // Utilizamos useMoneda
    var [ moneda, SelectMonedas ] = useMoneda('Elije tu Moneda', '', MONEDAS);
    
    // Ytilizar useCriptomoneda
    var [criptomoneda, SelectCripto] =useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    //Ejecutar el llamado a la Api
    useEffect(() => {
        var consultarApi=async() => {
            var url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            var resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarApi();
    }, []);


    // Cuando el usaurio hace submit
    var cotizarMoneda = e => {
        e.preventDefault();

        //validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        //pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
        

    }

    return ( 
         <form
             onSubmit={cotizarMoneda}
         >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}

            <SelectMonedas />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
        );
}   
export default Formulario;