import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();

  const allUsers = [
    { id: 1, name: 'João Silva', type: 'Aluno' },
    { id: 2, name: 'Maria Souza', type: 'Professor' },
    { id: 3, name: 'Pedro Oliveira', type: 'Aluno' },
    { id: 4, name: 'Ana Martins', type: 'Professor' },
    { id: 5, name: 'Carlos Lima', type: 'Aluno' },
    { id: 6, name: 'Fernanda Dias', type: 'Professor' },
    { id: 7, name: 'Bruno Alves', type: 'Aluno' },
    { id: 8, name: 'Larissa Costa', type: 'Aluno' },
    { id: 9, name: 'Marcos Vinicius', type: 'Professor' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentUsers = allUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allUsers.length / rowsPerPage);

  const goToProfile = (id) => {
    navigate(`/perfil/${id}`);
  };

  return (
    <div className="container py-4">
      <div className="bg-white border rounded shadow-sm p-4 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
        <p className="m-0 fw-semibold">Tipos de cadastro:</p>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => navigate('/usuarios/cadastro-de-aluno')}>
            Aluno
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/usuarios/cadastro-de-professor')}>Professor</button>
        </div>
      </div>

      <div className="bg-white border rounded shadow-sm p-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
          <h2 className="fs-5 fw-bold m-0">Usuários Cadastrados</h2>
          <div className="d-flex flex-column flex-sm-row gap-2">
            <input type="text" className="form-control" placeholder="Pesquisar usuário..." />
            <select className="form-select">
              <option value="">Todos</option>
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} onClick={() => goToProfile(user.id)} style={{ cursor: 'pointer' }}>
                  <td>{user.name}</td>
                  <td>{user.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3 border-top pt-3 mt-3">
          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="fw-medium">Página {currentPage} de {totalPages}</span>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
