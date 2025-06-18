import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { signIn } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn(email, password)
    nav('/dashboard')
  }
  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="block mb-2 w-full rounded border px-2 py-1"/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="block mb-4 w-full rounded border px-2 py-1"/>
      <button
        type="submit"
        className="w-full rounded bg-blue-600 text-white py-2 transition-colors active:bg-blue-800 hover:bg-blue-700"
      >
        Entrar
      </button>
    </form>
  )
}
