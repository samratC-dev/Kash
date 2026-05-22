import { useState, useEffect } from 'react'
import { CATEGORIES } from '../utils/constants'

export default function TransactionForm({ onAdd, onUpdate, editTarget, onCancelEdit }) {
  const [type,     setType]     = useState('income')
  const [title,    setTitle]    = useState('')
  const [amount,   setAmount]   = useState('')
  const [category, setCategory] = useState(CATEGORIES.income[0])
  const [errors,   setErrors]   = useState({})

  const isEditing = editTarget !== null

  useEffect(() => {
    if (editTarget) {
      setType(editTarget.type)
      setTitle(editTarget.title)
      setAmount(String(editTarget.amount))
      setCategory(editTarget.category)
    }
  }, [editTarget])

  useEffect(() => {
    if (!editTarget) setCategory(CATEGORIES[type][0])
  }, [type, editTarget])

  function validate() {
    const e = {}
    if (!title.trim())                             e.title  = 'Required'
    if (!amount || isNaN(+amount) || +amount <= 0) e.amount = 'Invalid amount'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    if (!validate()) return
    if (isEditing) {
      onUpdate(editTarget.id, { title: title.trim(), amount: parseFloat(amount), category, type })
    } else {
      onAdd(title.trim(), parseFloat(amount), category, type)
      setTitle('')
      setAmount('')
    }
  }

  function handleCancel() {
    setTitle(''); setAmount(''); setErrors({}); setType('income')
    onCancelEdit()
  }

  return (
    <div className="bg-panel text-paper flex flex-col h-full">

      <div className="px-6 pt-6 pb-5 border-b border-panelB">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[1.8rem] tracking-widest text-paper">
            {isEditing ? 'EDIT' : 'ADD NEW'}
          </h2>
          {isEditing && (
            <span className="stamp" style={{ color: '#ff9900', borderColor: '#ff9900' }}>editing</span>
          )}
        </div>
        <p className="font-mono text-[10px] text-ghost uppercase tracking-widest mt-1">
          {isEditing ? 'Modify existing entry' : 'Record a transaction'}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-0 flex-1">

        <div className="px-6 py-5 border-b border-panelB">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ghost mb-3">Transaction type</p>
          <div className="grid grid-cols-2 gap-2">
            {['income', 'expense'].map(t => {
              const active = type === t
              const col    = t === 'income' ? '#b8f000' : '#ff4433'
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className="py-3 font-mono text-[11px] tracking-widest uppercase border-2 transition-all duration-150 cursor-pointer"
                  style={
                    active
                      ? { borderColor: col, color: col, background: col + '18' }
                      : { borderColor: '#2a2520', color: '#52504a', background: 'transparent' }
                  }
                >
                  {t === 'income' ? '↑  Income' : '↓  Expense'}
                </button>
              )
            })}
          </div>
        </div>

        <div className="px-6 py-5 border-b border-panelB">
          <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-ghost mb-3">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Freelance payment"
            autoComplete="off"
            className="w-full bg-panelB text-paper font-body text-sm px-4 py-3 outline-none border-2 transition-all duration-150 placeholder:text-ghost"
            style={{ borderColor: errors.title ? '#ff4433' : '#2a2520' }}
            onFocus={e => !errors.title && (e.target.style.borderColor = '#b8f000')}
            onBlur={e  => !errors.title && (e.target.style.borderColor = '#2a2520')}
          />
          {errors.title && (
            <p className="font-mono text-[10px] mt-1.5" style={{ color: '#ff4433' }}>{errors.title}</p>
          )}
        </div>

        <div className="px-6 py-5 border-b border-panelB">
          <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-ghost mb-3">
            Amount  <span className="text-ghost/60">(₹)</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            autoComplete="off"
            className="w-full bg-panelB text-paper font-mono text-lg px-4 py-3 outline-none border-2 transition-all duration-150 placeholder:text-ghost"
            style={{ borderColor: errors.amount ? '#ff4433' : '#2a2520' }}
            onFocus={e => !errors.amount && (e.target.style.borderColor = '#b8f000')}
            onBlur={e  => !errors.amount && (e.target.style.borderColor = '#2a2520')}
          />
          {errors.amount && (
            <p className="font-mono text-[10px] mt-1.5" style={{ color: '#ff4433' }}>{errors.amount}</p>
          )}
        </div>

        <div className="px-6 py-5 border-b border-panelB">
          <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-ghost mb-3">
            Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full bg-panelB text-paper font-mono text-sm px-4 py-3 outline-none border-2 border-[#2a2520] appearance-none cursor-pointer pr-10 transition-all duration-150"
            onFocus={e => (e.target.style.borderColor = '#b8f000')}
            onBlur={e  => (e.target.style.borderColor = '#2a2520')}
          >
            {CATEGORIES[type].map(c => (
              <option key={c} value={c} style={{ background: '#1a1714' }}>{c}</option>
            ))}
          </select>
        </div>

        <div className="px-6 py-5 mt-auto">
          <button
            type="submit"
            className="w-full py-4 font-display text-[1.3rem] tracking-widest transition-all duration-150 cursor-pointer border-2"
            style={
              isEditing
                ? { background: '#ff9900', color: '#0d0d0d', borderColor: '#ff9900' }
                : { background: '#b8f000', color: '#0d0d0d', borderColor: '#b8f000' }
            }
          >
            {isEditing ? 'SAVE CHANGES' : 'ADD ENTRY'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 mt-2 font-mono text-xs uppercase tracking-widest text-ghost border border-panelB hover:border-coral hover:text-coral transition-all duration-150 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  )
}
