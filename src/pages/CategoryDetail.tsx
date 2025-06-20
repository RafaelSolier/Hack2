import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDeleteExpense } from '../hooks/useExpensesSummary'
import { useExpensesDetail } from '../hooks/useExpensesDetail'

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>()
  const [search] = useSearchParams()
  const year = Number(search.get('year'))
  const month = Number(search.get('month'))
  const { data, isLoading, isError, refetch } = useExpensesDetail(year, month, Number(id))
  const deleteMutation = useDeleteExpense()
  const expenses = data?.data ?? []

  const handleDelete = async (expId: number) => {
    if (!window.confirm('¿Eliminar gasto?')) return
    await deleteMutation.mutateAsync(expId)
    refetch()
  }

  if (isLoading) return <div className="p-4">Cargando...</div>
  if (isError) return <div className="p-4 text-red-500">Error al cargar</div>

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Detalles</h1>
      {expenses.length === 0 && <p>No hay datos</p>}
      {expenses.map((exp: any) => (
        <div key={exp.id} className="border p-2 rounded flex justify-between">
          <div>
            <p className="font-medium">{exp.expenseCategory.name}</p>
            <p className="text-sm text-gray-500">{exp.date} - {exp.amount}</p>
          </div>
          <button onClick={() => handleDelete(exp.id)} className="text-red-600">Eliminar</button>
        </div>
      ))}
    </div>
  )
}
