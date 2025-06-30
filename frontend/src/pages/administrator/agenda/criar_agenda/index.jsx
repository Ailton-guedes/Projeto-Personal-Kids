import React, { useState, useEffect } from 'react';
import { listarProfessor, criarAula } from '../../../../service/api';

const CriarAgenda = () => {
    const [formData, setFormData] = useState({
        id_professor: '',
        modalidade: '',
        day_week: '',
        start_time: '',
        end_time: '',
        max_alunos: 1,
        status: 'ativa',
    });

    const [professors, setProfessors] = useState([]);
    const [selectedProfessorModalidades, setSelectedProfessorModalidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null);

    const diasSemanaOpcoes = [
        { label: 'Segunda-feira', value: 'segunda' },
        { label: 'Terça-feira', value: 'terca' },
        { label: 'Quarta-feira', value: 'quarta' },
        { label: 'Quinta-feira', value: 'quinta' },
        { label: 'Sexta-feira', value: 'sexta' },
        { label: 'Sábado', value: 'sabado' },
        { label: 'Domingo', value: 'domingo' },
    ];

    const allTiposAulaOpcoes = [
        { label: 'Natação', value: 'natacao' },
        { label: 'Artística', value: 'artistica' },
        { label: 'Funcional', value: 'funcional' },
        { label: 'Psicomotricidade', value: 'psicomotricidade' },
    ];

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                setLoading(true);
                const response = await listarProfessor(); 
                setProfessors(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erro ao carregar professores:", err);
                setError("Falha ao carregar professores. Por favor, tente novamente.");
                setLoading(false);
            }
        };
        fetchProfessors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target; 
        
        setFormData(prevData => {
            const newData = {
                ...prevData,
                [name]: value,
            };

            if (name === 'id_professor') {
                const selectedProf = professors.find(p => p.id === value);
                if (selectedProf) {
                    setSelectedProfessorModalidades(selectedProf.modalidade);
                    if (!selectedProf.modalidade.includes(newData.modalidade)) {
                        newData.modalidade = '';
                    }
                } else {
                    setSelectedProfessorModalidades([]);
                    newData.modalidade = '';
                }
            }
            return newData;
        });
    };

    const filteredTiposAulaOpcoes = allTiposAulaOpcoes.filter(opcao => 
        selectedProfessorModalidades.includes(opcao.value)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null);
        setError(null);

        if (!formData.id_professor || !formData.modalidade || !formData.day_week || 
            !formData.start_time || !formData.end_time || !formData.max_alunos) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const payload = {
            id_professor: formData.id_professor,
            modalidade: formData.modalidade,
            day_week: formData.day_week,
            start_time: formData.start_time,
            end_time: formData.end_time,
            max_alunos: parseInt(formData.max_alunos, 10),
            status: formData.status,
        };

        try {
            const response = await criarAula(payload); 
            setSubmitStatus('success');
            setFormData({
                id_professor: '',
                modalidade: '',
                day_week: '',
                start_time: '',
                end_time: '',
                max_alunos: 1,
                status: 'ativa',
            });
            setSelectedProfessorModalidades([]);
        } catch (err) {
            console.error('Erro ao criar agenda:', err.response ? err.response.data : err.message);
            setSubmitStatus('error');
            setError(err.response && err.response.data && err.response.data.error 
                     ? err.response.data.error 
                     : 'Ocorreu um erro ao criar a agenda.');
        }
    };

    if (loading) {
        return <div className="container p-4">Carregando professores...</div>;
    }

    if (error && !submitStatus) {
        return <div className="container p-4 text-danger">Erro ao carregar dados: {error}</div>;
    }

    return (
        <div className="container p-4" style={{ backgroundColor: '#ffd1dc', maxWidth: '700px' }}>
            <h2 className="text-center">Novo Agendamento</h2>

            {submitStatus === 'success' && (
                <div className="alert alert-success" role="alert">
                    Agendamento salvo com sucesso!
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="alert alert-danger" role="alert">
                    Erro ao salvar agendamento: {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id_professor" className="form-label">Professor</label>
                    <select
                        className="form-select"
                        id="id_professor"
                        name="id_professor" 
                        value={formData.id_professor}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione um Professor</option>
                        {professors.map(professor => (
                            <option key={professor.id} value={professor.id}>
                                {professor.name} ({professor.modalidade.join(', ') || 'N/A'})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="modalidade" className="form-label">Modalidade</label>
                    <select
                        className="form-select"
                        id="modalidade"
                        name="modalidade" 
                        value={formData.modalidade}
                        onChange={handleChange}
                        required
                        disabled={!formData.id_professor}
                    >
                        <option value="">Selecione a Modalidade</option>
                        {filteredTiposAulaOpcoes.map(opcao => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.label}
                            </option>
                        ))}
                    </select>
                    {!formData.id_professor && (
                        <small className="form-text text-muted">
                            Selecione um professor para ver as modalidades disponíveis.
                        </small>
                    )}
                    {formData.id_professor && filteredTiposAulaOpcoes.length === 0 && (
                        <small className="form-text text-warning">
                            O professor selecionado não possui modalidades de aula cadastradas.
                        </small>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="day_week" className="form-label">Dia da Semana</label>
                    <select
                        className="form-select"
                        id="day_week"
                        name="day_week" 
                        value={formData.day_week}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione o Dia da Semana</option>
                        {diasSemanaOpcoes.map(opcao => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="max_alunos" className="form-label">Máximo de alunos (1 a 10)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="max_alunos"
                        name="max_alunos" 
                        min="1"
                        max="10" 
                        value={formData.max_alunos}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="start_time" className="form-label">Hora Início</label>
                        <input
                            type="time"
                            className="form-control"
                            id="start_time"
                            name="start_time" 
                            value={formData.start_time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="end_time" className="form-label">Hora Fim</label>
                        <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            name="end_time" 
                            value={formData.end_time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Salvar Agendamento</button>
                </div>
            </form>
        </div>
    );
};

export default CriarAgenda;
