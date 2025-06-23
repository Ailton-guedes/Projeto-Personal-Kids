import React, { useState } from 'react';

function Planos() {
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    aulasPorSemana: '1', // padrão 1 aula por semana
  });

  const [planos, setPlanos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.preco) {
      alert('Por favor, preencha nome e preço.');
      return;
    }
    if (!formData.aulasPorSemana) {
      alert('Por favor, selecione a quantidade de aulas por semana.');
      return;
    }

    if (editId) {
      setPlanos(prev => prev.map(plano =>
        plano.id === editId ? { ...plano, ...formData } : plano
      ));
      setEditId(null);
    } else {
      const novoPlano = { id: Date.now(), ...formData };
      setPlanos(prev => [...prev, novoPlano]);
    }

    setFormData({ nome: '', preco: '', aulasPorSemana: '1' });
  };

  const handleEditar = (plano) => {
    setEditId(plano.id);
    setFormData({
      nome: plano.nome,
      preco: plano.preco,
      aulasPorSemana: plano.aulasPorSemana,
    });
    setExpandedId(plano.id);
  };

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="container p-4" style={{ maxWidth: '600px', backgroundColor: '#ffd1dc', borderRadius: '8px' }}>
      <h2 className="text-center mb-4">{editId ? 'Editar Plano' : 'Criar Plano'}</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome do Plano</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite o nome do plano"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="preco" className="form-label">Preço</label>
          <input
            type="number"
            className="form-control"
            id="preco"
            value={formData.preco}
            onChange={handleChange}
            placeholder="Digite o preço"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="aulasPorSemana" className="form-label">Aulas por Semana</label>
          <select
            id="aulasPorSemana"
            className="form-select"
            value={formData.aulasPorSemana}
            onChange={handleChange}
            required
          >
            <option value="1">1 aula por semana</option>
            <option value="2">2 aulas por semana</option>
            <option value="3">3 aulas por semana</option>
            <option value="4">4 aulas por semana</option>
            <option value="5">5 aulas por semana</option>
          </select>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">{editId ? 'Salvar Alterações' : 'Criar Plano'}</button>
          {editId && (
            <button 
              type="button" 
              className="btn btn-secondary ms-2" 
              onClick={() => {
                setEditId(null);
                setFormData({ nome: '', preco: '', aulasPorSemana: '1' });
              }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3 className="mt-5">Lista de Planos</h3>
      <ul className="list-group">
        {planos.map((plano) => (
          <li 
            key={plano.id} 
            className="list-group-item"
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between align-items-center" onClick={() => toggleExpand(plano.id)}>
              <strong>{plano.nome}</strong>
              <div>
                <span className="badge bg-success me-3">R$ {Number(plano.preco).toFixed(2)}</span>
                <button 
                  className="btn btn-sm btn-outline-primary" 
                  onClick={e => {
                    e.stopPropagation();
                    handleEditar(plano);
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
            {expandedId === plano.id && (
              <div className="mt-3">
                <p><strong>Aulas por Semana:</strong> {plano.aulasPorSemana}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Planos;
