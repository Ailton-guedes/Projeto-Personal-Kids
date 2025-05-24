import { criarResponsavel } from '../../../../service/api';
import { useState } from 'react';


const Cadastro_responsavel = () => {
    
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
        password: '',
    });

    const enviarDados = async (e) => {
        e.preventDefault();
        try {
            const response = await criarResponsavel(formData);
            console.log('Cadastro responsavel realizado', response.data)
        } catch (error) {
            console.error('Erro ao cadastrar responsavel', error);
        }
    };


    return (
        <div className="container">
            <h1 className="text-center text-dark mt-2">Cadastro de Responsavel</h1>
            <form
                onSubmit={enviarDados}
                method="post"
                className="p-3 rounded shadow-sm"
                style={{ backgroundColor: '#f3b9e3', maxWidth: '800px', margin: '10px auto', fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
                <div className="mb-2">
                    <label htmlFor="name" className="form-label" style={{ fontSize: '16px' }}>Nome Completo</label>
                    <input type="text" onChange={handleChange} value={formData.name} name="name" className="form-control py-1" required />
                </div>

                <div className="mb-2">
                    <label htmlFor="cpf" className="form-label" style={{ fontSize: '16px' }}>CPF</label>
                    <input type="text" onChange={handleChange} value={formData.cpf} name="cpf" className="form-control py-1" required />
                </div>

               
                <div className="col-md-4">
                    <label htmlFor="email" className="form-label" style={{ fontSize: '16px' }}>Email</label>
                    <input type="email" onChange={handleChange} value={formData.email} name="email" className="form-control py-1" required />
                </div>

               <div className="col-md-4">
                    <label htmlFor="password" className="form-label" style={{ fontSize: '16px' }}>Senha</label>
                    <input type="password" onChange={handleChange} value={formData.password} name="password" className="form-control py-1" required />
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
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Cadastro_responsavel;