import React from 'react';

const Radio = ({ pergunta, opcoes, onChange, value, id, active }) => {
  if (active === false) return null;

  return (
    <fieldset
      style={{
        padding: '2rem',
        marginBottom: '1rem',
        border: '2px solid #eee',
      }}
    >
      <legend>{pergunta}</legend>
      {opcoes.map((option) => (
        <label style={{ display:'block', marginBottom: '1rem' }} key={option.idOpcao}>
          <input
            type="radio"
            name={id}
            id={option.idOpcao}
            value={option.valor}
            onChange={onChange}
            checked={value === option.valor}
          />
          {option.texto}
        </label>
      ))}
    </fieldset>
  );
};

export default Radio;
