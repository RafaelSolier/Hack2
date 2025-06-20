// services/expenses.ts
import axios from 'axios';
import type { ExpenseCategoryCreate } from '../types/expenseCategory';

// const API_BASE_URL = 'http://localhost:8000';
const API_BASE_URL = 'http://198.211.105.95:8080';

// Instancia base sin token (para login/register)
export const api = axios.create({
  baseURL: API_BASE_URL
});

// Instancia con interceptor para rutas privadas
export const privateApi = axios.create({
  baseURL: API_BASE_URL
});

// Interceptor: agrega el token antes de cada petición
privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ← Obtiene el token actualizado
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funciones de expenses (usarán privateApi)
export const getExpensesCategory = () =>
  privateApi.get('/expenses_category');

export const getSummary = () => privateApi.get('/expenses_summary');

export const getDetails = (year: number, month: number, categoryId: number) =>
  privateApi.get('/expenses/detail', { 
    params: { year, month, categoryId } 
  });

export const createExpense = (payload: ExpenseCategoryCreate) => 
  privateApi.post('/expenses', payload);

export const deleteExpense = (id: number) => 
  privateApi.delete(`/expenses/${id}`);