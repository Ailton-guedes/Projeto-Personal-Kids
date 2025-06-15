import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarCalendario } from '../../../service/api';

const Agenda = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    semana_anterior: [],
    semana_atual: [],
    proxima_semana: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const currentDateString = `${day}/${month}/${year}`;

        const apiResponse = await listarCalendario(currentDateString);
        const actualData = apiResponse.data;

        if (
          actualData &&
          Array.isArray(actualData.semana_anterior) &&
          Array.isArray(actualData.semana_atual) &&
          Array.isArray(actualData.proxima_semana)
        ) {
          setData(actualData);
        } else {
          setError("O formato dos dados recebidos do servidor é inesperado. Verifique o console para mais detalhes.");
        }
      } catch (err) {
        setError("Não foi possível carregar os dados da agenda. Verifique sua conexão ou tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  const getBgColor = (dateStr) => {
    const today = new Date();
    const [day, month] = dateStr.split('/').map(Number);
    const year = today.getFullYear();
    const date = new Date(year, month - 1, day);

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) return "#c8f0cd";
    if (date.getTime() < today.getTime()) return "#b9e2ff";
    return "#eee";
  };

  const sectionLabels = {
    semana_anterior: 'Aulas da semana anterior',
    semana_atual: 'Aulas da semana',
    proxima_semana: 'Aulas da próxima semana',
  };

const formatDateForAPI = (dateString) => {
  if (!dateString) {
    console.error("String de data indefinida ou nula, não pode ser formatada.");
    return ''; 
  }
  const [year, day, month] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

const goToDate = (dateStrFromCalendar) => {
  const formattedDate = formatDateForAPI(dateStrFromCalendar);
  navigate(`/agenda/dia/${formattedDate}`);
};


  return (
    <div className="d-flex flex-column align-items-center p-4">
      <div className='d-flex' style={{ width: '80%' }}>
        <input type="text" className="form-control border-start-0" placeholder="Pesquisar" />
        <div className="col-md-6 text-md-end mt-2 mt-md-0">
          <button className="btn btn-light me-2">Semanal</button>
          <button className="btn btn-primary" onClick={() => navigate('/agenda-criar')}>Agendar</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <h3>Carregando dados da agenda...</h3>
          <p>Por favor, aguarde.</p>
        </div>
      ) : error ? (
        <div className="text-center mt-5" style={{ color: 'red' }}>
          <h3>Erro ao Carregar Dados</h3>
          <p>{error}</p>
          <p>Tente recarregar a página.</p>
        </div>
      ) : (
        <div style={{ maxWidth: '90%', margin: '0 auto' }}>
          {Object.entries(data || {}).map(([key, days]) => (
            Array.isArray(days) && (
              <div key={key} className="align-items-center">
                <h6 className="fw-bold mb-3 mt-4" style={{ color: '#333' }}>{sectionLabels[key]}</h6>
                <div className="row g-2 align-center justify-content-lg-center">
                  {days.slice(0, 6).length > 0 ? (
                    days.slice(0, 6).map((day, index) => (
                      <div
                        key={`${key}-${day.date}-${index}`}
                        className="col-auto pb-3"
                        style={{ flexShrink: 0, width: '130px' }}
                      >
                        <div
                          className="card h-100"
                          style={{
                            backgroundColor: getBgColor(day.date),
                            borderRadius: "10px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            cursor: 'pointer'
                          }}
                          onClick={() => goToDate(day.date)} 
                        >
                          <div className="card-body text-center p-2 d-flex flex-column justify-content-between">
                            <div className="fw-bold mb-1" style={{ fontSize: "0.9em", color: "#555" }}>{day.date}</div>
                            <div className="my-1 fw-bold" style={{ fontSize: "28px", color: "#333" }}>
                              {day.alunos}
                            </div>
                            <div className="d-flex justify-content-center gap-2 mt-auto">
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: day.presentes > 0 ? '#66bb6a' : '#ddd',
                                  color: day.presentes > 0 ? 'white' : '#555',
                                  borderRadius: "5px",
                                  width: "32px",
                                  height: "28px",
                                  fontSize: "0.9em",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                {day.presentes}
                              </span>
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: day.ausentes > 0 ? '#ef5350' : '#ddd',
                                  color: day.ausentes > 0 ? 'white' : '#555',
                                  borderRadius: "5px",
                                  width: "32px",
                                  height: "28px",
                                  fontSize: "0.9em",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                {day.ausentes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted col-12 text-center">Nenhum dado disponível para esta semana.</p>
                  )}
                </div>
                {key !== 'proxima_semana' }
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Agenda;