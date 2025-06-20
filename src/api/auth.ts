import axios from 'axios'

const API_BASE_URL = 'http://198.211.105.95:8080';
// const API_BASE_URL = 'http://localhost:8000';

export const login = (data: { email: string, passwd: string }) =>
  axios.post(API_BASE_URL+'/authentication/login', data)

export const register = (data: { email: string, passwd: string }) =>
  axios.post(API_BASE_URL+'/authentication/register', data)