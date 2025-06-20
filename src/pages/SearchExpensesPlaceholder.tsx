import React, { useState } from 'react'
import { useExpensesDetail } from '../hooks/useExpensesDetail'
import { useExpensesGetCategory } from '../hooks/useExpensesSummary'
import type { ExpenseCategory } from '../types/expenseCategory'

const SearchExpenses = () => {
  const currentDate = new Date()
  const [year, setYear] = useState<number>(currentDate.getFullYear())
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1)
  const [categoryName, setCategoryName] = useState('')
  const [categoryId, setCategoryId] = useState<number>(0)
  const [search, setSearch] = useState<{ year: number; month: number; categoryId: number }>({
    year: 0,
    month: 0,
    categoryId: 0,
  })

  const { data: catRes } = useExpensesGetCategory()
  const categories: ExpenseCategory[] = catRes?.data ?? []

  const { data, isLoading, isError } = useExpensesDetail(
    search.year,
    search.month,
    search.categoryId,
  )
  const expenses: any[] = data?.data ?? []

  const handleCategoryChange = (name: string) => {
    setCategoryName(name)
    const found = categories.find(c => c.name === name)
    setCategoryId(found ? found.id : 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch({ year, month, categoryId })
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Buscar Gastos</h1>
      <form onSubmit={handleSubmit} className="space-x-2">
        <input
          type="number"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
          className="border p-2 rounded"
        />
        <input
          list="category-list"
          value={categoryName}
          onChange={e => handleCategoryChange(e.target.value)}
          placeholder="Categoría"
          className="border p-2 rounded"
        />
        <datalist id="category-list">
          {categories.map(cat => (
            <option key={cat.id} value={cat.name} />
          ))}
        </datalist>
        <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
          Buscar
        </button>
      </form>

      {isLoading && <p>Cargando...</p>}
      {isError && <p className="text-red-500">Error al cargar</p>}

      {expenses.length > 0 && (
        <ul className="space-y-2">
          {expenses.map(exp => (
            <li key={exp.id} className="border p-2 rounded">
              <div className="text-sm text-gray-600">
                {exp.date} - {exp.amount}
              </div>
              <div className="text-xs text-gray-400">{exp.category.name}</div>
            </li>
          ))}
        </ul>
      )}

      {expenses.length === 0 && search.categoryId !== 0 && !isLoading && !isError && (
        <p>No hay datos</p>
      )}
    </div>
  )
}

export default SearchExpenses
