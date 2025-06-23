import { criarAluno } from '../../../../service/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cadastro_aluno = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    responsavel: '',
    dataNascimento: '',
    plano: 'mensal',
    diasSemana: [],
    horariosSelecionados: {}, 
    valorMensalidade: {}, 
  });

  const diasSemanaOpcoes = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const horariosPorPeriodo = {
    manhã: ['08:00', '09:00', '10:00', '11:00'],
    tarde: ['13:00', '14:00', '15:00', '16:00', '17:00'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      diasSemana: checked
        ? [...prev.diasSemana, value]
        : prev.diasSemana.filter((dia) => dia !== value),
      horariosSelecionados: checked
        ? { ...prev.horariosSelecionados, [value]: [] }
        : Object.fromEntries(
            Object.entries(prev.horariosSelecionados).filter(([dia]) => dia !== value)
          ),
    }));
  };

  const toggleHorario = (dia, hora) => {
    setFormData((prev) => {
      const horariosDoDia = prev.horariosSelecionados[dia] || [];
      const jaSelecionado = horariosDoDia.includes(hora);

      let novosHorarios;
      if (jaSelecionado) {
        novosHorarios = horariosDoDia.filter((h) => h !== hora);
      } else if (horariosDoDia.length < 2) {
        novosHorarios = [...horariosDoDia, hora];
      } else {
        // máximo de 2 horários por dia
        return prev;
      }

      return {
        ...prev,
        horariosSelecionados: {
          ...prev.horariosSelecionados,
          [dia]: novosHorarios,
        },
      };
    });
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
          <label className="form-label">Nome Aluno</label>
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
          <label className="form-label">Responsavel</label>
          <input
            type="text"
            name="responsavel"
            value={formData.responsavel}
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
            <option value="mensal">Mensal 1 Mês</option>
            <option value="trimestral">Trimestral 3 Meses</option>
            <option value="semestral">Semestral 6 Meses</option>
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
                <label className="form-check-label" htmlFor={`dia-${dia}`}>
                  {dia}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Grade de horários por dia da semana */}
        {formData.diasSemana.map((dia) => (
          <div key={dia} className="mb-4">
            <label className="form-label">{dia}</label>

            <div><strong>Manhã</strong></div>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {horariosPorPeriodo.manhã.map((hora) => (
                <button
                  key={`${dia}-${hora}`}
                  type="button"
                  className={`btn btn-sm ${formData.horariosSelecionados[dia]?.includes(hora) ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => toggleHorario(dia, hora)}
                >
                  {hora}
                </button>
              ))}
            </div>

            <div><strong>Tarde</strong></div>
            <div className="d-flex flex-wrap gap-2">
              {horariosPorPeriodo.tarde.map((hora) => (
                <button
                  key={`${dia}-${hora}`}
                  type="button"
                  className={`btn btn-sm ${formData.horariosSelecionados[dia]?.includes(hora) ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => toggleHorario(dia, hora)}
                >
                  {hora}
                </button>
              ))}
            </div>
          </div>
        ))}

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
          
                <div>
              <p className="text-center mt-3 fw-bold">Valor da mensalidade:{' '}
              <span className="text-success">R$ ---</span>
             </p>
                </div>

        </div>
      </form>
    </div>
  );
};

export default Cadastro_aluno;
