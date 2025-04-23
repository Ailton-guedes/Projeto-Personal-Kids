import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const navigate = useNavigate();
 

  
  const [aulasHoje, setAulasHoje] = useState([
    { horario: '09:30 às 10:10', status: 'confirmado' },
    { horario: '13:30 às 14:10', status: 'confirmado' },
    { horario: '17:00 às 17:40', status: 'pendente' }
  ]);

  const [reposicoesPendentes, setReposicoesPendentes] = useState([
    { aluno: 'Vinicius Barreto', data: '01/03' }
  ]);

  const [mensalidadesPendentes, setMensalidadesPendentes] = useState([
    { nome: 'Pedro Guimarães', plano: 'Plano - ...', data: '09/04', notificado: true },
    { nome: 'Maisa Figueiredo', plano: 'Plano - ...', data: '13/04', notificado: false }
  ]);

  
  useEffect(() => {
   
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get('/api/aulas-hoje');
    //     setAulasHoje(response.data);
    //   } catch (error) {
    //     console.error('Erro ao buscar as aulas:', error);
    //   }
    // };
    // fetchData();
  }, []);

  
  const adicionarAula = async (horario, status) => {
    try {
      
      // const response = await axios.post('/api/aulas', { horario, status });
      // if (response.status === 201) {
      setAulasHoje([...aulasHoje, { horario, status }]);
      // }
    } catch (error) {
      console.error('Erro ao adicionar aula:', error);
    }
  };

  const adicionarReposicao = async (aluno, data) => {
    try {
     
      // const response = await axios.post('/api/reposicoes', { aluno, data });
      // if (response.status === 201) {
      setReposicoesPendentes([...reposicoesPendentes, { aluno, data }]);
      // }
    } catch (error) {
      console.error('Erro ao adicionar reposição:', error);
    }
  };

  const adicionarMensalidade = async (nome, plano, data, notificado) => {
    try {
      
      // const response = await axios.post('/api/mensalidades', { nome, plano, data, notificado });
      // if (response.status === 201) {
      setMensalidadesPendentes([...mensalidadesPendentes, { nome, plano, data, notificado }]);
      // }
    } catch (error) {
      console.error('Erro ao adicionar mensalidade:', error);
    }
  };

  
  const styles2 = {
    dashboard: {
      backgroundColor: '#d6f7e9',
      minHeight: '100vh',
      padding: '20px',
    },
    dashboardContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '92%',
      maxWidth: '1500px',
      margin: '0 auto',
    },
    topPanels: {
      display: 'flex',
      gap: '20px',
      width: '100%',
      height: '40vh',
      minHeight: '320px',
    },
    panel: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #ddd',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minWidth: '300px',
    },
    mensalidadesPanel: {
      width: '100%',
      height: '36vh',
      minHeight: '280px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #ddd',
      display: 'flex',
      flexDirection: 'column',
    },
    panelHeader: {
      backgroundColor: '#c8c8c8',
      padding: '14px 18px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #ddd',
    },
    panelHeaderTitle: {
      fontSize: '17px',
      color: '#333',
      fontWeight: 'bold',
      margin: 0,
    },
    alertIcon: {
      color: '#ff9800',
      fontSize: '22px',
    },
    panelContent: {
      padding: '18px',
      flexGrow: 1,
      overflowY: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableRow: {
      '&:hover': {
        backgroundColor: '#f9f9f9',
      }
    },
    tableHeader: {
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      padding: '12px',
      textAlign: 'left',
      fontSize: '16px',
    },
    tableCell: {
      padding: '12px',
      textAlign: 'left',
      fontSize: '16px',
    },
    horarioCell: {
      backgroundColor: '#f9f9f9',
      borderRadius: '20px',
      padding: '10px 18px',
      display: 'inline-block',
      margin: '5px 0',
    },
    statusIndicator: {
      display: 'inline-block',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
    },
    statusConfirmado: {
      backgroundColor: '#8ce99a',
    },
    statusPendente: {
      backgroundColor: '#ffe066',
    },
    dataPendente: {
      backgroundColor: '#ffc9c9',
      borderRadius: '20px',
      padding: '10px 18px',
      display: 'inline-block',
    },
    dataUrgente: {
      backgroundColor: '#ffc9c9',
      borderRadius: '20px',
      padding: '8px 18px',
      display: 'inline-block',
    },
    dataProxima: {
      backgroundColor: '#ffe066',
      borderRadius: '20px',
      padding: '8px 18px',
      display: 'inline-block',
    },
    statusNotificado: {
      backgroundColor: '#8ce99a',
      borderRadius: '6px',
      padding: '8px 12px',
      display: 'inline-block',
      textAlign: 'center',
      color: '#2b8a3e',
      minWidth: '120px',
    },
    statusNaoNotificado: {
      backgroundColor: '#ffc9c9',
      borderRadius: '6px',
      padding: '8px 12px',
      display: 'inline-block',
      textAlign: 'center',
      color: '#c92a2a',
      minWidth: '120px',
    },
  };

  return (
    <div className="bg-success-subtle p-3">
      <div className="container">
        <div className="row g-3">
          {/* Painel Confirmações e Aulas de Hoje */}
          <div className="col-md-6 col-12">
            <div className="card shadow">
              <div className="card-header bg-secondary d-flex justify-content-between align-items-center">
                <h2 className="h5 m-0 text-white">Confirmações - aulas de hoje</h2>
                <span className="text-warning fs-5">⚠️</span>
              </div>
              <div className="card-body overflow-auto">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Aula</th>
                      <th scope="col">Horário</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aulasHoje.map((aula, index) => (
                      <tr key={index}>
                        <td>Aula -</td>
                        <td>
                          <span className="bg-light rounded-pill px-3 py-2 d-inline-block">{aula.horario}</span>
                        </td>
                        <td>
                          <span
                            className={`d-inline-block rounded-circle ${aula.status === 'confirmado' ? 'bg-success' : 'bg-warning'}`}
                            style={{ width: '24px', height: '24px' }}
                          ></span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Painel Confirmações de Reposições Pendentes */}
          <div className="col-md-6 col-12">
            <div className="card shadow">
              <div className="card-header bg-secondary d-flex justify-content-between align-items-center">
                <h2 className="h5 m-0 text-white">Confirmações de reposições pendentes</h2>
                <span className="text-warning fs-5">⚠️</span>
              </div>
              <div className="card-body overflow-auto">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Aluno</th>
                      <th scope="col">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reposicoesPendentes.map((reposicao, index) => (
                      <tr key={index}>
                        <td>{reposicao.aluno}</td>
                        <td>
                          <span className="bg-danger-subtle rounded-pill px-3 py-2 d-inline-block">{reposicao.data}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Painel Mensalidades Pendentes */}
          <div className="col-12">
            <div className="card shadow">
              <div className="card-header bg-secondary d-flex justify-content-between align-items-center">
                <h2 className="h5 m-0 text-white">Mensalidades Pendentes</h2>
                <span className="text-warning fs-5">⚠️</span>
              </div>
              <div className="card-body overflow-auto">
                {/* Conteúdo das mensalidades pendentes aqui */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;