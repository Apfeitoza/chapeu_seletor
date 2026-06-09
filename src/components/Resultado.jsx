import React from 'react';
import useLocalStorage from './useLocalStorage';
import { useNavigate } from 'react-router-dom';


const Resultado = () => {
  const [casaSelecionada] = useLocalStorage('casa');
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        Resultado: <span>{casaSelecionada.toUpperCase()}</span>{' '}
      </h1>
      <button onClick={()=> navigate('/')}>Voltar</button>
    </div>
  );
};

export default Resultado;
