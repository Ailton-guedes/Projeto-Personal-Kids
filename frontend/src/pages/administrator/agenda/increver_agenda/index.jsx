import React, { useState, useEffect } from 'react';
import { listarAlunos, listarAgendaSemana, inscreverAgenda } from '../../../../service/api';

const InscreverAgenda = () => {
    const [alunos, setAlunos] = useState([]);
    const [agendas, setAgendas] = useState([]);
    const [alunoSelecionadoId, setAlunoSelecionadoId] = useState('');
    const [agendaSelecionadaId, setAgendaSelecionadaId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null);

    const [filtroModalidade, setFiltroModalidade] = useState('');
    const [filtroDiaSemana, setFiltroDiaSemana] = useState('');

    const diasSemanaOpcoes = [
        { label: 'Segunda-feira', value: 'segunda' },
        { label: 'Terça-feira', value: 'terca' },
        { label: 'Quarta-feira', value: 'quarta' },
        { label: 'Quinta-feira', value: 'quinta' },
        { label: 'Sexta-feira', value: 'sexta' },
        { label: 'Sábado', value: 'sabado' },
        { label: 'Domingo', value: 'domingo' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const alunosResponse = await listarAlunos();
                setAlunos(alunosResponse.data);

                const agendasResponse = await listarAgendaSemana();
                setAgendas(agendasResponse.data);
                setLoading(false);
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
                setError("Falha ao carregar alunos ou agendas. Por favor, tente novamente.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAlunoChange = (e) => {
        setAlunoSelecionadoId(e.target.value);
        setSubmitStatus(null);
    };

    const handleFiltroModalidadeChange = (e) => {
        setFiltroModalidade(e.target.value);
    };

    const handleFiltroDiaSemanaChange = (e) => {
        setFiltroDiaSemana(e.target.value);
    };

    const handleInscrever = async (agendaId) => {
        if (!alunoSelecionadoId) {
            alert('Por favor, selecione um aluno primeiro.');
            return;
        }

        setSubmitStatus(null);
        setError(null);

        const payload = {
            id_aluno: alunoSelecionadoId,
            id_agenda_regular: agendaId,
        };

        try {
            await inscreverAgenda(payload);
            setSubmitStatus('success');
            setAlunoSelecionadoId('');
            setAgendaSelecionadaId('');

            const agendasResponse = await listarAgendaSemana();
            setAgendas(agendasResponse.data);
        } catch (err) {
            console.error('Erro ao inscrever aluno:', err.response ? err.response.data : err.message);
            setSubmitStatus('error');
            setError(err.response && err.response.data && err.response.data.error
                ? err.response.data.error
                : 'Ocorreu um erro ao inscrever o aluno. Verifique se a aula não está cheia ou se o aluno já está matriculado.');
        }
    };

    const agendasFiltradas = agendas.filter(agenda => {
        const isModalidadeMatch = filtroModalidade ? agenda.modalidade === filtroModalidade : true;
        const isDiaSemanaMatch = filtroDiaSemana ? agenda.dia_semana === filtroDiaSemana : true;
        const isAtiva = agenda.status === 'ativa';
        return isModalidadeMatch && isDiaSemanaMatch && isAtiva;
    });

    if (loading) {
        return <div className="container p-4">Carregando dados...</div>;
    }

    if (error && !submitStatus) {
        return <div className="container p-4 text-danger">Erro ao carregar dados: {error}</div>;
    }

    return (
        <div className="container p-4" style={{ backgroundColor: '#ffd1dc', maxWidth: '900px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2 className="text-center mb-4">Inscrever Alunos em Aulas</h2>

            {submitStatus === 'success' && (
                <div className="alert alert-success" role="alert">
                    Aluno inscrito com sucesso na aula!
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="alert alert-danger" role="alert">
                    Erro na inscrição: {error}
                </div>
            )}

            <div className="card mb-4">
                <div className="card-header bg-primary text-white">
                    <h5>1. Escolha o Aluno</h5>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="alunoSelect" className="form-label">Aluno</label>
                        <select
                            className="form-select"
                            id="alunoSelect"
                            value={alunoSelecionadoId}
                            onChange={handleAlunoChange}
                            required
                        >
                            <option value="">Selecione um Aluno</option>
                            {alunos.map(aluno => (
                                <option key={aluno.id} value={aluno.id}>
                                    {aluno.name} (CPF: {aluno.cpf})
                                </option>
                            ))}
                        </select>
                    </div>
                    {alunoSelecionadoId && alunos.find(a => a.id === alunoSelecionadoId) && (
                        <div className="mt-3 p-2 border rounded bg-light">
                            <h6>Aluno Selecionado:</h6>
                            <p className="mb-1"><strong>Nome:</strong> {alunos.find(a => a.id === alunoSelecionadoId).name}</p>
                            <p className="mb-1"><strong>CPF:</strong> {alunos.find(a => a.id === alunoSelecionadoId).cpf}</p>
                            <p className="mb-0"><strong>Status:</strong> {alunos.find(a => a.id === alunoSelecionadoId).status}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h5>2. Aulas Disponíveis para Inscrição</h5>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="filtroModalidade" className="form-label">Filtrar por Modalidade</label>
                            <select
                                className="form-select"
                                id="filtroModalidade"
                                value={filtroModalidade}
                                onChange={handleFiltroModalidadeChange}
                            >
                                <option value="">Todas as Modalidades</option>
                                {[...new Set(agendas.map(agenda => agenda.modalidade))].map(modalidade => (
                                    <option key={modalidade} value={modalidade}>{modalidade.charAt(0).toUpperCase() + modalidade.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="filtroDiaSemana" className="form-label">Filtrar por Dia da Semana</label>
                            <select
                                className="form-select"
                                id="filtroDiaSemana"
                                value={filtroDiaSemana}
                                onChange={handleFiltroDiaSemanaChange}
                            >
                                <option value="">Todos os Dias</option>
                                {diasSemanaOpcoes.map(opcao => (
                                    <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {agendasFiltradas.length === 0 ? (
                        <div className="alert alert-info text-center">Nenhuma aula disponível com os filtros selecionados.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Modalidade</th>
                                        <th>Dia da Semana</th>
                                        <th>Horário</th>
                                        <th>Professor</th>
                                        <th>Vagas Máx.</th>
                                        <th>Status</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agendasFiltradas.map(agenda => (
                                        <tr key={agenda.id_agenda}>
                                            <td>{agenda.modalidade.charAt(0).toUpperCase() + agenda.modalidade.slice(1)}</td>
                                            <td>{diasSemanaOpcoes.find(d => d.value === agenda.dia_semana)?.label || agenda.dia_semana}</td>
                                            <td>
                                                {new Date(agenda.hora_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                                {new Date(agenda.hora_fim).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td>{agenda.nome_professor}</td>
                                            <td>{agenda.max_aluno}</td>
                                            <td>
                                                <span className={`badge ${agenda.status === 'ativa' ? 'bg-success' : 'bg-danger'}`}>
                                                    {agenda.status.charAt(0).toUpperCase() + agenda.status.slice(1)}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-success"
                                                    onClick={() => handleInscrever(agenda.id_agenda)}
                                                    disabled={!alunoSelecionadoId || agenda.status !== 'ativa'}
                                                >
                                                    Inscrever
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InscreverAgenda;
