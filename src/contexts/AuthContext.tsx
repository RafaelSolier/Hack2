import React, { createContext, useState, useEffect } from 'react'
import { login, register } from '../api/auth'

interface AuthContextValue {
  token: string | null
  userEmail: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue>(null!)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('email'))

  const signIn = async (email: string, passwd: string) => {
    try {
      const res = await login({ email, passwd })
      setToken(res.data.result.token)
      setUserEmail(email)
      localStorage.setItem('token', res.data.result.token)
      localStorage.setItem('email', email)
    } catch (err) {
      throw err
    }
  }

  const signUp = async (email: string, passwd: string) => {
    try {
      const res = await register({ email, passwd })
      setToken(res.data.token)
      setUserEmail(email)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('email', email)
    } catch (err) {
      throw err
    }
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
