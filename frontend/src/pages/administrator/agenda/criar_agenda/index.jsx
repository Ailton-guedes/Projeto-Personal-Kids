import React, { useState } from 'react';

const CriarAgenda = () => {
  const [formData, setFormData] = useState({
    idProfessor: '',
    nomeProfessor: '',
    diasSemana: [],
    maxAlunos: 1,
    tiposAula: [],
    dataAgendamento: '',
    horaInicio: '',
    horaFim: '',
  });

  const diasSemanaOpcoes = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
  const tiposAulaOpcoes = ['Natação', 'Artes', 'Funcional'];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleArrayChange = (e, campo) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [campo]: checked
        ? [...prev[campo], value]
        : prev[campo].filter(item => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do Agendamento:', formData);
    alert('Agendamento salvo! Verifique o console para os dados.');
  };

  return (
    <div className="container p-4" style={{ backgroundColor: '#ffd1dc', maxWidth: '700px' }}>
      <h2 className="text-center">Novo Agendamento</h2>
      <form onSubmit={handleSubmit}>
        {/* ID e Nome do Professor */}
        <div className="mb-3">
          <label htmlFor="idProfessor" className="form-label">ID do Professor</label>
          <input
            type="text"
            className="form-control"
            id="idProfessor"
            value={formData.idProfessor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nomeProfessor" className="form-label">Nome do Professor</label>
          <input
            type="text"
            className="form-control"
            id="nomeProfessor"
            value={formData.nomeProfessor}
            onChange={handleChange}
            required
          />
        </div>

        {/* Dias da Semana */}
        <div className="mb-3">
          <label className="form-label">Dias da Semana</label>
          <div className="d-flex flex-wrap gap-3">
            {diasSemanaOpcoes.map(dia => (
              <div key={dia} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={dia}
                  id={`dia-${dia}`}
                  checked={formData.diasSemana.includes(dia)}
                  onChange={(e) => handleArrayChange(e, 'diasSemana')}
                />
                <label className="form-check-label" htmlFor={`dia-${dia}`}>{dia}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Quantidade máxima de alunos */}
        <div className="mb-3">
          <label htmlFor="maxAlunos" className="form-label">Máximo de alunos (até 3)</label>
          <input
            type="number"
            className="form-control"
            id="maxAlunos"
            min="1"
            max="3"
            value={formData.maxAlunos}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tipo de aula */}
        <div className="mb-3">
          <label className="form-label">Tipos de Aula</label>
          <div className="d-flex flex-wrap gap-3">
            {tiposAulaOpcoes.map(tipo => (
              <div key={tipo} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={tipo}
                  id={`tipo-${tipo}`}
                  checked={formData.tiposAula.includes(tipo)}
                  onChange={(e) => handleArrayChange(e, 'tiposAula')}
                />
                <label className="form-check-label" htmlFor={`tipo-${tipo}`}>{tipo}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Data e horários */}
        <div className="mb-3">
          <label htmlFor="dataAgendamento" className="form-label">Data</label>
          <input
            type="date"
            className="form-control"
            id="dataAgendamento"
            value={formData.dataAgendamento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="horaInicio" className="form-label">Hora Início</label>
            <input
              type="time"
              className="form-control"
              id="horaInicio"
              value={formData.horaInicio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="horaFim" className="form-label">Hora Fim</label>
            <input
              type="time"
              className="form-control"
              id="horaFim"
              value={formData.horaFim}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Botão */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Salvar Agendamento</button>
        </div>
      </form>
    </div>
  );
};

export default CriarAgenda;
