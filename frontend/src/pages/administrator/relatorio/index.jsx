import { useState, useEffect } from 'react';

const Relatorios = () => {
    const [valoresRecebidos, setValoresRecebidos] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        tipo: 'receita',
        descricao: '',
        valor: ''
    });

    // Carregar dados salvos ao iniciar - usando state em memória ao invés de localStorage
    useEffect(() => {
        // Simular dados iniciais
        setValoresRecebidos(2500.00);
        setTotalDespesas(1200.00);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.descricao || !formData.valor) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        // Converter valor para número
        const valorNumerico = parseFloat(formData.valor.replace(/[^\d,.-]/g, '').replace(',', '.'));
        
        if (isNaN(valorNumerico)) {
            alert('Por favor, insira um valor válido');
            return;
        }

        // Atualizar o valor adequado
        if (formData.tipo === 'receita') {
            setValoresRecebidos(prevValue => prevValue + valorNumerico);
        } else {
            setTotalDespesas(prevValue => prevValue + valorNumerico);
        }

        // Limpar o formulário
        setFormData({
            tipo: 'receita',
            descricao: '',
            valor: ''
        });

        alert(`${formData.tipo === 'receita' ? 'Receita' : 'Despesa'} registrada com sucesso!`);
    };

    const generateReport = (tipo) => {
        const saldoAtual = valoresRecebidos - totalDespesas;
        const data = new Date().toLocaleDateString('pt-BR');
        
        let reportContent = '';
        
        switch(tipo) {
            case 'receitas':
                reportContent = `
RELATÓRIO DE RECEITAS
Data: ${data}
Total de Receitas: ${formatCurrency(valoresRecebidos)}
                `;
                break;
            case 'despesas':
                reportContent = `
RELATÓRIO DE DESPESAS
Data: ${data}
Total de Despesas: ${formatCurrency(totalDespesas)}
                `;
                break;
            case 'completo':
                reportContent = `
RELATÓRIO FINANCEIRO COMPLETO
Data: ${data}
Total de Receitas: ${formatCurrency(valoresRecebidos)}
Total de Despesas: ${formatCurrency(totalDespesas)}
Saldo Atual: ${formatCurrency(saldoAtual)}
                `;
                break;
            default:
                break;
        }
        
        // Criar arquivo para download
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio-${tipo}-${data.replace(/\//g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div style={{ backgroundColor: '#CDF8EA', minHeight: '100vh', padding: '20px 0' }}>
            <div className="container" style={{ maxWidth: '960px' }}>
                {/* Barra de pesquisa */}
                <div className="search-bar mb-4" style={{ maxWidth: '400px' }}>
                    <div className="input-group" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                        <span className="input-group-text" style={{
                            backgroundColor: 'white',
                            borderRight: 'none',
                            height: '38px',
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: '8px'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </span>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Pesquisar" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                borderLeft: 'none',
                                height: '38px',
                                boxShadow: 'none'
                            }}
                        />
                    </div>
                </div>

                <h1 className="text-center fw-bold mb-4" style={{ fontSize: '32px' }}>Dados Financeiros</h1>

                {/* Cards de dados financeiros */}
                <div className="finance-section mb-4" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: '12px',
                    padding: '30px'
                }}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div style={{
                                backgroundColor: '#A5F5C9',
                                borderRadius: '12px',
                                padding: '20px',
                                textAlign: 'center',
                                height: '100%',
                                minHeight: '160px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>
                                    Valores recebidos
                                </div>
                                <div style={{ fontSize: '26px', fontWeight: 'bold' }}>
                                    {formatCurrency(valoresRecebidos)}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div style={{
                                backgroundColor: '#A5F5C9',
                                borderRadius: '12px',
                                padding: '20px',
                                textAlign: 'center',
                                height: '100%',
                                minHeight: '160px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>
                                    Total de despesas
                                </div>
                                <div style={{ fontSize: '26px', fontWeight: 'bold' }}>
                                    {formatCurrency(totalDespesas)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seção de Relatórios */}
                <div className="finance-section mb-4" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: '12px',
                    padding: '30px'
                }}>
                    <h3 className="text-center mb-4">Relatórios Disponíveis</h3>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <button 
                                className="btn w-100 py-3"
                                style={{
                                    backgroundColor: '#A5F5C9',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold'
                                }}
                                onClick={() => generateReport('receitas')}
                            >
                                Relatório de Receitas
                            </button>
                        </div>
                        <div className="col-md-4 mb-3">
                            <button 
                                className="btn w-100 py-3"
                                style={{
                                    backgroundColor: '#A5F5C9',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold'
                                }}
                                onClick={() => generateReport('despesas')}
                            >
                                Relatório de Despesas
                            </button>
                        </div>
                        <div className="col-md-4 mb-3">
                            <button 
                                className="btn w-100 py-3"
                                style={{
                                    backgroundColor: '#A5F5C9',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold'
                                }}
                                onClick={() => generateReport('completo')}
                            >
                                Relatório Completo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Formulário para registrar movimento */}
                <div className="add-transaction" style={{
                    backgroundColor: '#E0FFF5',
                    borderRadius: '12px',
                    padding: '20px'
                }}>
                    <h4 className="mb-3">Registrar movimento</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="tipo" className="form-label">Tipo</label>
                            <select 
                                className="form-control" 
                                id="tipo" 
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleInputChange}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #A5D3C8',
                                    borderRadius: '8px'
                                }}
                            >
                                <option value="receita">Receita</option>
                                <option value="despesa">Despesa</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descricao" className="form-label">Descrição</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="descricao" 
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleInputChange}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #A5D3C8',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="valor" className="form-label">Valor</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="valor" 
                                name="valor"
                                placeholder="R$ 0,00"
                                value={formData.valor}
                                onChange={handleInputChange}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #A5D3C8',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                        <div className="text-end">
                            <button 
                                type="submit" 
                                className="btn"
                                style={{
                                    backgroundColor: '#A5F5C9',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Relatorios;