import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import NameInput from './NameInput';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Modal from './Modal';

const Home = () => {
  const [inputNome, setInputNome] = React.useState('');
  const [nomeSalvo, setNomeSalvo] = useLocalStorage('name', '');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [casaSelecionada] = useLocalStorage('casa');
  const navigate = useNavigate();

  function handleChange({ target }) {
    setInputNome(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNomeSalvo(inputNome);
    setInputNome('');
    setIsModalOpen(false);
  }

  if (nomeSalvo) {
    return (
      <div>
        <h1>
          Bem vindo a Hogwarts <span>{nomeSalvo}!</span>
        </h1>

        <button className={styles.botao} onClick={() => navigate('/quiz')}>
          Começar o Teste
        </button>
        {casaSelecionada !== 'default' ? (
          <button
            className={styles.botao}
            onClick={() => navigate('/resultado')}
          >
            Salão Comunal
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <h1>Saiba qual é a sua casa de Hogwarts</h1>
      <p>Coloque o chapéu seletor e descubra a qual casa você pertence</p>

      <button className={styles.botao} onClick={() => setIsModalOpen(true)}>
        Iniciar Cerimônia
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NameInput
          id={'nome'}
          type={'text'}
          input={inputNome}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default Home;
