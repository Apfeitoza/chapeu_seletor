import React from 'react';
import { supabase } from '../supabaseClient';
import { useLocation } from 'react-router-dom';
import styles from './DadosSelecao.module.css';
import Loading from './Loading';

const DadosSelecao = ({ casaTraduzida, casaSelecionada }) => {
  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

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

  if (loading) return <Loading />;
  if (location.pathname === '/resultado')
    return (
      <div className={styles.container}>
        <div className={styles.houseMates}>
          <h3 className={styles.houseTitle}>Colegas de Casa</h3>
          <span className={styles.houseNumber}>{houseMates?.votes || 0}</span>
          <p className={styles.houseText}>
            alunos se juntaram á {casaTraduzida}
          </p>
        </div>
        <div className={styles.houseStatistics}>
          <p className={styles.statisticsText}>Confira a porcentagem geral:</p>
          <div className={styles.statisticsContainer}>
            {items.map((item) => {
              //Se o total de votos for maior que zero divide pelo total e multiplica por 100
              const porcentagem =
                total > 0 ? Math.round((item.votes / total) * 100) : 0;

              return (
                <div className={styles.flagWrapper} key={item.house_name}>
                  <div
                    className={`${styles[item.house_name]} ${styles.houseFlag}`}
                  >
                    <span className={styles.flagStatistics}>
                      {porcentagem}%
                    </span>
                    <img
                      src={`./src/assets/badges/${item.house_name}_flag.svg`}
                      alt="escudo"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  return (
    <div className={styles.container}>
      <div className={styles.houseStatistics}>
        <div className={styles.statisticsContainer}>
          {items.map((item) => {
            //Se o total de votos for maior que zero divide pelo total e multiplica por 100
            const porcentagem =
              total > 0 ? Math.round((item.votes / total) * 100) : 0;

            return (
              <div className={styles.flagWrapper} key={item.house_name}>
                <div
                  className={`${styles[item.house_name]} ${styles.houseFlag}`}
                >
                  <span className={styles.flagStatistics}>{porcentagem}%</span>
                  <img
                    src={`./src/assets/badges/${item.house_name}_flag.svg`}
                    alt="escudo"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DadosSelecao;
