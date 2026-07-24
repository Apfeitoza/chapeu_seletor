import React from 'react';
import { perguntasHogwarts } from '../data/perguntas';
import Radio from './Radio';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { supabase } from '../supabaseClient.js';
import { ThemeContext } from '../ThemeContext.jsx';
import styles from './Quiz.module.css'

const Quiz = () => {
  const navigate = useNavigate(); //instancia a navegação entre páginas
  const [casaSelecionada, setCasaSelecionada] = useLocalStorage('casa', '');
  const [slide, setSlide] = React.useState(0); //Controla os slides das perguntas
  const [respostas, setRespostas] = React.useState({}); //controla a resposta do usuário
  const { selectHouseTheme } = React.useContext(ThemeContext);

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

  async function registraVoto(casaVencedora) {
    try {
      //Puxa quantos votos tem cada casa atualmente
      const { data, error: errorBusca } = await supabase
        .from('house_statistics')
        .select('*')
        .eq('house_name', casaVencedora)
        .single();

      if (errorBusca) throw errorBusca;

      //Adiciona votos
      const newVote = data.votes + 1;

      //faz o update do numero atualizado
      const { error: errorUpdate } = await supabase
        .from('house_statistics')
        .update({ votes: newVote })
        .eq('house_name', casaVencedora);

      if (errorUpdate) throw errorUpdate;
      console.log(
        `Voto computado com sucesso! ${casaVencedora} agora tem ${newVote} votos`,
      );
    } catch (err) {
      console.error('Erro de Conexão com o Banco de Dados:', err.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const casaVencedora = resultadoFinal();
    setCasaSelecionada(casaVencedora);
    registraVoto(casaVencedora);
    selectHouseTheme(casaVencedora);
    navigate('/resultado');
  }

  return (
    <div className={styles.container}>
      <form className={styles.quizForm} onSubmit={handleSubmit}>
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
            className={`${styles.btnQuizz} btn btnFlagRight`}
            type="button"
            onClick={handleClick}
            disabled={!respostas[perguntasHogwarts[slide].id]}
          >
            Próxima
          </button>
        ) : (
          <button
            className={`${styles.btnQuizz} btn btnFlagRight`}
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
