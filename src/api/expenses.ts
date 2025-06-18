import { api } from './client'

export const getExpenseCategories = () =>
  api.get('/expenses_category')

export const getSummary = (year: number, month: number) =>
  api.get('/expenses_summary', { params: { year, month } })
export const getDetails = (year: number, month: number, categoryId: number) =>
  api.get('/expenses/detail', { params: { year, month, categoryId } })

export const createExpense = (payload: any) =>
  api.post('/expenses', payload)

export const deleteExpense = (id: number) =>
  api.delete(`/expenses/${id}`)