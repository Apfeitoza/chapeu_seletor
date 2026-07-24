import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import NameInput from './NameInput';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Modal from './Modal';
import Footer from './Footer';
import DadosSelecao from './DadosSelecao';

const Home = () => {
  const [inputNome, setInputNome] = React.useState('');
  const [nomeSalvo, setNomeSalvo] = useLocalStorage('name', '');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [casaSelecionada] = useLocalStorage('casa');
  const navigate = useNavigate();

  function handleChange({ target }) {
    setInputNome(target.value);
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNomeSalvo(inputNome);
    setInputNome('');
    setIsModalOpen(false);
  }

  if (nomeSalvo) {
    return (
      <>
        <section className={styles.container}>
          <h1 className={styles.title}>
            Bem vindo a Hogwarts <span>{nomeSalvo}!</span>
          </h1>
          <div className={styles.buttonContainer}>
            <button className="btn btnFlag" onClick={() => navigate('/quiz')}>
              Começar o Teste
            </button>
            {casaSelecionada !== 'default' ? (
              <button
                className="btn btnFlag"
                onClick={() => navigate('/resultado')}
              >
                Salão Comunal
              </button>
            ) : null}
          </div>
        </section>
        <section className={styles.sorteados}>
          <h2 className={styles.title}>Sorteados</h2>
          <DadosSelecao />
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.title}>Saiba qual é a sua casa de Hogwarts</h1>
        <p>Coloque o chapéu seletor e descubra a qual casa você pertence</p>

        <button className="btn btnFlag" onClick={() => setIsModalOpen(true)}>
          Iniciar Cerimônia
        </button>

        <Modal isOpen={isModalOpen} onClose={handleClose}>
          <NameInput
            id={'nome'}
            type={'text'}
            input={inputNome}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </Modal>
      </section>
      <section className={styles.sorteados}>
        <h2 className={styles.title}>Sorteados</h2>
        <DadosSelecao />
      </section>

      <Footer />
    </>
  );
};

export default Home;
