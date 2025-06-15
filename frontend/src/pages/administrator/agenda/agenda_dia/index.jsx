import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listarAgenda, gerenciarPresenca } from '../../../../service/api';

const AgendaDia = () => {
    const goToProfile = (id) => {
    navigate(`/usuarios/perfil/${id}`);
  };




  const { dateStr } = useParams();
  const navigate = useNavigate();
  const [agendaData, setAgendaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [presencaStates, setPresencaStates] = useState({});

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listarAgenda(dateStr);
      setAgendaData(response.data);

      const initialStates = {};
      if (response.data && Array.isArray(response.data.aulas)) {
        response.data.aulas.forEach(aula => {
          initialStates[aula.id_aula] = {};
          if (Array.isArray(aula.alunos_na_aula)) {
            aula.alunos_na_aula.forEach(aluno => {
              const uniqueParticipacaoId = aluno.participacao_id;
              initialStates[aula.id_aula][uniqueParticipacaoId] = {
                presenca: aluno.presenca,
                feedback: aluno.feedback || ''
              };
            });
          }
        });
      }
      setPresencaStates(initialStates);

    } catch (err) {
      console.error('Erro ao carregar dados da agenda:', err);
      setError('Não foi possível carregar os dados da agenda.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateStr]);

  const handlePresencaChange = (aulaId, participacaoId, field, value) => {
    setPresencaStates(prevStates => ({
      ...prevStates,
      [aulaId]: {
        ...prevStates[aulaId],
        [participacaoId]: {
          ...prevStates[aulaId][participacaoId],
          [field]: value
        }
      }
    }));
  };

  const handleSalvarPresencas = async (aulaId) => {
    const updates = [];
    const alunosDaAula = agendaData.aulas.find(a => a.id_aula === aulaId)?.alunos_na_aula || [];

    alunosDaAula.forEach(alunoOriginal => {
      const uniqueParticipacaoId = alunoOriginal.participacao_id;
      const alunoState = presencaStates[aulaId]?.[uniqueParticipacaoId];

      if (alunoState) {
        if (alunoState.presenca !== alunoOriginal.presenca ||
          alunoState.feedback !== (alunoOriginal.feedback || '')) {
          updates.push({
            participacao_id: uniqueParticipacaoId,
            presenca: alunoState.presenca,
            feedback: alunoState.feedback,
          });
        }
      }
    });

    if (updates.length === 0) {
      alert("Nenhuma alteração para salvar nesta aula.");
      return;
    }

    try {
      const response = await gerenciarPresenca(aulaId, updates);
      console.log('Atualização de presença bem-sucedida:', response.data);

      await fetchData();

    } catch (err) {
      console.error('Erro ao salvar presenças:', err);
      alert('Erro ao salvar presenças.');
    }
  };

  if (loading) {
    return (
      <div className="container p-4 text-center">
        <h3>Carregando agenda...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container p-4 text-center" style={{ color: 'red' }}>

        <h3>Nenhuma aula encontrado para o dia {decodeURIComponent(dateStr)}</h3>
        <p>{error}</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  if (!agendaData || !Array.isArray(agendaData.aulas) || agendaData.aulas.length === 0) {
    return (
      <div className="container p-4 text-center">
        <h3>Nenhuma aula encontrado para o dia {decodeURIComponent(dateStr)}</h3>
        <p>Verifique se há dados disponíveis para esta data.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="container p-4">
      <div className='d-flex justify-content-between align-items-center p-4'>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Voltar
        </button>
        <h2 className="mb-0">{
          (new Date(dateStr).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }))
            .replace(/^(.)/, (match) => match.toUpperCase())
        }</h2>
      </div>


      {agendaData.aulas.map((aula) => (
        <div
          key={aula.id_aula}
          className="card mb-4 p-3"
          style={{ backgroundColor: '#e6ffe6', border: '1px solid #66bb6a', borderRadius: '10px' }}
        >
          <div className="mb-3">
            <h5 className="fw-bold">Aula das {aula.hora_inicio} - {aula.hora_fim}</h5>
          </div>

          <div className="row g-3">
            <div className="col-4 d-flex flex-column" style={{ gap: '10px' }}>
              <div 
                key={aula.id_professor} onClick={() => goToProfile(aula.id_professor)} 
                className="p-2"
                style={{ backgroundColor: '#ffdede', border: '1px solid #ef9a9a', borderRadius: '8px', flexGrow: 0 }}
              >
                <span className="fw-bold">Prof.</span>: {aula.professor || 'N/A'}
              </div>
              <div
                className="p-2 flex-grow-1"
                style={{ backgroundColor: '#e0f7fa', border: '1px solid #80deea', borderRadius: '8px' }}
              >
                <span className="fw-bold">Informações da aula</span>:
                <br />
                Modalidade: {aula.modalidade || 'N/A'}
                <br />
                Status: {aula.status_ocorrencia || 'N/A'}
              </div>
            </div>

            <div className="col-8">
              <div
                className="p-2 h-100"
                style={{ backgroundColor: '#ffdede', border: '1px solid #ef9a9a', borderRadius: '8px' }}
              >
                <span className="fw-bold">Alunos:</span>
                <ul className="list-unstyled mb-0 mt-2">
                  {aula.alunos_na_aula && aula.alunos_na_aula.length > 0 ? (
                    aula.alunos_na_aula.map(aluno => {
                      const uniqueParticipacaoId = aluno.participacao_id;
                      const radioGroupName = `presenca-${aula.id_aula}-${uniqueParticipacaoId}`;
                      const presenteId = `presente-${aula.id_aula}-${uniqueParticipacaoId}`;
                      const ausenteId = `ausente-${aula.id_aula}-${uniqueParticipacaoId}`;
                      const pendenteId = `pendente-${aula.id_aula}-${uniqueParticipacaoId}`;
                      const feedbackInputId = `feedback-${aula.id_aula}-${uniqueParticipacaoId}`;

                      return (
                        <li key={aluno.id_aluno} className="mb-2 p-1 border-bottom d-flex flex-column">
                          <span key={aluno.id_aluno} onClick={() => goToProfile(aluno.id_aluno)}  className="fw-bold">{aluno.nome}</span>

                          <div className="d-flex flex-wrap gap-2 mb-1">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={radioGroupName}
                                id={presenteId}
                                value="presente"
                                checked={presencaStates[aula.id_aula]?.[uniqueParticipacaoId]?.presenca === 'presente'}
                                onChange={(e) => handlePresencaChange(aula.id_aula, uniqueParticipacaoId, 'presenca', e.target.value)}
                              />
                              <label className="form-check-label" htmlFor={presenteId}>Presente</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={radioGroupName}
                                id={ausenteId}
                                value="ausente"
                                checked={presencaStates[aula.id_aula]?.[uniqueParticipacaoId]?.presenca === 'ausente'}
                                onChange={(e) => handlePresencaChange(aula.id_aula, uniqueParticipacaoId, 'presenca', e.target.value)}
                              />
                              <label className="form-check-label" htmlFor={ausenteId}>Ausente</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={radioGroupName}
                                id={pendenteId}
                                value="pendente"
                                checked={presencaStates[aula.id_aula]?.[uniqueParticipacaoId]?.presenca === 'pendente'}
                                onChange={(e) => handlePresencaChange(aula.id_aula, uniqueParticipacaoId, 'presenca', e.target.value)}
                              />
                              <label className="form-check-label" htmlFor={pendenteId}>Pendente</label>
                            </div>
                          </div>

                          <div className="mt-1">
                            <label htmlFor={feedbackInputId} className="form-label visually-hidden">Feedback para {aluno.nome}</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id={feedbackInputId}
                              placeholder="Feedback (opcional)"
                              value={presencaStates[aula.id_aula]?.[uniqueParticipacaoId]?.feedback || ''}
                              onChange={(e) => handlePresencaChange(aula.id_aula, uniqueParticipacaoId, 'feedback', e.target.value)}
                            />
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li>Nenhum aluno programado.</li>
                  )}
                </ul>
                {aula.alunos_na_aula && aula.alunos_na_aula.length > 0 && (
                  <button
                    className="btn btn-sm btn-primary mt-3"
                    onClick={() => handleSalvarPresencas(aula.id_aula)}
                  >
                    Salvar Presenças da Aula
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgendaDia;