import React from 'react';
import styled from '@emotion/styled';

 var ResultadoDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

 var Info = styled.p`
    font-size: 18px;
    span {
        font-weight:bold;
    }
`;
  var Precio = styled.p`
    font-size: 30px;

    span {
        font-weight:bold;
    }
`

var Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;

    console.log(resultado)

    return ( 
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span> </Precio>
            <Info>Precio mas alto del dia: <span>{resultado.HIGHDAY}</span> </Info>
            <Info>Precio mas bajo del dia: <span>{resultado.LOWDAY}</span> </Info>
            <Info>Variación en las ultimas 24hs: <span>{resultado.CHANGEPCT24HOUR}</span> </Info>
            <Info>Última actualización: <span>{resultado.LASTUPDATE}</span> </Info>
        </ResultadoDiv>
     );
}
 
export default Cotizacion;