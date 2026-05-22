import { useState, useMemo } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement,
} from 'chart.js'
import { CHART_COLORS } from '../utils/constants'
import { groupByCategory, formatINR } from '../utils/helpers'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function ExpenseChart({ transactions }) {
  const [mode, setMode] = useState('donut')

  const catMap  = useMemo(() => groupByCategory(transactions), [transactions])
  const hasData = Object.keys(catMap).length > 0
  const labels  = Object.keys(catMap)
  const data    = Object.values(catMap)
  const colors  = labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length])

  const pluginOpts = {
    legend: {
      position: 'bottom',
      labels: {
        color: '#5a5040',
        font:  { family: 'IBM Plex Mono', size: 11 },
        boxWidth: 10, boxHeight: 10, padding: 14,
      },
    },
    tooltip: {
      backgroundColor: '#0d0d0d',
      borderColor:     '#333',
      borderWidth:     1,
      titleColor:      '#f5f0e8',
      bodyColor:       '#9a9080',
      padding:         12,
      callbacks: { label: ctx => '  ' + formatINR(ctx.raw) },
    },
  }

  const donutData = {
    labels,
    datasets: [{ data, backgroundColor: colors, borderColor: '#f5f0e8', borderWidth: 3, hoverOffset: 5 }],
  }

  const barData = {
    labels,
    datasets: [{
      label: 'Spend',
      data,
      backgroundColor: colors.map(c => c + '33'),
      borderColor:     colors,
      borderWidth:     2,
      borderRadius:    0,
    }],
  }

  const baseOpts = {
    responsive: true, maintainAspectRatio: false,
    animation:  { duration: 320 },
    plugins:    pluginOpts,
  }

  const barOpts = {
    ...baseOpts,
    scales: {
      x: {
        grid:  { color: '#d9d2c5' },
        ticks: { color: '#9a9080', font: { family: 'IBM Plex Mono', size: 10 } },
      },
      y: {
        grid:  { color: '#d9d2c5' },
        ticks: {
          color: '#9a9080',
          font:  { family: 'IBM Plex Mono', size: 10 },
          callback: v => '₹' + Number(v).toLocaleString('en-IN'),
        },
      },
    },
  }

  const donutOpts = { ...baseOpts, cutout: '65%' }

  return (
    <div className="border-b border-ink">
      <div className="flex items-center justify-between px-6 py-4 border-b border-ink">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-[1.4rem] tracking-widest text-ink">BREAKDOWN</h3>
          <span className="stamp text-ghost">by category</span>
        </div>
        <div className="flex gap-0 border border-ink">
          {[['donut', 'RING'], ['bar', 'BARS']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className="px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest cursor-pointer transition-all duration-150"
              style={
                mode === key
                  ? { background: '#0d0d0d', color: '#f5f0e8' }
                  : { background: 'transparent', color: '#9a9080' }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 p-6 relative">
        {hasData ? (
          mode === 'donut'
            ? <Doughnut data={donutData} options={donutOpts} />
            : <Bar      data={barData}   options={barOpts} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
            <span className="font-display text-[3rem] text-warm tracking-widest">—</span>
            <p className="font-mono text-xs text-ghost uppercase tracking-widest">No expense data</p>
            <p className="font-body text-sm text-faint max-w-[200px] mt-1">
              Add expenses to visualise your spending.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
