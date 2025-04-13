import React, { useState } from 'react';
import { login } from '../../../service/api';


const Login = () => {
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    if (email && password) {
      try {
        const response = await login(email, password);

        console.log(response);
  
        if (response.data.success) {
          alert('Login efetuado com sucesso!');
        } else {
          setError(response.data.message || 'Erro no login. Tente novamente!');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        setError('Erro no login. Tente novamente!');
      }
    } else {
      alert('Por favor, preencha todos os campos!');
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
            <a
              href="#"
              className="d-block text-end mt-3"
              style={{ color: '#0078ff', textDecoration: 'none' }}
            >
              Esqueci a senha
            </a>
            {error && (
              <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
            )}
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
