import styles from './NameInput.module.css';

const NameInput = ({ onSubmit, onChange, input, type, id, error }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor={id}>
        Caro aluno, insira o seu nome!
      </label>
      <input
        required
        className={styles.input}
        type={type}
        id={id}
        value={input}
        onChange={onChange}
      />
      {error && <span className={styles.error}>{error}</span>}
      {!input || input.trim() === '' ? (
        <button disabled type="submit" className="btn btnFlag">
          Enviar
        </button>
      ) : (
        <button type="submit" className="btn btnFlag">
          Enviar
        </button>
      )}
    </form>
  );
};

export default NameInput;
