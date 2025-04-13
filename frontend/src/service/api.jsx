//importa a biblioteca axios para fazer requisições HTTP
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});


export const login = (email, password) => {
  return api.post('/usuarios/login/', { email, password });
};

export const criarUsuario = (name, email, password) => {
  return api.post('/usuarios/criar/', { name, email, password });
};
