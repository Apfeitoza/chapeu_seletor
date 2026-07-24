import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { houses } from '../data/houseDescriptions';
import {
  dicionarioCasas,
  dicionarioCores,
  dicionarioTraits,
} from '../data/dicionario';
import DadosSelecao from './DadosSelecao';
import { ThemeContext } from '../ThemeContext.jsx';
import Footer from './Footer.jsx';
import styles from './Resultado.module.css';

const Resultado = () => {
  const {
    data: dataCasa,
    loading: loadingCasa,
    error: errorCasa,
    request: requestCasa,
  } = useFetch();
  const {
    data: dataBruxo,
    loading: loadingBruxo,
    error: errorBruxo,
    request: requestBruxo,
  } = useFetch();
  const [casaSelecionada] = useLocalStorage('casa');
  const [nomeSalvo] = useLocalStorage('name');
  const [bruxosSorteados, setBruxosSorteados] = React.useState([]);
  const [traitsSorteados, setTraitsSorteados] = React.useState([]);
  const { resetTheme } = React.useContext(ThemeContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    async function buscaDados() {
      const responseCasa = await requestCasa(
        'https://wizard-world-api.herokuapp.com/Houses',
      );
      const responseBruxo = await requestBruxo(
        `https://hp-api.onrender.com/api/characters/house/${casaSelecionada}`,
      );

      if (responseCasa.json) {
        const casaAtual = responseCasa.json.find(
          (casa) => casa.name.toLowerCase() === casaSelecionada,
        );

        if (casaAtual && casaAtual.traits) {
          const randomTraits = [...casaAtual.traits]
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          setTraitsSorteados(randomTraits);
        }
      }

      if (responseBruxo.json) {
        const sorteados = responseBruxo.json
          .filter((bruxo) => bruxo.image !== '')
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        setBruxosSorteados(sorteados);
      }
    }

    buscaDados();
  }, [requestBruxo, requestCasa, casaSelecionada]);

  function handleClick() {
    window.localStorage.removeItem('name');
    window.localStorage.removeItem('casa');
    resetTheme();
    navigate('/');
  }

  if (loadingCasa || loadingBruxo) return <p>Carregando...</p>;
  if (errorCasa) return <p>Erro: {errorCasa}</p>;
  if (errorBruxo) return <p>Erro: {errorBruxo}</p>;
  if (dataCasa === null || dataBruxo === null) return null;

  const listaCasa = dataCasa.find(
    (casa) => casa.name.toLowerCase() === casaSelecionada,
  );

  return (
    <>
      <div className="container">
        <section className={styles.container}>
          <div className={styles.imgContainer}>
            <img
              src={`./src/assets/badges/${casaSelecionada}_badge.svg`}
              alt="escudo"
            />
          </div>
          <div className={styles.contentContainer}>
            <p className={styles.subtitle}>
              <span className={styles.name}>{nomeSalvo}</span>, bem vindo à
            </p>
            <h1 className={styles.title}>
              {dicionarioCasas[listaCasa.name] || listaCasa.name}
            </h1>
            <div className={styles.houseText}>
              {casaSelecionada === 'gryffindor' && <p>{houses.gryffindor}</p>}
              {casaSelecionada === 'hufflepuff' && <p>{houses.hufflepuff}</p>}
              {casaSelecionada === 'slytherin' && <p>{houses.slytherin}</p>}
              {casaSelecionada === 'ravenclaw' && <p>{houses.ravenclaw}</p>}
            </div>
            <ul className={styles.houseContent}>
              <li>{listaCasa.founder}</li>
              <li>
                {dicionarioCores[listaCasa.houseColours] ||
                  listaCasa.houseColours}
              </li>
              <li>
                <ul className={styles.houseHeaders}>
                  {listaCasa.heads.map((head) => (
                    <li key={head.id}>
                      {head.firstName} {head.lastName}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <ul className={styles.houseTraits}>
              {traitsSorteados.map((trait) => {
                const houseTraits = dicionarioTraits[casaSelecionada];
                const traducao = houseTraits?.[trait.name] || trait.name;

                return <li key={trait.id}>{traducao}</li>;
              })}
            </ul>
          </div>
        </section>
        <section className={`${styles.container} houseStats`}>
          <div className={styles.characterContainer}>
            <h2 className={styles.characterTitle}>Personalidades</h2>

            <div className={styles.cardContainer}>
              {bruxosSorteados.map((bruxo) => (
                <div className={styles.characterCard} key={bruxo.id}>
                  <img src={bruxo.image} alt={bruxo.name} />{' '}
                  <p className={styles.characterName}>{bruxo.name} </p>
                </div>
              ))}
            </div>
          </div>
          <DadosSelecao
            casaTraduzida={dicionarioCasas[listaCasa.name]}
            casaSelecionada={casaSelecionada}
          />
        </section>
        
          <div className={styles.btnContainer}>
            <button className="btn btnFlagLeft" onClick={handleClick}>
              Refazer Seleção
            </button>
            <button className="btn btnFlagRight" onClick={() => navigate('/')}>
              Voltar
            </button>
          </div>
        </div>
    
      <Footer />
    </>
  );
};

export default Resultado;
