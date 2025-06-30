import React, { useState, useEffect } from 'react';
import { criarPlano, listarPlano, editarPlano } from '../../../service/api';

function Planos() {
    const [formData, setFormData] = useState({
        name: '',
        tipo: '',
        valor: '',
        duracao_meses: '',
        dia_vencimento: '',
        descricao: '',
    });

    const [planos, setPlanos] = useState([]);
    const [editId, setEditId] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

    const tipoOpcoes = [
        { label: 'Mensal', value: 'mensal' },
        { label: 'Trimestral', value: 'trimestral' },
        { label: 'Semestral', value: 'semestral' },
        { label: 'Anual', value: 'anual' },
    ];

    /**
     * Fetches the list of plans from the backend.
     * Handles loading and error states.
     */
    const fetchPlanos = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await listarPlano();
            setPlanos(response.data);
        } catch (err) {
            console.error("Erro ao carregar planos:", err);
            // Provide a more specific error message if available from the API response
            const errorMessage = err.response?.data?.error || "Não foi possível carregar os planos.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Effect hook to fetch plans on component mount
    useEffect(() => {
        fetchPlanos();
    }, []); // Empty dependency array ensures it runs only once on mount

    /**
     * Handles changes in form input fields.
     */
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value,
        }));
        // Clear submit status when user starts typing again after a submission
        if (submitStatus) {
            setSubmitStatus(null);
            setError(null);
        }
    };

    /**
     * Handles form submission for creating or editing a plan.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null); // Clear previous submission status
        setError(null); // Clear previous errors

        // Basic client-side validation
        if (!formData.name || !formData.tipo || !formData.valor ||
            !formData.duracao_meses || !formData.dia_vencimento) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            setSubmitStatus('error');
            return;
        }

        const parsedValor = parseFloat(formData.valor);
        const parsedDuracaoMeses = parseInt(formData.duracao_meses, 10);
        const parsedDiaVencimento = parseInt(formData.dia_vencimento, 10);

        if (isNaN(parsedValor) || parsedValor < 0) {
            setError('O valor deve ser um número positivo.');
            setSubmitStatus('error');
            return;
        }

        if (isNaN(parsedDuracaoMeses) || parsedDuracaoMeses <= 0) {
            setError('Duração em meses deve ser um número inteiro positivo.');
            setSubmitStatus('error');
            return;
        }

        if (isNaN(parsedDiaVencimento) || parsedDiaVencimento < 1 || parsedDiaVencimento > 31) {
            setError('Dia de vencimento deve ser entre 1 e 31.');
            setSubmitStatus('error');
            return;
        }

        const payload = {
            name: formData.name,
            tipo: formData.tipo,
            valor: parsedValor,
            duracao_meses: parsedDuracaoMeses,
            dia_vencimento: parsedDiaVencimento,
            // Only include description if it has a value
            descricao: formData.descricao || undefined,
        };

        try {
            if (editId) {
                await editarPlano(editId, payload);
            } else {
                await criarPlano(payload);
            }

            // Reset form and edit state, then re-fetch updated list
            setFormData({
                name: '', tipo: '', valor: '', duracao_meses: '', dia_vencimento: '', descricao: ''
            });
            setEditId(null);
            await fetchPlanos(); // Re-fetch the updated list from the backend
            setSubmitStatus('success');

        } catch (err) {
            console.error('Erro ao salvar plano:', err.response ? err.response.data : err.message);
            setSubmitStatus('error');
            // Extract the error message from the backend response if available
            const errorMessage = err.response?.data?.error || 'Ocorreu um erro desconhecido ao salvar o plano.';
            setError(`Erro: ${errorMessage}`);
        }
    };

    /**
     * Sets the form for editing an existing plan.
     */
    const handleEditar = (plano) => {
        const planoId = plano.id || plano._id; // Ensure consistent ID access
        setEditId(planoId);
        // Populate the form with the plan's data for editing
        setFormData({
            name: plano.name,
            tipo: plano.tipo,
            valor: String(plano.valor), // Convert to string for input type="number"
            duracao_meses: String(plano.duracao_meses),
            dia_vencimento: String(plano.dia_vencimento),
            descricao: plano.descricao || '', // Ensure description is a string
        });
        setExpandedId(planoId); // Expand the item being edited
        setSubmitStatus(null); // Clear any prior submission messages
        setError(null); // Clear any prior errors
    };

    /**
     * Toggles the expanded view of a plan in the list.
     */
    const toggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    // --- Render Logic ---

    // Show loading state
    if (loading) {
        return (
            <div className="container p-4 text-center">
                <h3>Carregando planos...</h3>
            </div>
        );
    }

    // Show initial error state (if loading failed and no submit action happened yet)
    // Removed `!submitStatus` from here, as `submitStatus` is specific to the form actions
    if (error && planos.length === 0) { // If there's an error AND no plans loaded
        return (
            <div className="container p-4 text-danger text-center">
                <h3>Erro: {error}</h3>
                <p>Por favor, tente recarregar a página.</p>
            </div>
        );
    }

    return (
        <div className="container p-4" style={{ maxWidth: '600px', backgroundColor: '#ffd1dc', borderRadius: '8px' }}>
            <h2 className="text-center mb-4">{editId ? 'Editar Plano' : 'Criar Plano'}</h2>

            {/* Submission Status Messages */}
            {submitStatus === 'success' && (
                <div className="alert alert-success" role="alert">Plano salvo com sucesso!</div>
            )}
            {submitStatus === 'error' && error && ( // Only show error message if error state is also set
                <div className="alert alert-danger" role="alert">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome do Plano</label>
                    <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo de Pagamento</label>
                    <select id="tipo" className="form-select" value={formData.tipo} onChange={handleChange} required>
                        <option value="">Selecione o tipo</option>
                        {tipoOpcoes.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="valor" className="form-label">Valor (R$)</label>
                    <input type="number" className="form-control" id="valor" value={formData.valor} onChange={handleChange} min="0" step="0.01" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="duracao_meses" className="form-label">Duração (meses)</label>
                    <input type="number" className="form-control" id="duracao_meses" value={formData.duracao_meses} onChange={handleChange} min="1" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="dia_vencimento" className="form-label">Dia de Vencimento</label>
                    <input type="number" className="form-control" id="dia_vencimento" value={formData.dia_vencimento} onChange={handleChange} min="1" max="31" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="descricao" className="form-label">Descrição (Opcional)</label>
                    <textarea className="form-control" id="descricao" value={formData.descricao} onChange={handleChange} rows="3" />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">{editId ? 'Salvar Alterações' : 'Criar Plano'}</button>
                    {editId && (
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => {
                            setEditId(null);
                            setFormData({
                                name: '', tipo: '', valor: '', duracao_meses: '', dia_vencimento: '', descricao: ''
                            });
                            setSubmitStatus(null); // Clear status on cancel
                            setError(null); // Clear error on cancel
                        }}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <h3 className="mt-5">Lista de Planos</h3>
            {planos.length === 0 ? (
                <p className="text-center text-muted">Nenhum plano cadastrado ainda.</p>
            ) : (
                <ul className="list-group">
                    {planos.map(plano => {
                        const planoId = plano.id || plano._id;
                        return (
                            <li key={planoId} className="list-group-item" style={{ cursor: 'pointer' }}>
                                <div className="d-flex justify-content-between align-items-center" onClick={() => toggleExpand(planoId)}>
                                    <strong>{plano.name}</strong>
                                    <div>
                                        <span className="badge bg-success me-3">R$ {Number(plano.valor).toFixed(2).replace('.', ',')}</span>
                                        <button className="btn btn-sm btn-outline-primary" onClick={(e) => {
                                            e.stopPropagation(); // Prevent toggling expand when editing
                                            handleEditar(plano);
                                        }}>Editar</button>
                                    </div>
                                </div>
                                {expandedId === planoId && (
                                    <div className="mt-3">
                                        <p><strong>Tipo:</strong> {tipoOpcoes.find(t => t.value === plano.tipo)?.label || plano.tipo}</p>
                                        <p><strong>Duração:</strong> {plano.duracao_meses} meses</p>
                                        <p><strong>Dia de Vencimento:</strong> Dia {plano.dia_vencimento}</p>
                                        {plano.descricao && <p><strong>Descrição:</strong> {plano.descricao}</p>}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default Planos;