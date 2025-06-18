import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createExpense, deleteExpense } from '../api/expenses'

export const useCreateExpense = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expensesDetail'] })
  })
}

export const useDeleteExpense = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expensesDetail'] })
  })
}