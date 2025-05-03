//importa a biblioteca axios para fazer requisições HTTP
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
});



export const criarUsuario = (name, email, password) => {
  return api.post('/usuarios/criar/', { name, email, password });
};

export const login = (email, password) => {
  return api.post('/usuarios/login/', { email, password });
};

export const usuarioAtual = () => {
  return api.get('/usuarios/me/');
};

export const listarUsuarios = () => {
  return api.get('/usuarios/listar/');
}

export const  perfilUsuario = (id) => {
  return api.get(`/usuarios/perfil/${id}/`);
}

export const editarUsuario = (id, name, email, status, type, password) => {
  return api.patch(`/usuarios/editar/${id}/`, { name, email, status, type, password });
}



