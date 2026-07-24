import styles from './Radio.module.css';

const Radio = ({ pergunta, opcoes, onChange, value, id, active }) => {
  if (active === false) return null;

  return (
    <fieldset className={styles.container}>
      <legend className={styles.pergunta}>{pergunta}</legend>
      {opcoes.map((option) => (
        <label className={styles.resposta} key={option.idOpcao}>
          <input
            className={styles.radio}
            type="radio"
            name={id}
            id={option.idOpcao}
            value={option.valor}
            onChange={onChange}
            checked={value === option.valor}
          />
          {option.texto}
        </label>
      ))}
    </fieldset>
  );
};

export default Radio;
