import { criarProfessor } from '../../../../service/api';
import { useState } from 'react';

const Cadastro_professor = () => {
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        password: '',
        type_class: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'type_class') {
            const arrayValue = value.split(',').map(item => item.trim());
            setFormData((prev) => ({
                ...prev,
                [name]: arrayValue,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const enviarDados = async (e) => {
        e.preventDefault();
        try {
            const response = await criarProfessor(formData);
            console.log('Professor cadastrado', response.data);
        } catch (error) {
            console.error('Erro ao cadastrar professor:', error);
        }
    };


    const tiposDeAula = ['Natação', 'Hidroginástica', 'Pilates', 'Yoga'];

    return (
        <div className="container">
            <h1 className="text-center text-dark mt-2">Cadastro de Professor</h1>
            <form
                onSubmit={enviarDados}
                className="p-3 rounded shadow-sm"
                style={{
                    backgroundColor: '#f3b9e3',
                    maxWidth: '800px',
                    margin: '10px auto',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                }}
            >
                <div className="mb-2">
                    <label htmlFor="name" className="form-label" style={{ fontSize: '16px' }}>Nome Completo</label>
                    <input type="text" onChange={handleChange} value={formData.name} name="name" className="form-control py-1" required />
                </div>

                <div className="mb-2">
                    <label htmlFor="email" className="form-label" style={{ fontSize: '16px' }}>Email</label>
                    <input type="email" onChange={handleChange} value={formData.email} name="email" className="form-control py-1" required />
                </div>

                <div className="mb-2">
                    <label htmlFor="cpf" className="form-label" style={{ fontSize: '16px' }}>CPF</label>
                    <input type="text" onChange={handleChange} value={formData.cpf} name="cpf" className="form-control py-1" required />
                </div>

                <div className="mb-2">
                    <label htmlFor="password" className="form-label" style={{ fontSize: '16px' }}>Senha</label>
                    <input type="password" onChange={handleChange} value={formData.password} name="password" className="form-control py-1" required />
                </div>

                <div className="mb-4">
                    <label className="form-label" style={{ fontSize: '16px' }}>Tipo de Aula</label>
                    <div>
                        {tiposDeAula.map((tipo) => (
                            <div key={tipo} className="form-check">
                                <input
                                    type="checkbox"
                                    id={`tipo_${tipo}`}
                                    name="type_class"
                                    value={tipo}
                                    checked={formData.type_class.includes(tipo)}
                                    onChange={(e) => {
                                        const { checked, value } = e.target;
                                        setFormData((prev) => {
                                            let newTypes = [...prev.type_class];
                                            if (checked) {
                                                newTypes.push(value);
                                            } else {
                                                newTypes = newTypes.filter((t) => t !== value);
                                            }
                                            return { ...prev, type_class: newTypes };
                                        });
                                    }}
                                    className="form-check-input"
                                />
                                <label htmlFor={`tipo_${tipo}`} className="form-check-label">
                                    {tipo}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Cadastro_professor;