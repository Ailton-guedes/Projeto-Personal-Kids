import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [telefone, setTelefone] = useState(''); 
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {
     
      await axios.post('/api/enviar-codigo-sms', { telefone });
      setMensagem('Um código de verificação foi enviado para seu telefone.');
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setErro(error.response.data.message);
      } else {
        setErro('Erro ao enviar o código. Tente novamente.');
      }
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center"
      style={{
        backgroundColor: '#b8e6de',
        minHeight: '100vh',
        paddingLeft: '5%',
      }}
    >
      <div className="row w-100 justify-content-center align-items-center">
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
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#222' }}>
            Recuperar Acesso
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              
              <label htmlFor="telefone" className="form-label fw-bold text-dark">
                Número de telefone
              </label>
              <input
                type="tel"
                className="form-control"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                placeholder="(XX) XXXXX-XXXX"
                style={{
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '16px',
                }}
              />
            </div>
            
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
              Enviar código via SMS
            </button>
            {mensagem && (
              <div style={{ color: 'green', marginTop: '10px' }}>{mensagem}</div>
            )}
            {erro && (
              <div style={{ color: 'red', marginTop: '10px' }}>{erro}</div>
            )}
            <a
              href="/login"
              className="d-block text-end mt-3"
              style={{ color: '#0078ff', textDecoration: 'none' }}
            >
              Voltar para o login
            </a>
          </form>
        </div>

        <div className="col-md-6 d-none d-md-block position-relative">
          <img
            src="logo.png"
            alt="Tia Aline Personal Kids"
            className="img-fluid"
            style={{
              maxWidth: '80%',
              height: 'auto',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '0',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecuperarSenha;
