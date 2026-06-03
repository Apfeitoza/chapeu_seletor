import React from 'react';
import { perguntasHogwarts } from '../data/perguntas';
import Radio from './Radio';

const Quiz = () => {
  const [slide, setSlide] = React.useState(0); //Controla os slides das perguntas
  const [respostas, setRespostas] = React.useState({}); //controla a resposta do usuário

  function handleChange({ target }) {
    setRespostas({ ...respostas, [target.name]: target.value });
  }

  function resultadoFinal() {
    console.log(respostas);
  }

  function handleClick() {
    if (slide < perguntasHogwarts.length - 1) {
      setSlide(slide + 1);      
    }    
  }

  function handleSubmit(e) {
    e.preventDefault();
    resultadoFinal();
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
          <button type="button"
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
