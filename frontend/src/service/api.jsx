//importa a biblioteca axios para fazer requisições HTTP
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
});


export const criarUsuario = (data) => {
  return api.post('/usuarios/criar/', data);
};

export const loginUsuario = (email, password) => {
  return api.post('/usuarios/login/', { email, password });
};

export const sessaoUsuario = () => {
  return api.get('/usuarios/sessao/');
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

export const criarResponsavel = (data) => {
  return api.post('/usuarios/criar/responsavel/', data);
}

export const criarProfessor = (data) => {
  return api.post('/usuarios/criar/professor/', data);
}

export const criarAluno = (data) => {
  return api.post('/usuarios/criar/aluno/', data);
}