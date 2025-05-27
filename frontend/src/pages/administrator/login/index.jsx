import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../../service/UserContext';
import { loginUsuario, sessaoUsuario } from '../../../service/api';


const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setErrorMsg('');
    console.log('Enviando loginUsuario...');
    await loginUsuario(email, password);
    console.log('loginUsuario ok.');

    console.log('Buscando sessaoUsuario...');
    const response = await sessaoUsuario();
    console.log('sessaoUsuario ok:', response.data);

    login(response.data);
    navigate('/dashboard');
  } catch (error) {
  console.error('Erro:', error);

  if (error.response) {
    console.error('Resposta de erro da API completa:', error.response);
    if (error.response.data) {
      console.error('Dados da resposta:', error.response.data);
      setErrorMsg(JSON.stringify(error.response.data));
    } else {
      setErrorMsg('Erro desconhecido da API sem dados.');
    }
  } else if (error.request) {
    console.error('Requisição feita mas sem resposta:', error.request);
    setErrorMsg('Servidor não respondeu. Tente novamente mais tarde.');
  } else {
    console.error('Erro ao configurar a requisição:', error.message);
    setErrorMsg('Erro ao enviar a requisição.');
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
          <h1 style={{ fontSize: '38px', fontWeight: 'bold', color: '#222' }}>
            Login{' '}
            <span
              style={{
                color: '#ff5252',
                fontSize: '12px',
                marginLeft: '10px',
                position: 'relative',
                top: '-10px',
              }}
            >
              Adm
            </span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold text-dark">
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '16px',
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold text-dark">
                Senha
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              Acessar
            </button>
            {errorMsg && (
              <div style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</div>
            )}
            <a
              href="#"
              className="d-block text-end mt-3"
              style={{ color: '#0078ff', textDecoration: 'none' }}
            >
              Esqueci a senha
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

export default Login;
