import { useQuery } from '@tanstack/react-query'
import { getExpenseCategories, getSummary, getDetails } from '../api/expenses'

export const useExpenseCategories = () =>
  useQuery({ queryKey: ['expenseCategories'], queryFn: () => getExpenseCategories() })

export const useExpensesSummary = (year: number, month: number) =>
  useQuery({ queryKey: ['expensesSummary', year, month], queryFn: () => getSummary(year, month) })

export const useExpenseDetails = (year: number, month: number, categoryId: number) =>
  useQuery({ queryKey: ['expenseDetails', year, month, categoryId], queryFn: () => getDetails(year, month, categoryId) })