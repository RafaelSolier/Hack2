import { useQuery } from '@tanstack/react-query'
import { getDetails } from '../api/expenses'

export const useExpensesDetail = (year: number, month: number, categoryId: number) =>
  useQuery({
    queryKey: ['expensesDetail', year, month, categoryId],
    queryFn: () => getDetails(year, month, categoryId),
    enabled: Boolean(year && month && categoryId)
  })
