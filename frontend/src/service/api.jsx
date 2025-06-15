//importa a biblioteca axios para fazer requisições HTTP
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
});


export const criarUsuario = (data) => {
  return api.post('/criar/', data);
};

export const loginUsuario = (email, password) => {
  return api.post('/login/', { email, password });
};

export const sessaoUsuario = () => {
  return api.get('/sessao/');
};

export const listarUsuarios = () => {
  return api.get('/listar/');
}

export const  perfilUsuario = (id) => {
  return api.get(`/perfil/${id}/`);
}

export const editarUsuario = (id, name, email, status, type, password) => {
  return api.patch(`/editar/${id}/`, { name, email, status, type, password });
}

export const criarResponsavel = (data) => {
  return api.post('/criar/responsavel/', data);
}

export const criarProfessor = (data) => {
  return api.post('/criar/professor/', data);
}

export const criarAluno = (data) => {
  return api.post('/criar/aluno/', data);
}

export const listarCalendario = (dateString) => {
  return api.get('/listar/calendario/', { params: { date: dateString } });
};

export const listarAgenda = (dateString) => {
  return api.get(`/listar/agenda/${dateString}/`);
}

export const gerenciarPresenca = (id_aula, updates) => {
  return api.patch(`/gerenciar/presenca/${id_aula}/`, { updates });
}
