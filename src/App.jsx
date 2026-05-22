import { useState, useMemo } from 'react'
import { useTransactions } from './hooks/useTransactions'
import { useToast }        from './hooks/useToast'
import { calcTotals, getMonthLabel } from './utils/helpers'
import SummaryCards    from './components/SummaryCards'
import TransactionForm from './components/TransactionForm'
import ExpenseChart    from './components/ExpenseChart'
import TransactionList from './components/TransactionList'
import Toast           from './components/Toast'

export default function App() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions()
  const { toast, showToast } = useToast()
  const [editTarget, setEditTarget] = useState(null)

  const { income, expense, balance } = useMemo(() => calcTotals(transactions), [transactions])

  function handleAdd(title, amount, category, type) {
    addTransaction(title, amount, category, type)
    showToast('Entry recorded', 'success')
  }

  function handleUpdate(id, patch) {
    updateTransaction(id, patch)
    setEditTarget(null)
    showToast('Entry updated', 'updated')
  }

  function handleDelete(id) {
    deleteTransaction(id)
    showToast('Entry removed', 'deleted')
  }

  function handleEdit(tx) {
    setEditTarget(tx)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-paper font-body">

      <header className="border-b-4 border-ink">
        <div className="flex items-center justify-between px-6 py-2 border-b border-warm">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-ghost">
            Personal Finance Tracker
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-ghost">
            {getMonthLabel()}
          </p>
        </div>

        <div className="px-6 py-4 flex items-end justify-between">
          <div>
            <h1 className="font-display text-[5rem] leading-none tracking-widest text-ink">
              KASH
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ghost -mt-1">
              Money. Tracked. Clearly.
            </p>
          </div>

          <div className="flex items-center gap-6 pb-2">
            <DataPill label="Entries" value={transactions.length} />
            <DataPill
              label="This month"
              value={transactions.filter(t => new Date(t.date).getMonth() === new Date().getMonth()).length}
            />
          </div>
        </div>
      </header>

      <SummaryCards income={income} expense={expense} balance={balance} />

      <div className="flex border-b border-ink" style={{ minHeight: '75vh' }}>

        <div className="w-80 flex-shrink-0 border-r-2 border-ink flex flex-col">
          <TransactionForm
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            editTarget={editTarget}
            onCancelEdit={() => setEditTarget(null)}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <ExpenseChart transactions={transactions} />
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

      </div>

      <footer className="px-6 py-3 flex items-center justify-between border-t border-warm">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
          Data stored locally in your browser
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
          Kash © {new Date().getFullYear()}
        </p>
      </footer>

      <Toast toast={toast} />
    </div>
  )
}

function DataPill({ label, value }) {
  return (
    <div className="text-right">
      <p className="font-mono text-[9px] uppercase tracking-widest text-ghost">{label}</p>
      <p className="font-display text-2xl tracking-widest text-ink leading-none mt-0.5">{value}</p>
    </div>
  )
}
