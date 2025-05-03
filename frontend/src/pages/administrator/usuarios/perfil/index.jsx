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
      <div className="bg-white rounded shadow-sm p-4 mb-4" style={{ backgroundColor: '#F8CDE2' }}>
        <h2 className="fs-5 fw-bold m-0" style={{ color: '#A5D8FF' }}>Perfil de {user.name}</h2>
        <br />
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control rounded-3"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control rounded-3"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo</label>
              <select
                className="form-control rounded-3"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="professor">Professor</option>
                <option value="aluno">Aluno</option>
                <option value="responsavel">Responsável</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="email"
                className="form-control rounded-3"
                name="email"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-control rounded-3"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="ativo">Ativado</option>
                <option value="desativado">Desativado</option>
              </select>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary rounded-3"
              >
                Salvar
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-3"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-3">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Tipo:</strong> {user.type}</p>
            <p><strong>Status:</strong> {user.status}</p>
            <div className="d-flex justify-content-start">
              <button
                className="btn btn-primary rounded-3"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;