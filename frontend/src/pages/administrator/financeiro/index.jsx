import { useState } from 'react';

const Financeiro = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nomeAluno: '',
    dataPagamento: '',
    valorRecebido: ''
  });
  const [payments, setPayments] = useState({
    pago: [
      {nome: 'Maria Silva', data: '10/05/2025', valor: 'R$ 350,00'},
      {nome: 'João Santos', data: '08/05/2025', valor: 'R$ 280,00'}
    ],
    pendente: [
      {nome: 'Pedro Oliveira', data: '15/05/2025', valor: 'R$ 300,00'},
      {nome: 'Ana Costa', data: '20/05/2025', valor: 'R$ 350,00'}
    ],
    atrasado: [
      {nome: 'Carlos Ferreira', data: '01/05/2025', valor: 'R$ 350,00'},
      {nome: 'Lúcia Martins', data: '05/05/2025', valor: 'R$ 280,00'}
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nomeAluno || !formData.dataPagamento || !formData.valorRecebido) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const newPayment = {
      nome: formData.nomeAluno,
      data: formData.dataPagamento,
      valor: formData.valorRecebido.startsWith('R$') ? formData.valorRecebido : `R$ ${formData.valorRecebido}`
    };

    setPayments({
      ...payments,
      pago: [...payments.pago, newPayment]
    });

    setFormData({
      nomeAluno: '',
      dataPagamento: '',
      valorRecebido: ''
    });

    alert('Pagamento lançado com sucesso!');
  };

  const filterPayments = (paymentList) => {
    if (!searchTerm) return paymentList;
    return paymentList.filter(payment => 
      payment.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderPaymentDetails = () => {
    if (!activeTab) return null;

    const paymentList = filterPayments(payments[activeTab]);
    let statusClass = '';
    let statusTitle = '';

    switch(activeTab) {
      case 'pago':
        statusClass = 'bg-success bg-opacity-25';
        statusTitle = 'Pagamentos Realizados';
        break;
      case 'pendente':
        statusClass = 'bg-warning bg-opacity-25';
        statusTitle = 'Pagamentos Pendentes';
        break;
      case 'atrasado':
        statusClass = 'bg-danger bg-opacity-25';
        statusTitle = 'Pagamentos Atrasados';
        break;
      default:
        break;
    }

    return (
      <div className={`detail-panel ${statusClass}`} style={{
        marginTop: '20px',
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#F0FFF9'
      }}>
        <h3 className="mb-4 text-center">{statusTitle}</h3>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome do Aluno</th>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {paymentList.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.nome}</td>
                  <td>{payment.data}</td>
                  <td>{payment.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-3">
          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveTab(null)}
          >
            Voltar
          </button>
        </div>
      </div>
    );
  };

  const statusCardStyle = {
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '10px',
    height: '100%',
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s'
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

        <h1 className="text-center fw-bold mb-4" style={{ fontSize: '32px' }}>Pagamentos</h1>

        {!activeTab ? (
          <>
            {/* Cards de status */}
            <div className="pagamentos-section mb-4" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div 
                    style={{
                      ...statusCardStyle,
                      backgroundColor: '#A5F5C9'
                    }}
                    onClick={() => setActiveTab('pago')}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Pago</div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div 
                    style={{
                      ...statusCardStyle,
                      backgroundColor: '#FFC0A0'
                    }}
                    onClick={() => setActiveTab('pendente')}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Pendente</div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div 
                    style={{
                      ...statusCardStyle,
                      backgroundColor: '#FF4D4D'
                    }}
                    onClick={() => setActiveTab('atrasado')}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Atrasado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário de pagamento */}
            <div className="payment-form" style={{
              backgroundColor: '#E0FFF5',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nomeAluno" className="form-label">Nome do Aluno</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="nomeAluno" 
                    name="nomeAluno"
                    value={formData.nomeAluno}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #A5D3C8',
                      borderRadius: '8px'
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dataPagamento" className="form-label">Data do Pagamento</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="dataPagamento" 
                    name="dataPagamento"
                    placeholder="DD/MM/AAAA"
                    value={formData.dataPagamento}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #A5D3C8',
                      borderRadius: '8px'
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="valorRecebido" className="form-label">Valor Recebido</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="valorRecebido" 
                    name="valorRecebido"
                    placeholder="R$ 0,00"
                    value={formData.valorRecebido}
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
                    Lançar Pagamento
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          renderPaymentDetails()
        )}
      </div>
    </div>
  );
};

export default Financeiro;