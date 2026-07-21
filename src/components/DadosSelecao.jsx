import React from 'react';
import { supabase } from '../supabaseClient';

const DadosSelecao = ({ casaTraduzida, casaSelecionada }) => {
  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function buscaDados() {
      try {
        const { data, error } = await supabase
          .from('house_statistics')
          .select('house_name, votes'); //puxa as duas colunas

        if (error) {
          console.error('Erro na busca de dados:', error);
        }
        if (data) {
          const somaTotal = data.reduce(
            (acc, item) => acc + item.votes || 0,
            0,
          ); //soma os votos ou soma a zero

          setItems(data);
          setTotal(somaTotal);
        }
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    buscaDados();
  }, []);

  const houseMates = items.find((item) => item.house_name === casaSelecionada);

  if (loading) return <p>Carregando...</p>;

  return (
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
        <span style={{ fontSize: '3rem' }}>{houseMates?.votes || 0}</span>
        <p>alunos se juntaram á {casaTraduzida}</p>
      </div>
      <div className="statistics">
        <p>Confira a porcentagem geral:</p>
        <div>
          {items.map((item) => {
            //Se o total de votos for maior que zero divite pelo total e multiplica por 100
            const porcentagem =
              total > 0 ? Math.round((item.votes / total) * 100) : 0;

            return (
              <div className={item.house_name} key={item.house_name}>
                <p>{item.house_name}</p>
                <span>{porcentagem}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DadosSelecao;
