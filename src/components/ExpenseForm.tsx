import React, { useState } from 'react'
import { useExpensesGetCategory, useCreateExpense } from '../hooks/useExpensesSummary'
import type { ExpenseCategory } from '../types/expenseCategory'

const ExpenseForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const today = new Date().toISOString().split('T')[0]

  const [amount, setAmount] = useState<number>(0)
  const [date, setDate] = useState<string>(today)
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryId, setCategoryId] = useState<number>(0)
  const [errors, setErrors] = useState<{ amount?: string; date?: string; category?: string }>({})

  // Fetch categories
  const { data: catRes, isLoading: loadingCats } = useExpensesGetCategory()
  const categories: ExpenseCategory[] = catRes?.data ?? []

  // Mutation to create expense
  const { mutateAsync: createExpense, isPending: isCreating } = useCreateExpense()

  // Validation
  const validate = () => {
    const errs: typeof errors = {}
    if (amount <= 0) errs.amount = 'El monto debe ser mayor que cero'
    if (!date) errs.date = 'Seleccione una fecha'
    if (categoryId <= 0) errs.category = 'Seleccione una categoría válida'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // Handle input changes
  const handleCategoryChange = (name: string) => {
    setCategoryName(name)
    const found = categories.find(c => c.name === name)
    setCategoryId(found ? found.id : 0)
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await createExpense({ amount, date, category: { id: categoryId } })
      // Reset form
      setAmount(0)
      setDate(today)
      setCategoryName('')
      setCategoryId(0)
      setErrors({})
    } catch (error) {
      console.error('Error al crear gasto:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={e => setAmount(parseFloat(e.target.value))}
          step="0.01"
          placeholder="0.00"
          // disabled={isCreating}
          className={`mt-1 block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
            errors.amount ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          // disabled={isCreating}
          className={`mt-1 block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
            errors.date ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
        <input
          list="category-list"
          id="category"
          value={categoryName}
          onChange={e => handleCategoryChange(e.target.value)}
          placeholder="Escribe para buscar..."
          // disabled={loadingCats || isCreating}
          className={`mt-1 block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <datalist id="category-list">
          {categories.map(cat => (
            <option key={cat.id} value={cat.name} />
          ))}
        </datalist>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          // disabled={isCreating}
          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          {isCreating ? 'Guardando...' : 'Guardar Gasto'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          // disabled={isCreating}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default ExpenseForm
