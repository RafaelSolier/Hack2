import React, { useState } from 'react'
import { useExpensesGetCategory } from '../hooks/useExpensesSummary'
import { useExpensesDetail } from '../hooks/useExpensesSummary'
import type { ExpenseCategory } from '../types/expenseCategory'
import Card from '../components/Card'
import { useDeleteExpense } from '../hooks/useExpensesSummary'

const SearchExpenses: React.FC = () => {
  const today = new Date()
  const [year, setYear] = useState<number>(today.getFullYear())
  const [month, setMonth] = useState<number>(today.getMonth() + 1)
  const deleteExpenseMutation = useDeleteExpense()

  // Para categoría, replicamos el patrón de ExpenseForm
  const { data: catRes, isLoading: loadingCats } = useExpensesGetCategory()
  const categories: ExpenseCategory[] = catRes?.data ?? []
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryId, setCategoryId] = useState<number>(0)
  const [errors, setErrors] = useState<{ category?: string }>({})

  const { data: expenses, isLoading, isError, refetch } = useExpensesDetail({
    year,
    month,
    categoryId
  })

  const handleCategoryChange = (name: string) => {
    setCategoryName(name)
    const found = categories.find(c => c.name === name)
    setCategoryId(found ? found.id : 0)
  }

  async function deleteFunction(id: number) {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este resumen?')
    if (!confirmDelete) return
    try {
      await deleteExpenseMutation.mutateAsync(id)
      await refetch()
    } catch (error) {
      console.error('Error al eliminar:', error)
    }
  }

  const handleFilter = () => {
    const errs: typeof errors = {}
    if (categoryId <= 0) {
      errs.category = 'Selecciona una categoría válida'
    }
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    refetch()
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Buscar Gastos</h1>

      {/* Barra de filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="number"
          min={1}
          max={12}
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
          placeholder="Mes"
          className="border px-3 py-2 rounded w-24"
        />
        <input
          type="number"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          placeholder="Año"
          className="border px-3 py-2 rounded w-32"
        />

        {/* Selección de categoría igual que en ExpenseForm */}
        <div className="relative">
          <input
            list="category-list"
            id="category"
            value={categoryName}
            onChange={e => handleCategoryChange(e.target.value)}
            placeholder="Escribe para buscar..."
            disabled={loadingCats}
            className={`mt-1 block w-48 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <datalist id="category-list">
            {categories.map(cat => (
              <option key={cat.id} value={cat.name} />
            ))}
          </datalist>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        <button
          onClick={handleFilter}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filtrar
        </button>
      </div>

      {/* Resultados */}
      {isLoading && <p>Cargando gastos...</p>}
      {isError && (
        <p className="text-red-500">Error al cargar los gastos.</p>
      )}

      {!isLoading && expenses?.length === 0 && (
        <p className="text-gray-500">No se encontraron gastos.</p>
      )}

      {expenses && expenses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expenses.map(exp => (
            <Card key={exp.id} 
              item={exp} 
              deleteFunction={deleteFunction} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchExpenses
