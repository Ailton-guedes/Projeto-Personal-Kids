//importa a biblioteca axios para fazer requisições HTTP
import axios from 'axios';

// Cria uma instância do axios com a URL base da API
export const api = axios.create({
  baseURL: 'http://localhost:3030/api',
});

