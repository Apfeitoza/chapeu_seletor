import styles from './NameInput.module.css'

const NameInput = ({ onSubmit, onChange, input, type, id }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor={id}>Caro aluno, insira o seu nome!</label>
      <input className={styles.input}
        type={type}
        id={id}
        value={input}
        onChange={onChange}        
      />
      <button type='submit' className='btn btnFlag'>Enviar</button>
    </form>
  );
};

export default NameInput;
