// src/pages/administrator/CriarAgenda.js
import React, { useState } from 'react'; // Importe useState

const CriarAgenda = () => {
  // Use o estado para gerenciar os valores do formulário
  const [formData, setFormData] = useState({
    dataAgendamento: '',
    horaInicio: '',
    horaFim: '',
    descricao: '',
    repetirMensalmente: false, // Novo campo para agendamento mensal
    aulasPorSemana: 1, // Novo campo para quantas aulas por semana (padrão 1)
  });

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    console.log('Dados do Agendamento:', formData);
    // Aqui você adicionaria a lógica para salvar o agendamento no seu backend
    // Você precisaria processar 'repetirMensalmente' e 'aulasPorSemana'
    // para criar os agendamentos múltiplos conforme a necessidade.
    alert('Agendamento salvo! Verifique o console para os dados.');
    // Poderia redirecionar o usuário após o agendamento:
    // navigate('/agenda');
  };

  return (
    <div
      className="container p-4"
      style={{
        backgroundColor: '#ffd1dc',
        margin: '0 auto',
        maxWidth: '600px',
        width: '100%',
      }}
    >
      <h2> Novo Agendamento</h2>
      <form onSubmit={handleSubmit}> {/* Adicione o onSubmit */}
        <div className="mb-3">
          <label htmlFor="dataAgendamento" className="form-label">Data:</label>
          <input
            type="date"
            className="form-control"
            id="dataAgendamento"
            value={formData.dataAgendamento}
            onChange={handleChange}
            required // Campo obrigatório
          />
        </div>
        <div className="mb-3">
          <label htmlFor="horaInicio" className="form-label">Hora Inicio:</label>
          <input
            type="time"
            className="form-control"
            id="horaAgendamento"
            value={formData.horaAgendamento}
            onChange={handleChange}
            required // Campo obrigatório
          />
        </div>

          <div className="mb-3">
          <label htmlFor="horaFim" className="form-label">Hora Fim:</label>
          <input
            type="time"
            className="form-control"
            id="horaAgendamento"
            value={formData.horaAgendamento}
            onChange={handleChange}
            required // Campo obrigatório
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição:</label>
          <textarea
            className="form-control"
            id="descricao"
            rows="3"
            value={formData.descricao}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* --- Nova Opção: Agendar todo mês --- */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="repetirMensalmente"
            checked={formData.repetirMensalmente}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="repetirMensalmente">
            Repetir este agendamento todo mês
          </label>
        </div>

        {/* --- Nova Opção: Mais de uma aula por semana --- */}
        <div className="mb-3">
          <label htmlFor="aulasPorSemana" className="form-label">
            Número de aulas por semana:
          </label>
          <select
            className="form-select"
            id="aulasPorSemana"
            value={formData.aulasPorSemana}
            onChange={handleChange}
          >
            <option value="1">1 aula por semana</option>
            <option value="2">2 aulas por semana</option>
            <option value="3">3 aulas por semana</option>
            <option value="4">4 aulas por semana</option>
            <option value="5">5 aulas por semana</option>
            <option value="6">6 aulas por semana (seg-sáb)</option>
          </select>
          <small className="form-text text-muted">
            Selecione quantas vezes por semana esta aula se repetirá (a partir da data inicial).
          </small>
        </div>

        <button type="submit" className="btn btn-primary">Salvar Agendamento</button>
      </form>
    </div>
  );
};

export default CriarAgenda;