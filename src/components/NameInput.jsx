const NameInput = ({ onSubmit, onChange, input, type, id }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor={id}>Caro aluno, insira o seu nome!</label>
      <input
        type={type}
        id={id}
        value={input}
        onChange={onChange}        
      />
      <button type='submit'>Enviar</button>
    </form>
  );
};

export default NameInput;
