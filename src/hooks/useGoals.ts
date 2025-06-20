import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getGoals, createGoal, updateGoal } from '../api/goals'
import type { Goal } from '../types/goal'

export const useGoals = () =>
  useQuery({
    queryKey: ['goals'],
    queryFn: getGoals
  })

export const useCreateGoal = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Goal) => createGoal(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['goals'] })
  })
}

export const useUpdateGoal = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Goal> }) => updateGoal(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['goals'] })
  })
}
