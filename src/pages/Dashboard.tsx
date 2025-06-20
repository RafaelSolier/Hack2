import React, { useState, useEffect, useMemo } from 'react'
import { useExpensesSummary, useDeleteExpense, useCreateExpense } from '../hooks/useExpensesSummary'
import type { ExpenseSummary } from '../types/expenseSummary'
import Modal from '../components/Modal'
import Card from '../components/Card'
import ExpenseForm from '../components/ExpenseForm'

const Dashboard: React.FC = () => {
  const { data, isLoading, isError, refetch } = useExpensesSummary()
  const deleteExpenseMutation = useDeleteExpense()
  const createExpenseMutation = useCreateExpense()
  const _summaries: ExpenseSummary[] = data?.data ?? []

  const [summaries, setSummaries] = useState<ExpenseSummary[]>(_summaries)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 6

  // Update local summaries when server data changes
  useEffect(() => {
    setSummaries(_summaries)
    setCurrentPage(1)
  }, [_summaries])

  // Sort summaries by most recent (year, then month)
  const sortedSummaries = useMemo(() => {
    return [...summaries].sort((a, b) => {
      const aVal = a.year * 100 + a.month
      const bVal = b.year * 100 + b.month
      return bVal - aVal
    })
  }, [summaries])

  const totalPages = Math.ceil(sortedSummaries.length / itemsPerPage)

  const currentSummaries = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return sortedSummaries.slice(start, start + itemsPerPage)
  }, [sortedSummaries, currentPage])

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

  const handleCreateExpense = async (formData: any) => {
    try {
      await createExpenseMutation.mutateAsync(formData)
      setIsModalOpen(false)
      await refetch()
    } catch (error) {
      console.error('Error al crear gasto:', error)
      throw error
    }
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  if (isLoading) {
    return <div className="p-4">Cargando resumen...</div>
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error al cargar el resumen.</div>
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resumen de Gastos</h1>
        <button 
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Agregar Gasto
        </button>
      </div>

      {deleteExpenseMutation.isLoading && (
        <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
          Eliminando...
        </div>
      )}
      
      {currentSummaries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSummaries.map(item => (
            <Card 
              key={item.id} 
              item={item} 
              deleteFunction={deleteFunction}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg mb-2">No hay gastos registrados</p>
          <p className="text-sm">¡Comienza agregando tu primer gasto!</p>
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Agregar Nuevo Gasto"
      >
        <ExpenseForm 
          // onSubmit={handleCreateExpense}
          onCancel={closeModal}
          // isLoading={createExpenseMutation.isLoading}
        />
      </Modal>
    </div>
  )
}

export default Dashboard
