import React from 'react';
import useLocalStorage from './useLocalStorage';
import NameInput from './NameInput';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [inputNome, setInputNome] = React.useState('');
  const [nomeSalvo, setNomeSalvo] = useLocalStorage('name', '');
  const [casa, setCasa] = useLocalStorage('casa', '');
  const navigate = useNavigate();

  function handleChange({ target }) {
    setInputNome(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNomeSalvo(inputNome);
    setInputNome('');
  }

  if (nomeSalvo) {
    return (
      <div>
        <h2>
          Bem vindo a Hogwarts{' '}
          <span style={{ color: 'purple' }}>{nomeSalvo}!</span>
        </h2>
        {casa ? (
          <button
            onClick={() => {
              setNomeSalvo('');
              setCasa('');
            }}
          >
            Refazer Seleção
          </button>
        ) : (
          <button onClick={() => navigate('/quiz')}>Fazer Seleção</button>
        )}
      </div>
    );
  }

  return (
    <NameInput
      id={'nome'}
      type={'text'}
      input={inputNome}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
};

export default Home;
