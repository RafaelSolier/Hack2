import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getGoals, createGoal, updateGoal } from '../api/goals'

export const useGoals = () =>
  useQuery({ queryKey: ['goals'], queryFn: () => getGoals() })

export const useCreateGoal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['goals'] }) }
  })
}

export const useUpdateGoal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateGoal(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['goals'] }) }
  })
}
