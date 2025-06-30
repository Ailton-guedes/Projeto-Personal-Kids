import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listarAgenda, gerenciarPresenca, listarProfessor } from '../../../../service/api'; // Import listarProfessor

const AgendaDia = () => {
    const { dateStr } = useParams();
    const navigate = useNavigate();

    const [agendaData, setAgendaData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitError, setSubmitError] = useState(null); // For errors during saving

    // State to manage presence and feedback for each student
    const [presencaStates, setPresencaStates] = useState({});

    // NEW: State to manage editable class information (modalidade, status_ocorrencia)
    const [editableClassInfo, setEditableClassInfo] = useState({}); // { aulaId: { modalidade: '...', status_ocorrencia: '...' }, ... }
    const [editingAulaId, setEditingAulaId] = useState(null); // Tracks which aula is currently being edited

    // NEW: State to store all professors to get their modalities for validation/dropdown
    const [allProfessors, setAllProfessors] = useState([]);

    // Options for dropdowns (ensure these match your backend choices precisely, lowercase)
    const allTiposAulaOpcoes = [
        { label: 'Natação', value: 'natacao' },
        { label: 'Artística', value: 'artistica' },
        { label: 'Funcional', value: 'funcional' },
        { label: 'Psicomotricidade', value: 'psicomotricidade' },
    ];
    const statusOcorrenciaOpcoes = [
        { label: 'Agendada', value: 'agendada' },
        { label: 'Realizada', value: 'realizada' },
        { label: 'Cancelada', value: 'cancelada' },
    ];

    const goToProfile = (id) => {
        navigate(`/usuarios/perfil/${id}`);
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch Agenda data
            const agendaResponse = await listarAgenda(dateStr);
            setAgendaData(agendaResponse.data);

            // Fetch Professors data (needed for modalidade dropdown filtering)
            const professorsResponse = await listarProfessor();
            setAllProfessors(professorsResponse.data);

            const initialPresencaStates = {};
            const initialEditableClassInfo = {};

            if (agendaResponse.data && Array.isArray(agendaResponse.data.aulas)) {
                agendaResponse.data.aulas.forEach(aula => {
                    initialPresencaStates[aula.id_aula] = {};
                    initialEditableClassInfo[aula.id_aula] = {
                        modalidade: aula.modalidade,
                        status_ocorrencia: aula.status_ocorrencia
                    };

                    if (Array.isArray(aula.alunos_na_aula)) {
                        aula.alunos_na_aula.forEach(aluno => {
                            const uniqueParticipacaoId = aluno.participacao_id;
                            initialPresencaStates[aula.id_aula][uniqueParticipacaoId] = {
                                presenca: aluno.presenca,
                                feedback: aluno.feedback || ''
                            };
                        });
                    }
                });
            }
            setPresencaStates(initialPresencaStates);
            setEditableClassInfo(initialEditableClassInfo);

        } catch (err) {
            console.error('Erro ao carregar dados:', err);
            // Check if error is due to no data found for the date
            if (err.response && err.response.status === 404) { // Assuming 404 for "no data found"
                setError(`Nenhuma aula encontrada para o dia ${decodeURIComponent(dateStr)}.`);
            } else {
                setError('Não foi possível carregar os dados da agenda.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dateStr]);


    // Handle changes for student attendance/feedback
    const handlePresencaChange = (aulaId, participacaoId, field, value) => {
        setPresencaStates(prevStates => ({
            ...prevStates,
            [aulaId]: {
                ...prevStates[aulaId],
                [participacaoId]: {
                    ...prevStates[aulaId][participacaoId],
                    [field]: value
                }
            }
        }));
    };

    // NEW: Handle changes for class (OcorrenciaAula) fields
    const handleClassInfoChange = (aulaId, field, value) => {
        setEditableClassInfo(prevInfo => ({
            ...prevInfo,
            [aulaId]: {
                ...prevInfo[aulaId],
                [field]: value
            }
        }));
    };

    // Helper to get modalities for a specific professor
    const getProfessorModalidades = (professorId) => {
        const professor = allProfessors.find(p => p.id === professorId);
        return professor ? professor.modalidade : []; // 'modalidade' is the API field name from 'listarProfessor'
    };

    // NEW: Toggle edit mode for a specific class
    const toggleEditMode = (aulaId) => {
        setEditingAulaId(prevId => (prevId === aulaId ? null : aulaId));
        // Reset editable info to current data if canceling edit
        if (editingAulaId === aulaId) {
             const currentAula = agendaData.aulas.find(a => a.id_aula === aulaId);
             if (currentAula) {
                 setEditableClassInfo(prevInfo => ({
                     ...prevInfo,
                     [aulaId]: {
                         modalidade: currentAula.modalidade,
                         status_ocorrencia: currentAula.status_ocorrencia
                     }
                 }));
             }
        }
    };

    const handleSalvarTudo = async (aulaId) => {
        setSubmitError(null); // Clear previous submit errors

        const currentAulaData = agendaData.aulas.find(a => a.id_aula === aulaId);
        if (!currentAulaData) {
            alert("Dados da aula não encontrados para salvar.");
            return;
        }

        // 1. Prepare ParticipacaoAula updates
        const participacaoUpdates = [];
        const alunosNaAula = currentAulaData.alunos_na_aula || [];

        alunosNaAula.forEach(alunoOriginal => {
            const uniqueParticipacaoId = alunoOriginal.participacao_id;
            const alunoState = presencaStates[aulaId]?.[uniqueParticipacaoId];

            if (alunoState) {
                // Only include if there's a change
                if (alunoState.presenca !== alunoOriginal.presenca ||
                    alunoState.feedback !== (alunoOriginal.feedback || '')) {
                    participacaoUpdates.push({
                        participacao_id: uniqueParticipacaoId,
                        presenca: alunoState.presenca,
                        feedback: alunoState.feedback,
                    });
                }
            }
        });

        // 2. Prepare OcorrenciaAula updates (modalidade, status_ocorrencia)
        const currentEditableInfo = editableClassInfo[aulaId];
        const ocorrenciaAulaUpdate = {};

        // Check for modalidade change
        if (currentEditableInfo.modalidade !== currentAulaData.modalidade) {
            ocorrenciaAulaUpdate.modalidade = currentEditableInfo.modalidade;
        }

        // Check for status_ocorrencia change
        if (currentEditableInfo.status_ocorrencia !== currentAulaData.status_ocorrencia) {
            ocorrenciaAulaUpdate.status_ocorrencia = currentEditableInfo.status_ocorrencia;
        }

        // Check if there are any updates to send at all
        if (participacaoUpdates.length === 0 && Object.keys(ocorrenciaAulaUpdate).length === 0) {
            alert("Nenhuma alteração para salvar nesta aula.");
            return;
        }

        const payload = {
            ocorrencia_aula_update: ocorrenciaAulaUpdate,
            participacao_updates: participacaoUpdates,
        };

        console.log('Enviando payload para gerenciarPresenca:', payload);

        try {
            const response = await gerenciarPresenca(aulaId, payload);
            console.log('Atualização bem-sucedida:', response.data);
            alert('Alterações salvas com sucesso!');
            // After successful save, exit edit mode and re-fetch data to reflect changes
            setEditingAulaId(null);
            await fetchData(); 

        } catch (err) {
            console.error('Erro ao salvar alterações:', err.response ? err.response.data : err.message);
            const errorMessage = err.response && err.response.data && err.response.data.results 
                ? JSON.stringify(err.response.data.results, null, 2) // Show detailed results if available
                : (err.response ? JSON.stringify(err.response.data) : err.message);
            setSubmitError(`Erro ao salvar: ${errorMessage}`);
            alert(`Erro ao salvar: ${errorMessage}`);
        }
    };

    // --- Render Logic ---
    if (loading) {
        return (
            <div className="container p-4 text-center">
                <h3>Carregando agenda...</h3>
            </div>
        );
    }

    // Consolidated error display for initial fetch or no data
    if (error) {
        return (
            <div className="container p-4 text-center" style={{ color: 'red' }}>
                <h3>{error}</h3>
                <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Voltar</button>
            </div>
        );
    }

    if (!agendaData || !Array.isArray(agendaData.aulas) || agendaData.aulas.length === 0) {
        return (
            <div className="container p-4 text-center">
                <h3>Nenhuma aula encontrada para o dia {decodeURIComponent(dateStr)}</h3>
                <p>Verifique se há dados disponíveis para esta data.</p>
                <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="container p-4">
            <div className='d-flex justify-content-between align-items-center p-4'>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Voltar
                </button>
                <h2 className="mb-0">
                    {(new Date(dateStr).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }))
                        .replace(/^(.)/, (match) => match.toUpperCase())
                    }
                </h2>
            </div>

            {submitError && (
                <div className="alert alert-danger mt-3" role="alert">
                    {submitError}
                </div>
            )}

            {agendaData.aulas.map((aula) => {
                const isEditing = editingAulaId === aula.id_aula;
                const professorModalidades = getProfessorModalidades(aula.id_professor);
                const filteredModalidadeOptions = allTiposAulaOpcoes.filter(option => 
                    professorModalidades.includes(option.value)
                );

                return (
                    <div
                        key={aula.id_aula}
                        className="card mb-4 p-3"
                        style={{ backgroundColor: '#e6ffe6', border: '1px solid #66bb6a', borderRadius: '10px' }}
                    >
                        <div className="mb-3 d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold">Aula das {aula.hora_inicio} - {aula.hora_fim}</h5>
                            {/* Edit/Cancel Button for class info */}
                            <button
                                className={`btn btn-sm ${isEditing ? 'btn-warning' : 'btn-info'}`}
                                onClick={() => toggleEditMode(aula.id_aula)}
                            >
                                {isEditing ? 'Cancelar Edição' : 'Editar Info da Aula'}
                            </button>
                        </div>

                        <div className="row g-3">
                            <div className="col-4 d-flex flex-column" style={{ gap: '10px' }}>
                                <div 
                                    key={aula.id_professor} onClick={() => goToProfile(aula.id_professor)} 
                                    className="p-2"
                                    style={{ backgroundColor: '#ffdede', border: '1px solid #ef9a9a', borderRadius: '8px', flexGrow: 0, cursor: 'pointer' }}
                                >
                                    <span className="fw-bold">Prof.</span>: {aula.professor || 'N/A'}
                                </div>
                                <div
                                    className="p-2 flex-grow-1"
                                    style={{ backgroundColor: '#e0f7fa', border: '1px solid #80deea', borderRadius: '8px' }}
                                >
                                    <span className="fw-bold">Informações da aula</span>:
                                    <br />
                                    {isEditing ? (
                                        <>
                                            <label htmlFor={`modalidade-${aula.id_aula}`} className="form-label mb-0 mt-1">Modalidade:</label>
                                            <select
                                                id={`modalidade-${aula.id_aula}`}
                                                className="form-select form-select-sm mb-2"
                                                value={editableClassInfo[aula.id_aula]?.modalidade || ''}
                                                onChange={(e) => handleClassInfoChange(aula.id_aula, 'modalidade', e.target.value)}
                                            >
                                                <option value="">Selecione</option>
                                                {filteredModalidadeOptions.map(option => (
                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                ))}
                                            </select>

                                            <label htmlFor={`status-${aula.id_aula}`} className="form-label mb-0">Status:</label>
                                            <select
                                                id={`status-${aula.id_aula}`}
                                                className="form-select form-select-sm"
                                                value={editableClassInfo[aula.id_aula]?.status_ocorrencia || ''}
                                                onChange={(e) => handleClassInfoChange(aula.id_aula, 'status_ocorrencia', e.target.value)}
                                            >
                                                <option value="">Selecione</option>
                                                {statusOcorrenciaOpcoes.map(option => (
                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                ))}
                                            </select>
                                        </>
                                    ) : (
                                        <>
                                            Modalidade: {aula.modalidade || 'N/A'}
                                            <br />
                                            Status: {aula.status_ocorrencia || 'N/A'}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="col-8">
                                <div
                                    className="p-2 h-100"
                                    style={{ backgroundColor: '#ffdede', border: '1px solid #ef9a9a', borderRadius: '8px' }}
                                >
                                    <span className="fw-bold">Alunos:</span>
                                    <ul className="list-unstyled mb-0 mt-2">
                                        {aula.alunos_na_aula && aula.alunos_na_aula.length > 0 ? (
                                            aula.alunos_na_aula.map(aluno => {
                                                const uniqueParticipacaoId = aluno.participacao_id;
                                                const radioGroupName = `presenca-${aula.id_aula}-${uniqueParticipacaoId}`;
                                                const presenteId = `presente-${aula.id_aula}-${uniqueParticipacaoId}`;
                                                const ausenteId = `ausente-${aula.id_aula}-${uniqueParticipacaoId}`;
                                                const pendenteId = `pendente-${aula.id_aula}-${uniqueParticipacaoId}`;
                                                const feedbackInputId = `feedback-${aula.id_aula}-${uniqueParticipacaoId}`;

                                                return (
                                                    <li key={aluno.id_aluno} className="mb-2 p-1 border-bottom d-flex flex-column">
                                                        <span onClick={() => goToProfile(aluno.id_aluno)} className="fw-bold" style={{cursor: 'pointer'}}>{aluno.nome}</span>

                                                        <div className="d-flex flex-wrap gap-2 mb-1">
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name={radioGroupName}
                                                                    id={presenteId}
                                                                    value="presente"
                                                                    checked={presencaStates[aula.id_aula]?.[uniqueParticipacaoId]?.presenca === 'presente'}
                                                                    onChange={(e) => handlePresencaChange(aula.id_aula, uniqueParticipacaoId, 'presenca', e.target.value)}
                                                                />
                                                                <label className="form-check-label" htmlFor={presenteId}>Presente</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name={radioGroupName}
                                                                    id={ausenteId}
                                                                    value="ausente"
                                                                    checked={presencaStates[aula.id_aula]?.[uniqueParticipacaoId]?.presenca === 'ausente'}
                                                                    onChange={(e) => handlePresencaChange(aula.id_aula, uniqueParticipacaoId, 'presenca', e.target.value)}
                                                                />
                                                                <label className="form-check-label" htmlFor={ausenteId}>Ausente</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name={radioGroupName}
                                                                    id={pendenteId}
                                                                    value="pendente"
                                                                    checked={presencaStates[aula.id_aula]?.[uniqueParticipacaoId]?.presenca === 'pendente'}
                                                                    onChange={(e) => handlePresencaChange(aula.id_aula, uniqueParticipacaoId, 'presenca', e.target.value)}
                                                                />
                                                                <label className="form-check-label" htmlFor={pendenteId}>Pendente</label>
                                                            </div>
                                                        </div>

                                                        <div className="mt-1">
                                                            <label htmlFor={feedbackInputId} className="form-label visually-hidden">Feedback para {aluno.nome}</label>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                id={feedbackInputId}
                                                                placeholder="Feedback (opcional)"
                                                                value={presencaStates[aula.id_aula]?.[uniqueParticipacaoId]?.feedback || ''}
                                                                onChange={(e) => handlePresencaChange(aula.id_aula, uniqueParticipacaoId, 'feedback', e.target.value)}
                                                            />
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        ) : (
                                            <li>Nenhum aluno programado.</li>
                                        )}
                                    </ul>
                                    {/* Unified Save Button */}
                                    {(aula.alunos_na_aula && aula.alunos_na_aula.length > 0) || isEditing ? (
                                        <button
                                            className="btn btn-sm btn-primary mt-3"
                                            onClick={() => handleSalvarTudo(aula.id_aula)}
                                        >
                                            Salvar Alterações da Aula
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AgendaDia;