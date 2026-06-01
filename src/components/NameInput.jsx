import React from 'react';

const NameInput = ({ onSubmit, onChange, input, type, id }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor={id}>Caro aluno, nos informe seu nome!</label>
      <input
        type={type}
        id={id}
        value={input}
        onChange={onChange}        
      />
      <button type='submit'>Enviar</button>
    </form>
  );
};

export default NameInput;
