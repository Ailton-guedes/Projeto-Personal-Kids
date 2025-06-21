import { criarResponsavel } from '../../../../service/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cadastro_responsavel = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        rg: '',
        email: '',
        dataNascimento: '',
        instagram: '',
        password: '',
        autorizacaoImagem: 'nao',
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
            const response = await criarResponsavel(formData);
            console.log('Cadastro responsavel realizado', response.data);
            navigate('/usuarios');
        } catch (error) {
            console.error('Erro ao cadastrar responsavel', error);
        }
    };

    return (
        <div className="container-fluid" style={{ minHeight: '100vh', paddingTop: '20px' }}>
            <form
                onSubmit={enviarDados}
                method="post"
                className="p-3 rounded shadow-sm"
                style={{
                    backgroundColor: '#ffd1dc',
                    maxWidth: '600px',
                    margin: '0 auto 20px auto',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <h1 className="text-center text-dark mb-4 fw-bold">Cadastro de Responsável</h1>

               
                <div>
                    <label htmlFor="name" className="form-label">Nome Completo</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control py-1" required />
                </div>

                
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className="flex-fill">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="form-control py-1" required />
                    </div>
                    <div className="flex-fill">
                        <label htmlFor="rg" className="form-label">RG</label>
                        <input type="text" name="rg" value={formData.rg} onChange={handleChange} className="form-control py-1" required />
                    </div>
                </div>

              
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className="flex-fill">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control py-1" required />
                    </div>
                    <div className="flex-fill">
                        <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                        <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className="form-control py-1" required />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className="flex-fill">
                        <label htmlFor="instagram" className="form-label">Instagram</label>
                        <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="form-control py-1" />
                    </div>
                    <div className="flex-fill">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control py-1" required />
                    </div>
                </div>

       
                <div>
                    <label className="form-label">Autorização de Uso de Imagem</label>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="autorizacaoImagem"
                                value="sim"
                                id="autorizacaoSim"
                                checked={formData.autorizacaoImagem === 'sim'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="autorizacaoSim">Sim</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="autorizacaoImagem"
                                value="nao"
                                id="autorizacaoNao"
                                checked={formData.autorizacaoImagem === 'nao'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="autorizacaoNao">Não</label>
                        </div>
                    </div>
                </div>

               
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            backgroundColor: '#7bd4f7',
                            color: 'black',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontSize: '16px',
                            width: '50%',
                        }}
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Cadastro_responsavel;
