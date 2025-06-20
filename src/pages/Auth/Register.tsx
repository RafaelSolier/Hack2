import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { signUp } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 12) {
      setError('La contraseña debe tener al menos 12 caracteres')
      return
    }
    try {
      await signUp(email, password)
      nav('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error de registro')
    }
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-4 space-y-2">
      <h1 className="text-2xl mb-4">Registro</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="block mb-2 w-full rounded border px-2 py-1"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="block mb-4 w-full rounded border px-2 py-1"
      />
      <button type="submit" className="btn btn-primary w-full">Crear cuenta</button>
    </form>
  )
}
