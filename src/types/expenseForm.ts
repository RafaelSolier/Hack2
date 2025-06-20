import type {ExpenseCategory} from './expenseCategory';

export interface ExpenseFormData {
  amount: number
  expenseCategory: ExpenseCategory
  date: string
}

export interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}