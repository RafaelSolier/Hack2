import type { ExpenseCategory, ExpenseCategoryCreate } from './expenseCategory';

export interface Expense {
  id: number
  expenseCategory: ExpenseCategory
  year: number
  month: number
  amount: number
}

export interface ExpenseCreate {
  category: ExpenseCategoryCreate
  date: string
  amount: number
}