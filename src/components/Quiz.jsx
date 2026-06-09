import React from 'react';
import { perguntasHogwarts } from '../data/perguntas';
import Radio from './Radio';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';

const Quiz = () => {
  const navigate = useNavigate(); //instancia a navegação entre páginas
  const [casaSelecionada, setCasaSelecionada] = useLocalStorage('casa', '');
  const [slide, setSlide] = React.useState(0); //Controla os slides das perguntas
  const [respostas, setRespostas] = React.useState({}); //controla a resposta do usuário

  function handleChange({ target }) {
    setRespostas({ ...respostas, [target.name]: target.value });
  }

  function resultadoFinal() {
    const contRespostas = Object.values(respostas).reduce((acc, resposta) => {
      acc[resposta] = (acc[resposta] || 0) + 1;
      return acc;
    }, {});

    const maiorVoto = Math.max(...Object.values(contRespostas));

    const casaSelecionada = Object.keys(contRespostas).filter(
      (casa) => contRespostas[casa] === maiorVoto,
    );

    const indexAleatorio = Math.floor(Math.random() * casaSelecionada.length);
    const casaVencedora = casaSelecionada[indexAleatorio];
    return casaVencedora;
  }

  function handleClick() {
    if (slide < perguntasHogwarts.length - 1) {
      setSlide(slide + 1);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const casaVencedora = resultadoFinal();
    setCasaSelecionada(casaVencedora);
    navigate('/resultado');
  }

  return (
    <div>
      <h1>Quiz</h1>
      <form onSubmit={handleSubmit}>
        {perguntasHogwarts.map((pergunta, index) => (
          <Radio
            active={slide === index}
            key={pergunta.id}
            value={respostas[pergunta.id]}
            onChange={handleChange}
            {...pergunta}
          />
        ))}
        {slide < perguntasHogwarts.length - 1 ? (
          <button
            type="button"
            onClick={handleClick}
            disabled={!respostas[perguntasHogwarts[slide].id]}
          >
            Próxima
          </button>
        ) : (
          <button
            onClick={handleClick}
            disabled={!respostas[perguntasHogwarts[slide].id]}
          >
            Fazer Seleção
          </button>
        )}
      </form>
    </div>
  );
};

export default Quiz;
