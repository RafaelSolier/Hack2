
import type { ExpenseSummary } from '../types/expenseSummary';

function Card({ item, deleteFunction }: { item: ExpenseSummary; deleteFunction: (id: number) => void }) {
  return (
    <div
        key={item.id}
        // to={`/category/${item.expenseCategory.id}?year=${year}&month=${month}`}
        className="block border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
                {item.expenseCategory.name}
            </h2>
        <button 
            onClick={()=>deleteFunction(item.id)}
            className="text-red-500 hover:text-red-700"
        >
            Eliminar
        </button>
        </div>

        <div className="mt-2 text-sm text-gray-500">
        Total: {item.amount}
        </div>

        <div>
            <span className="text-xs text-gray-400">
                {item.year} - {item.month}
            </span>
        </div>
    </div>
  )
}

export default Card
