import { CAT_EMOJIS } from '../utils/constants'
import { formatINR } from '../utils/helpers'

export default function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      <div className="flex items-center justify-between px-6 py-4 border-b border-ink">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-[1.4rem] tracking-widest text-ink">LEDGER</h3>
          {transactions.length > 0 && (
            <span className="stamp text-ghost">{transactions.length} entries</span>
          )}
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-16 gap-3 text-center px-6">
          <div className="w-16 h-16 border-2 border-dashed border-warm flex items-center justify-center font-display text-2xl text-faint tracking-widest">
            ?
          </div>
          <p className="font-display text-xl tracking-widest text-faint">EMPTY</p>
          <p className="font-body text-sm text-ghost max-w-[200px]">
            Your transactions will appear here once added.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">

          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-0 border-b border-ink px-6 py-2 bg-cream">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ghost w-10" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ghost">Description</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ghost text-right mr-6">Amount</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ghost w-14" />
          </div>

          {transactions.map((tx, i) => (
            <TxRow key={tx.id} tx={tx} index={i} onEdit={onEdit} onDelete={onDelete} />
          ))}

        </div>
      )}
    </div>
  )
}

function TxRow({ tx, index, onEdit, onDelete }) {
  const date   = new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
  const emoji  = CAT_EMOJIS[tx.category] || '📦'
  const catKey = tx.category.toLowerCase()
  const isIn   = tx.type === 'income'
  const color  = isIn ? '#2d7a00' : '#cc0022'

  return (
    <div
      className="row-in group grid grid-cols-[auto_1fr_auto_auto] gap-0 px-6 py-3.5 border-b border-warm hover:bg-cream transition-colors duration-100 items-center"
      style={{ animationDelay: `${Math.min(index * 25, 300)}ms` }}
    >
      <div className={`cat-${catKey} w-8 h-8 flex items-center justify-center text-sm mr-4 flex-shrink-0`}>
        {emoji}
      </div>

      <div className="min-w-0 pr-4">
        <p className="font-body font-semibold text-sm text-ink truncate">{tx.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-[10px] text-ghost">{date}</span>
          <span className="font-mono text-[9px] text-faint">·</span>
          <span className="font-mono text-[10px] text-ghost">{tx.category}</span>
        </div>
      </div>

      <div
        className="font-mono font-medium text-sm text-right mr-6 tabular-nums"
        style={{ color }}
      >
        {isIn ? '+' : '−'}{formatINR(tx.amount)}
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-100 w-14 justify-end">
        <button
          onClick={() => onEdit(tx)}
          className="w-6 h-6 border border-ink text-ink text-[10px] flex items-center justify-center cursor-pointer hover:bg-ink hover:text-paper transition-all duration-100"
          title="Edit"
        >✎</button>
        <button
          onClick={() => onDelete(tx.id)}
          className="w-6 h-6 border border-coral text-coral text-[10px] flex items-center justify-center cursor-pointer hover:bg-coral hover:text-paper transition-all duration-100"
          title="Delete"
        >✕</button>
      </div>
    </div>
  )
}
