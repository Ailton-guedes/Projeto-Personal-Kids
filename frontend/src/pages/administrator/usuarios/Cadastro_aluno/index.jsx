import { criarAluno } from '../../../../service/api';
import { useState } from 'react';

const CadastroAluno = () => {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        email: '',
        type: '',
        password: '',
        id_responsavel: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const enviarDados = async (e) => {
        e.preventDefault();
        try {
            const response = await criarAluno(formData);
            console.log('Cadastro de aluno realizado com sucesso', response.data);
        } catch (error) {
            console.error('Erro ao cadastrar aluno', error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center text-dark mt-2">Cadastro de Aluno</h1>
            <form
                onSubmit={enviarDados}
                method="post"
                className="p-3 rounded shadow-sm"
                style={{
                    backgroundColor: '#f3b9e3',
                    maxWidth: '800px',
                    margin: '10px auto',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                }}
            >
                <div className="mb-2">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="form-control py-1"
                        required
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        className="form-control py-1"
                        required
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control py-1"
                        required
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="type" className="form-label">Tipo de Usuário</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="form-control py-1"
                        required
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control py-1"
                        required
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="id_responsavel" className="form-label">ID do Responsável</label>
                    <input
                        type="text"
                        name="id_responsavel"
                        value={formData.id_responsavel}
                        onChange={handleChange}
                        className="form-control py-1"
                        required
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            backgroundColor: 'rgb(9, 1, 166)',
                            color: 'rgb(221, 214, 238)',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontSize: '16px',
                            width: '50%',
                        }}
                    >
                        Cadastrar Aluno
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CadastroAluno;
