import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { perfilUsuario, editarUsuario } from '../../../../service/api';

const Perfil = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', type: '', status: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await perfilUsuario(id);
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          type: response.data.type,
          status: response.data.status
        });
      } catch (error) {
        setError('Erro ao carregar os dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editarUsuario(id, formData.name, formData.email, formData.status, formData.type, formData.password);
      setIsEditing(false);
      setUser({ ...user, ...formData });
    } catch (error) {
      setError('Erro ao editar o usuário');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container py-4">
      <div className="bg-white rounded shadow-sm p-4" style={{ backgroundColor: '#F8CDE2' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-5 fw-bold mb-4">
            Perfil de {user.name}
          </h2>
          <span
            className={`px-3 py-1 rounded-3 fw-bold text-white ${formData.status === 'ativo' ? 'bg-success' : 'bg-danger'
              }`}m
          >
            {formData.status === 'ativo' ? 'Ativado' : 'Desativado'}
          </span>
        </div>

        <div className="d-flex gap-4 flex-wrap">
          <div>
            <div
              className="rounded-circle bg-light border"
              style={{ width: '120px', height: '120px' }}
            />
          </div>

          <div className="flex-grow-1">
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control rounded-3"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                readOnly={!isEditing}
                disabled={!isEditing}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo</label>
              <select
                className="form-control rounded-3"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="professor">Professor</option>
                <option value="aluno">Aluno</option>
                <option value="responsavel">Responsável</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
              disabled={!isEditing}
            />
          </div>
          {isEditing && (<div className="col-md-6 mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-control rounded-3"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="ativo">Ativado</option>
              <option value="desativado">Desativado</option>
            </select>
          </div>
          )}

          {isEditing && (
            <div className="col-md-6 mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-control rounded-3"
                name="password"
                value={formData.password}
                placeholder="Digite a nova senha"
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>

        <div className="d-flex justify-content-start gap-2 mt-3">
          {isEditing ? (
            <>
              <button type="button" className="btn btn-success" onClick={handleSubmit}>
                Salvar
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              Editar
            </button>
          )}
        </div>
      </div>
    </div>

  );
};

export default Perfil;