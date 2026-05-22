import { formatINR } from '../utils/helpers'

export default function SummaryCards({ income, expense, balance }) {
  return (
    <div className="grid grid-cols-3 border border-ink mb-0">

      <div className="relative p-6 border-r border-ink group overflow-hidden">
        <div className="hash-bg absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="stamp text-ghost">Income</span>
            <span className="text-xs font-mono text-ghost">▲</span>
          </div>
          <p
            className="font-display text-[3.2rem] leading-none tracking-wide num-tick"
            style={{ color: '#2d7a00' }}
            key={income}
          >
            {formatINR(income)}
          </p>
          <div className="mt-4 h-px bg-warm" />
          <p className="font-mono text-[10px] text-ghost mt-2 uppercase tracking-widest">
            Total received
          </p>
        </div>
      </div>

      <div className="relative p-6 border-r border-ink group overflow-hidden">
        <div className="hash-bg absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="stamp text-ghost">Expenses</span>
            <span className="text-xs font-mono text-ghost">▼</span>
          </div>
          <p
            className="font-display text-[3.2rem] leading-none tracking-wide num-tick"
            style={{ color: '#cc0022' }}
            key={expense}
          >
            {formatINR(expense)}
          </p>
          <div className="mt-4 h-px bg-warm" />
          <p className="font-mono text-[10px] text-ghost mt-2 uppercase tracking-widest">
            Total spent
          </p>
        </div>
      </div>

      <div
        className="relative p-6 group overflow-hidden transition-colors duration-300"
        style={{ background: balance < 0 ? '#ff443310' : '#b8f00020' }}
      >
        <div className="hash-bg absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="stamp" style={{ color: balance < 0 ? '#cc0022' : '#2d7a00' }}>
              {balance < 0 ? 'Deficit' : 'Surplus'}
            </span>
            <span className="text-xs font-mono text-ghost">◆</span>
          </div>
          <p
            className="font-display text-[3.2rem] leading-none tracking-wide num-tick"
            style={{ color: balance < 0 ? '#cc0022' : '#0d0d0d' }}
            key={balance}
          >
            {balance < 0 ? '−' : ''}{formatINR(balance)}
          </p>
          <div className="mt-4 h-px bg-warm" />
          <p className="font-mono text-[10px] text-ghost mt-2 uppercase tracking-widest">
            Net balance
          </p>
        </div>
      </div>

    </div>
  )
}
