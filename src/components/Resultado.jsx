import React from 'react';
import useLocalStorage from './useLocalStorage';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';

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
  const navigate = useNavigate();

  React.useEffect(() => {
    async function buscaBruxo() {
      requestCasa('https://wizard-world-api.herokuapp.com/Houses');
      const response = await requestBruxo(
        `https://hp-api.onrender.com/api/characters/house/${casaSelecionada}`,
      );

      if (response.json) {
        const sorteados = response.json
          .filter((bruxo) => bruxo.image !== '')
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        setBruxosSorteados(sorteados);
      }
    }
    buscaBruxo();
  }, [requestBruxo, requestCasa, casaSelecionada]);

  function handleClick() {
    window.localStorage.removeItem('name');
    window.localStorage.removeItem('casa');
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
    <section>
      <h1>
        Bem vinda a <span>{listaCasa.name}</span> {nomeSalvo}!
      </h1>
      <p>
        Criar um outro arquivo com um textinho descritivo da casa para colocar
        aqui
      </p>
      <div>
        <p>
          Fundador: <span>{listaCasa.founder}</span>
        </p>
        <p>
          Cores: <span>{listaCasa.houseColours}</span>
        </p>
        <p>Diretores Famosos:</p>
        <ul>
          {listaCasa.heads.map((head) => (
            <li key={head.id}>
              {head.firstName} {head.lastName}
            </li>
          ))}
        </ul>
        <p>Característica Marcantes:</p>
        <ul>
          {listaCasa.traits.map((trait) => (
            <li key={trait.id}>{trait.name}</li>
          ))}
        </ul>
      </div>

      <h2>Bruxos Famosos:</h2>
      <div>
        <div>
          {bruxosSorteados.map((bruxo) => (
            <div key={bruxo.id}>
              <img
                style={{ maxWidth: '100%' }}
                src={bruxo.image}
                alt={bruxo.name}
              />{' '}
              <p>{bruxo.name} </p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleClick}>Refazer Seleção</button>
      <button onClick={() => navigate('/')}>Voltar</button>
    </section>
  );
};

export default Resultado;
