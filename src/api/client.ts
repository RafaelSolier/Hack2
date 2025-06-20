import axios from 'axios'

const api = axios.create({
  // Fallback a localhost si no existe la variable de entorno
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000',
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export { api }
