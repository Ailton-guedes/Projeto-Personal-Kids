import React from 'react';
import { useNavigate } from 'react-router-dom';

const Agenda = () => {
  const navigate = useNavigate(); 
  const getWeekDates = (offset = 0) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const start = new Date(today);
    start.setDate(today.getDate() - dayOfWeek + 1 + offset * 7);

    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return {
        date: d.toLocaleDateString('pt-BR'),
        total: Math.floor(Math.random() * 4),
        status: [0, 0, 0],
      };
    });
  };

  const data = {
    "Aulas da semana anterior": getWeekDates(-1),
    "Aulas da semana": getWeekDates(0),
    "Aulas da próxima semana": getWeekDates(1),
  };

  const getBgColor = (dateStr) => {
    const today = new Date();
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    if (date.getTime() === today.getTime()) return "#c8f0cd";
    if (date < today) return "#b9e2ff";
    return "#eee";
  };

  return (
    <div className="container-fluid p-4">
      <div className="row mb-3 align-items-center">
        <div className="col-md-4">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Pesquisar" />
          </div>
        </div>
        <div className="col-md-6 text-md-end mt-2 mt-md-0">
          <button className="btn btn-light me-2">Semanal</button>
           <button className="btn btn-primary"onClick={() => navigate('../CriarAgenda')}>Agendar</button>
        </div>
      </div>

      {Object.entries(data).map(([sectionTitle, days]) => (
        <div key={sectionTitle} className="mb-4">
          <h6 className="fw-bold mb-3">{sectionTitle}</h6>
          <div className="row g-2">
            {days.map((day, index) => (
              <div key={index} className="col-xs-6 col-sm-4 col-md-2">
                <div
                  className="card"
                  style={{
                    backgroundColor: getBgColor(day.date),
                    borderRadius: "10px"
                  }}
                >
                  <div className="card-body text-center p-2">
                    <div className="fw-bold">{day.date}</div>
                    <div className="my-1 fw-bold" style={{ fontSize: "24px" }}>
                      {day.total}
                    </div>
                    <div className="d-flex justify-content-center gap-1">
                      {day.status.map((num, idx) => (
                        <span
                          key={idx}
                          className="badge bg-secondary"
                          style={{
                            borderRadius: "4px",
                            width: "24px",
                            height: "24px",
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Agenda;
