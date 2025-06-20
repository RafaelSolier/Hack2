// services/expenses.ts
import type { ExpenseCategoryCreate } from '../types/expenseCategory'
import { api } from './client'

// Reutilizamos la instancia configurada con el interceptor
const privateApi = api

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
