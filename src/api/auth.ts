import { api } from './client'

export const login = (data: { email: string; passwd: string }) =>
  api.post('/authentication/login', data)

export const register = (data: { email: string; passwd: string }) =>
  api.post('/authentication/register', data)