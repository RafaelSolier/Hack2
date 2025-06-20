import { api } from './client'

export const getGoals = () => api.get('/goals')

export const createGoal = (data: any) => api.post('/goals', data)

export const updateGoal = (id: number, data: any) =>
  api.patch(`/goals/${id}`, data)
