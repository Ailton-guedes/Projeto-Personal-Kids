import { criarUsuario } from '../../../../service/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CadastroAdmin = () => {
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        type: '',
        password: '',
    });

    const enviarDados = async (e) => {
        e.preventDefault();
        try {
            const response = await criarUsuario(formData);
            console.log('Cadastro realizado', response.data)
            navigate('/login')

        } catch (error) {
            console.error('Erro ao cadastrar', error);
        }
    };


    return (
        <div className="container">
            <div
                className="container-fluid d-flex align-items-center gap-2"
                style={{
                    minHeight: '100vh',
                    paddingLeft: '5%',
                }}
            >
                <div className="row w-100 justify-content-center gap-4 align-items-center">
                    <div
                        className="col-md-5"
                        style={{
                            backgroundColor: '#ffd1dc',
                            padding: '45px',
                            borderRadius: '15px',
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                            marginRight: '50px',
                            maxWidth: '400px',
                        }}
                    >
                        <h1 className='mb-2' style={{ fontSize: '32px', fontWeight: 'bold', color: '#222' }}>
                            Cadastrar
                            <span
                                style={{
                                    color: '#ff5252',
                                    fontSize: '12px',
                                    marginLeft: '10px',
                                    position: 'relative',
                                    top: '-10px',
                                }}
                            >
                                Adm
                            </span>
                        </h1>
                        <form
                            onSubmit={enviarDados}
                            method="post"
                            className='gap-2'
                        >
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label" style={{ fontSize: '16px' }}>Nome Completo</label>
                                <input type="text" onChange={handleChange} value={formData.name} name="name" className="form-control"
                                    style={{
                                        borderRadius: '8px',
                                        padding: '12px',
                                        fontSize: '16px',
                                    }} required />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="cpf" className="form-label" style={{ fontSize: '16px' }}>CPF</label>
                                <input type="text" onChange={handleChange} value={formData.cpf} name="cpf" className="form-control"
                                    style={{
                                        borderRadius: '8px',
                                        padding: '12px',
                                        fontSize: '16px',
                                    }} required />
                            </div>


                            <div className="mb-2">
                                <label htmlFor="email" className="form-label" style={{ fontSize: '16px' }}>Email</label>
                                <input type="email" onChange={handleChange} value={formData.email} name="email" className="form-control"
                                    style={{
                                        borderRadius: '8px',
                                        padding: '12px',
                                        fontSize: '16px',
                                    }} required />
                            </div>



                            <div className="mb-3">
                                <label htmlFor="password" className="form-label" style={{ fontSize: '16px' }}>Senha</label>
                                <input type="password" onChange={handleChange} value={formData.password} name="password" className="form-control"
                                    style={{
                                        borderRadius: '8px',
                                        padding: '12px',
                                        fontSize: '16px',
                                    }} required />
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
                                <a
                                    href="/login"
                                    className="d-block text-end mt-3"
                                    style={{ color: '#0078ff', textDecoration: 'none' }}
                                >
                                    Voltar para o login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastroAdmin;