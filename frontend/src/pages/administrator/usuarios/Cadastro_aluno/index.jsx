import { criarAluno } from '../../../../service/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cadastro_aluno = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    dataNascimento: '',
    plano: 'mensal',
    diasSemana: [],
    horaInicio: '',
    horaFim: '',
  });

  const diasSemanaOpcoes = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const horariosDisponiveis = ['08:00', '09:00', '10:00', '14:00', '15:00'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (['natacao', 'artes', 'funcional'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        modalidades: {
          ...prev.modalidades,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      diasSemana: checked
        ? [...prev.diasSemana, value]
        : prev.diasSemana.filter((dia) => dia !== value),
    }));
  };

  const enviarDados = async (e) => {
    e.preventDefault();
    try {
      const response = await criarAluno(formData);
      console.log('Aluno cadastrado com sucesso:', response.data);
      navigate('/usuarios', { state: { message: 'Aluno cadastrado com sucesso!' } });
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
    }
  };

  return (
    <div className="container mt-4">
      <form
        onSubmit={enviarDados}
        className="p-4 rounded shadow-sm"
        style={{
          backgroundColor: '#ffd1dc',
          maxWidth: '600px',
          margin: '10px auto',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Cadastro de Aluno
        </h1>

        {/* Nome e CPF */}
        <div className="mb-2">
          <label className="form-label">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Data de nascimento e plano */}
        <div className="mb-2">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Plano</label>
          <select
            name="plano"
            className="form-select"
            value={formData.plano}
            onChange={handleChange}
            required
          >
            <option value="mensal">Mensal</option>
            <option value="trimestral">Trimestral</option>
            <option value="semestral">Semestral</option>
          </select>
        </div>

    

        {/* Dias da Semana */}
        <div className="mb-3">
          <label className="form-label">Dias da Semana</label>
          <div className="d-flex flex-wrap gap-3">
            {diasSemanaOpcoes.map((dia) => (
              <div key={dia} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={dia}
                  id={`dia-${dia}`}
                  checked={formData.diasSemana.includes(dia)}
                  onChange={handleArrayChange}
                />
                <label className="form-check-label" htmlFor={`dia-${dia}`}>{dia}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Horário da Aula */}
        <div className="mb-3">
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="flex-fill">
              <label className="form-label">Hora Início</label>
              <select
                name="horaInicio"
                className="form-select"
                value={formData.horaInicio}
                onChange={handleChange}
                required
              >
                <option value="">Escolha...</option>
                {horariosDisponiveis.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
            <div className="flex-fill">
              <label className="form-label">Hora Fim</label>
              <select
                name="horaFim"
                className="form-select"
                value={formData.horaFim}
                onChange={handleChange}
                required
              >
                <option value="">Escolha...</option>
                {horariosDisponiveis.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Botão de envio */}
        <div className="text-center">
          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              backgroundColor: '#7bd4f7',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '18px',
            }}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Cadastro_aluno;
