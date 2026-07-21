import React from 'react';
import useLocalStorage from './useLocalStorage';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import { houses } from '../data/houseDescriptions';
import {
  dicionarioCasas,
  dicionarioCores,
  dicionarioTraits,
} from '../data/dicionario';

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
      <section
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          padding: '0 60px',
        }}
      >
        <div className="imgContainer" style={{ gridRow: '1/-1' }}>
          <img
            src="./src/assets/badges/placeholder.png"
            width={'300px'}
            alt="escudo"
          />
        </div>
        <div
          className="contentContainer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 className="title">
            {nomeSalvo}, bem vindo à
            <span
              style={{
                color: '#690080',
                display: 'block',
                textAlign: 'center',
              }}
            >
              {dicionarioCasas[listaCasa.name] || listaCasa.name}
            </span>
          </h1>
          <div
            className="content"
            style={{ justifySelf: 'center', padding: '0 60px' }}
          >
            {casaSelecionada === 'gryffindor' && <p>{houses.gryffindor}</p>}
            {casaSelecionada === 'hufflepuff' && <p>{houses.hufflepuff}</p>}
            {casaSelecionada === 'slytherin' && <p>{houses.slytherin}</p>}
            {casaSelecionada === 'ravenclaw' && <p>{houses.ravenclaw}</p>}
          </div>
          <ul
            className="houseDescription"
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <li>{listaCasa.founder}</li>
            <li>
              {dicionarioCores[listaCasa.houseColours] ||
                listaCasa.houseColours}
            </li>
            <li>
              <ul
                className="houseHeaders"
                style={{ listStyle: 'none', margin: '0', padding: '0' }}
              >
                {listaCasa.heads.map((head) => (
                  <li key={head.id}>
                    {head.firstName} {head.lastName}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul
            className="houseTraits"
            style={{
              listStyle: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            {traitsSorteados.map((trait) => {
              const houseTraits = dicionarioTraits[casaSelecionada];
              const traducao = houseTraits?.[trait.name] || trait.name;

              return <li key={trait.id}>{traducao}</li>;
            })}
          </ul>
        </div>
      </section>
      <section
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '16px',
          padding: '0 60px',
        }}
      >
        <div className="famousCharacters" style={{
            padding: '0 0 0 60px',
          }}>
          <h2>Bruxos Famosos:</h2>
          <div>
            {bruxosSorteados.map((bruxo) => (
              <div key={bruxo.id}>
                <img
                  style={{ maxWidth: '260px' }}
                  src={bruxo.image}
                  alt={bruxo.name}
                />{' '}
                <p>{bruxo.name} </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="houseStatistics"
          style={{
            padding: '0 60px 0 0',
          }}
        >
          <div
            className="houseMates"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2>Colegas de Casa</h2>
            <span style={{ fontSize: '3rem' }}>1459</span>
            <p>alunos se juntaram á {dicionarioCasas[listaCasa.name]}</p>
          </div>
          <div className="statistics">
            <p>Confira a porcentagem geral:</p>
            <div>
              <div
                className="grifinoria"
                style={{ backgroundColor: '#DE554B', color: '#FEB447' }}
              >
                <p>Grifinória</p>
                <span>porcentagem</span>
              </div>
              <div
                className="sonserina"
                style={{ backgroundColor: '#086C5C', color: '#D3E9F5' }}
              >
                <p>Sonserina</p>
                <span>porcentagem</span>
              </div>
              <div
                className="lufa-lufa"
                style={{ backgroundColor: '#FCB542', color: '#1E1E1E' }}
              >
                <p>Lufa-Lufa</p>
                <span>porcentagem</span>
              </div>
              <div
                className="corvinal"
                style={{ backgroundColor: '#265CAA', color: '#F1BA8C' }}
              >
                <p>Corvinal</p>
                <span>porcentagem</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="btns"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 120px',
        }}
      >
        <button onClick={handleClick}>Refazer Seleção</button>
        <button onClick={() => navigate('/')}>Voltar</button>
      </div>
    </>
  );
};

export default Resultado;
