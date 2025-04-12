import React from 'react';

const Agenda = () => {
  const data = {
    "Aulas da semana anterior": [
      { date: "03/03", total: 3, status: [2, 1, 0] },
      { date: "04/03", total: 2, status: [2, 0, 0] },
      { date: "05/03", total: 2, status: [1, 0, 0] },
      { date: "06/03", total: 1, status: [0, 0, 0] },
      { date: "07/03", total: 3, status: [1, 1, 0] },
      { date: "08/03", total: 2, status: [2, 0, 0] },
    ],
    "Aulas da semana": [
      { date: "10/03", total: 3, status: [3, 0, 0] },
      { date: "11/03", total: 2, status: [2, 1, 0] },
      { date: "12/03", total: 1, status: [1, 0, 0] },
      { date: "13/03", total: 3, status: [1, 2, 0] },
      { date: "14/03", total: 0, status: [0, 0, 0] },
      { date: "15/03", total: 2, status: [2, 0, 0] },
    ],
    "Aulas da próxima semana": [
      { date: "17/03", total: 3, status: [0, 0, 0] },
      { date: "18/03", total: 2, status: [0, 0, 0] },
      { date: "19/03", total: 1, status: [0, 0, 0] },
      { date: "20/03", total: 3, status: [0, 0, 0] },
      { date: "21/03", total: 0, status: [0, 0, 0] },
      { date: "22/03", total: 2, status: [0, 0, 0] },
    ],
  };

  const getBgColor = (section) => {
    if (section.includes("anterior")) return "#b9e2ff";
    if (section.includes("próxima")) return "#eee";
    return "#c8f0cd";
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
          <button className="btn btn-primary">Agendar</button>
        </div>
      </div>

      {Object.entries(data).map(([sectionTitle, days]) => (
        <div key={sectionTitle} className="mb-4">
          <h6 className="fw-bold mb-3">{sectionTitle}</h6>
          <div className="row g-2">
            {days.map((day, index) => (
              <div key={index} className="col-xs-6 col-sm-4 col-md-2">
                <div className="card" style={{ backgroundColor: getBgColor(sectionTitle), borderRadius: "10px" }}>
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
