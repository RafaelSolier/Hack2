import React from 'react'
import { Link } from 'react-router-dom'
import { useExpensesSummary } from '../hooks/useExpensesSummary'
import type { ExpenseSummary } from '../types/expenseSummary'

const Dashboard: React.FC = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const { data, isLoading, isError } = useExpensesSummary(year, month)
  const summaries: ExpenseSummary[] = data?.data ?? []

  if (isLoading) {
    return <div className="p-4">Cargando resumen...</div>
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error al cargar el resumen.</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Resumen de Gastos</h1>
      {summaries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map(item => (
            <Link
              key={item.expenseCategory.id}
              to={`/category/${item.expenseCategory.id}?year=${year}&month=${month}`}
              className="block border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="text-lg font-medium text-gray-700">
                {item.expenseCategory.name}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Total: {item.total}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No hay datos</div>
      )}
    </div>
  )
}

export default Dashboard