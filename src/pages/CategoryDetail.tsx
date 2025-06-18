import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useExpenseDetails } from '../hooks/useExpensesSummary'
import { createExpense, deleteExpense } from '../api/expenses'
import type { Expense } from '../types/expense'

export default function CategoryDetail() {
  const { id } = useParams()
  const [search] = useSearchParams()
  const year = Number(search.get('year'))
  const month = Number(search.get('month'))
  const { data, isLoading, isError, refetch } = useExpenseDetails(year, month, Number(id))
  const expenses: Expense[] = data?.data ?? []
  const [amount, setAmount] = useState(0)

  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault()
    await createExpense({ amount, categoryId: Number(id), year, month })
    setAmount(0)
    refetch()
  }

  const removeExpense = async (expenseId: number) => {
    await deleteExpense(expenseId)
    refetch()
  }

  if (isLoading) return <div className="p-4">Cargando detalles...</div>
  if (isError) return <div className="p-4 text-red-500">Error al cargar detalles</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles de Categoría</h1>
      <form onSubmit={addExpense} className="mb-4 space-x-2">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="border px-2 py-1 rounded"
          placeholder="Monto"
        />
        <button className="bg-blue-600 text-white px-3 py-1 rounded" type="submit">
          Agregar
        </button>
      </form>
      <ul className="space-y-2">
        {expenses.map(exp => (
          <li key={exp.id} className="border p-2 flex justify-between">
            <span>S/. {exp.amount}</span>
            <button onClick={() => removeExpense(exp.id)} className="text-red-600">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}