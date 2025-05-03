import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
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

  return (
    <div className="p-4" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row g-4">

          <div className="col-md-6 col-12">
            <div className="card h-100 shadow">
              <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                <h5 className="m-0">Confirmações - aulas de hoje</h5>
                <span className="text-warning fs-5">⚠️</span>
              </div>
              <div className="card-body overflow-auto">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Aula</th>
                      <th>Horário</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aulasHoje.map((aula, index) => (
                      <tr key={index}>
                        <td>Aula -</td>
                        <td>
                          <span className="bg-light rounded-pill px-3 py-2 d-inline-block">
                            {aula.horario}
                          </span>
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

          <div className="col-md-6 col-12">
            <div className="card h-100 shadow">
              <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                <h5 className="m-0">Confirmações de reposições pendentes</h5>
                <span className="text-warning fs-5">⚠️</span>
              </div>
              <div className="card-body overflow-auto">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Aluno</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reposicoesPendentes.map((reposicao, index) => (
                      <tr key={index}>
                        <td>{reposicao.aluno}</td>
                        <td>
                          <span className="bg-danger-subtle rounded-pill px-3 py-2 d-inline-block">
                            {reposicao.data}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card shadow">
              <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                <h5 className="m-0">Mensalidades Pendentes</h5>
                <span className="text-warning fs-5">⚠️</span>
              </div>
              <div className="card-body overflow-auto">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Plano</th>
                      <th>Data</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mensalidadesPendentes.map((mensalidade, index) => (
                      <tr key={index}>
                        <td>{mensalidade.nome}</td>
                        <td>{mensalidade.plano}</td>
                        <td>{mensalidade.data}</td>
                        <td>
                          <span
                            className={`px-3 py-1 rounded text-center d-inline-block fw-semibold`}
                            style={{
                              backgroundColor: mensalidade.notificado ? '#d1f7d1' : '#f8d7da',
                              color: mensalidade.notificado ? '#2e7d32' : '#842029',
                              minWidth: '120px'
                            }}
                          >
                            {mensalidade.notificado ? 'Notificado' : 'Não Notificado'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
