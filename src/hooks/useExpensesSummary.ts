import { useQuery } from '@tanstack/react-query'
import { getExpensesCategory, getSummary, deleteExpense, createExpense, getDetails} from '../api/expenses'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Filters } from '../types/filters'

export const useExpensesGetCategory = () =>
    useQuery({
        queryKey: ['expensesCategory'],
        queryFn: () => getExpensesCategory()
    })

export const useExpensesSummary = () =>
    useQuery({
        queryKey: ['expensesSummary'],
        queryFn: () => getSummary()
    })

export const useDeleteExpense = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (id: number) => deleteExpense(id),
        onSuccess: () => {
            // Invalidar y refrescar la query de summaries después de eliminar
            queryClient.invalidateQueries({ queryKey: ['expensesSummary'] })
        },
        onError: (error) => {
            console.error('Error al eliminar gasto:', error)
        }
    })
}


export const useCreateExpense = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (payload: any) => createExpense(payload),
        onSuccess: () => {
            // Invalidar y refrescar la query de summaries después de crear
            queryClient.invalidateQueries({ queryKey: ['expensesSummary'] })
        },
        onError: (error) => {
            console.error('Error al crear gasto:', error)
        }
    })
}


export const useExpensesDetail = (filters: Filters) => {
  return useQuery({
    // ['expenses', filters.year, filters.month, filters.categoryId],
    // () =>
    //   getDetails(filters.year, filters.month, filters.categoryId)
    //     .then(res => res.data),
    queryKey: ['expensesDetail'],
    queryFn: () => getDetails(filters.year, filters.month, filters.categoryId)}
  )
}
