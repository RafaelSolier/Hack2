import type { ExpenseCategory } from './expenseCategory'

export interface ExpenseSummary {
  id: number
  expenseCategory: ExpenseCategory
  amount: number
  year: number
  month: number
}