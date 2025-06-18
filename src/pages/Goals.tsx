import React, { useState } from 'react'
import { useGoals, useCreateGoal, useUpdateGoal } from '../hooks/useGoals'
import type { Goal } from '../types/goal'

export default function Goals() {
  const { data, isLoading, isError } = useGoals()
  const goals: Goal[] = data?.data ?? []
  const createGoal = useCreateGoal()
  const updateGoal = useUpdateGoal()
  const [amount, setAmount] = useState(0)
  const now = new Date()

  const addGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    await createGoal.mutateAsync({ year: now.getFullYear(), month: now.getMonth() + 1, amount })
    setAmount(0)
  }

  const changeAmount = (id: number, value: number) => {
    updateGoal.mutate({ id, data: { amount: value } })
  }

  if (isLoading) return <div className="p-4">Cargando metas...</div>
  if (isError) return <div className="p-4 text-red-500">Error al cargar metas</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Metas de Ahorro</h1>
      <form onSubmit={addGoal} className="mb-4 space-x-2">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="border px-2 py-1 rounded"
          placeholder="Monto"
        />
        <button className="bg-blue-600 text-white px-3 py-1 rounded" type="submit">
          Añadir meta
        </button>
      </form>
      <ul className="space-y-2">
        {goals.map(g => (
          <li key={g.id} className="border p-2 flex items-center space-x-2">
            <span>{g.year}/{g.month}</span>
            <input
              type="number"
              defaultValue={g.amount}
              onBlur={e => changeAmount(g.id, Number(e.target.value))}
              className="border px-2 py-1 rounded flex-1"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}