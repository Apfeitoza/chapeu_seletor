import React from 'react';
import NameInput from './components/NameInput';
import useLocalStorage from './components/useLocalStorage';

const App = () => {
  const [inputNome, setInputNome] = React.useState('');
  const [nomeSalvo, setNomeSalvo] = useLocalStorage('name', '');
  
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
        <button onClick={() => setNomeSalvo('')}>Limpar</button>
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

export default App;
