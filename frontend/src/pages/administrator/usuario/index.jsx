import './style.css';
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
        <div className='container'>
            <div className='registration'>
                <p>Tipos de cadastro:</p>
                <div className='registration-buttons'>
                    <button onClick={() => navigate('/cadastro-de-aluno')}>Aluno</button>
                    <button>Professor</button>
                </div>
            </div>

            <div className="user-table">
                <div className='user-table-header'>
                    <h2>Usuários Cadastrados</h2>
                    <div className='filters'>
                        <input type="text" placeholder="Pesquisar usuário..." />
                        <select>
                            <option value="">Todos</option>
                            <option value="aluno">Aluno</option>
                            <option value="professor">Professor</option>
                        </select>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr
                                key={user.id}
                                onClick={() => goToProfile(user.id)}
                                className="clickable-row"
                            >
                                <td>{user.name}</td>
                                <td>{user.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button
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