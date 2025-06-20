import React, { useState } from 'react'
import { useGoals, useCreateGoal, useUpdateGoal } from '../hooks/useGoals'
import type { Goal } from '../types/goal'

export default function Goals() {
  const { data, isLoading, isError } = useGoals()
  const createMutation = useCreateGoal()
  const updateMutation = useUpdateGoal()
  const goals: Goal[] = data?.data ?? []

  const [form, setForm] = useState<Goal>({ id: 0, month: 1, year: new Date().getFullYear(), amount: 0 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createMutation.mutateAsync(form)
    setForm({ id: 0, month: 1, year: new Date().getFullYear(), amount: 0 })
  }

  const handleUpdate = async (goal: Goal) => {
    await updateMutation.mutateAsync({ id: goal.id, data: { amount: goal.amount } })
  }

  if (isLoading) return <div className="p-4">Cargando...</div>
  if (isError) return <div className="p-4 text-red-500">Error al cargar</div>

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Metas de ahorro</h1>
      <form onSubmit={submit} className="space-x-2">
        <input type="number" name="year" value={form.year} onChange={handleChange} className="border p-1"/>
        <input type="number" name="month" value={form.month} onChange={handleChange} className="border p-1"/>
        <input type="number" name="amount" value={form.amount} onChange={handleChange} className="border p-1"/>
        <button type="submit" className="bg-blue-500 text-white px-2 py-1">Crear</button>
      </form>
      <ul className="space-y-2">
        {goals.map(g => (
          <li key={g.id} className="flex items-center space-x-2">
            <span>{g.year}-{g.month}</span>
            <input type="number" value={g.amount} onChange={e => handleUpdate({ ...g, amount: Number(e.target.value) })} className="border p-1"/>
          </li>
        ))}
      </ul>
    </div>
  )
}
