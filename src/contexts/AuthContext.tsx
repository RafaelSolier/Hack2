import React, { createContext, useState } from 'react'
import { login, register } from '../api/auth'

interface AuthContextValue {
  token: string | null
  userEmail: string | null
  signIn: (email: string, passwd: string) => Promise<void>
  signUp: (email: string, passwd: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue>(null!)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('email'))

  const signIn = async (email: string, passwd: string) => {
    const res = await login({ email, passwd })
    const tokenValue = res.data.data?.token
    setToken(tokenValue)
    setUserEmail(email)
    localStorage.setItem('token', tokenValue)
    localStorage.setItem('email', email)
  }

  const signUp = async (email: string, passwd: string) => {
    const res = await register({ email, passwd })
    const tokenValue = res.data.data?.token
    setToken(tokenValue)
    setUserEmail(email)
    localStorage.setItem('token', tokenValue)
    localStorage.setItem('email', email)
  }

  const signOut = () => {
    setToken(null)
    setUserEmail(null)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ token, userEmail, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}