import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { signIn } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      nav('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Credenciales inválidas')
    }
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-4 space-y-2">
      <h1 className="text-2xl mb-4">Login</h1>
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
      <button type="submit" className="btn btn-primary w-full">Entrar</button>
    </form>
  )
}

