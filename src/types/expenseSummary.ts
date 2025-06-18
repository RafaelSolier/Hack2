import type { ExpenseCategory } from './expenseCategory'

export interface ExpenseSummary {
  expenseCategory: ExpenseCategory
  total: number
  year: number
  month: number
}