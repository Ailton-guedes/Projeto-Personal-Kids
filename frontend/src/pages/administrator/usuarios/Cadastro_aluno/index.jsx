import { criarAluno } from '../../../../service/api';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CadastroAluno = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const idUser = location.state?.id;

    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        password: '',
        id_responsavel: '',
    });

    useEffect(() => {
        if (idUser) {
            setFormData((prev) => ({
                ...prev,
                id_responsavel: idUser,
            }));
        }
    }, [idUser]);

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

            navigate('/usuarios', { state: { message: 'Aluno cadastrado com sucesso!' } });
        } catch (error) {
            console.error('Erro ao cadastrar aluno', error);
        }
    };

    return (
        <div className="container mt-4">
            <form
                onSubmit={enviarDados}
                method="post"
                className="p-4 rounded shadow-sm mt-3"
                style={{
                    backgroundColor: '#ffd1dc',
                    maxWidth: '600px',
                    margin: '10px auto',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                }}
            >
                <div className='text-center mb-4'>
                    <h1 style={{ fontSize: '38px', fontWeight: 'bold', color: '#222' }}>
                        Cadastro de Aluno
                    </h1>
                </div>


                <div className="mb-2">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
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

export default CadastroAluno;
