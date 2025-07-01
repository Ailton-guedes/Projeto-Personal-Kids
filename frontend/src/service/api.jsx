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
  return api.get('/listar/usuarios/');
}

export const perfilUsuario = (id) => {
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
  return api.get(`/listar/agenda/dia/${dateString}/`);
}

export const gerenciarPresenca = (id_aula, payload) => {
  return api.patch(`/gerenciar/presenca/${id_aula}/`, payload);
}

export const criarAula = (data) => {
  return api.post('/criar/agenda/', data);
}

export const listarProfessor = () => {
  return api.get('/listar/professor/');
}

export const criarPlano = (data) => {
  return api.post('/criar/plano/', data)
}

export const listarPlano = () => {
  return api.get('/listar/plano/');
}

export const inscreverAgenda  = (data) => {
  return api.post('/inscrever/agenda/', data);
}

export const listarAgendaSemana = () => {
  return api.get('/listar/agenda/semana/');
}

export const listarAlunos = () => {
  return api.get('/listar/aluno/');
}