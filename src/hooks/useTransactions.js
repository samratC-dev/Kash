import { useState, useEffect } from 'react'
import { STORAGE_KEY } from '../utils/constants'

export function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY)
      return s ? JSON.parse(s) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  function addTransaction(title, amount, category, type) {
    setTransactions(prev => [
      { id: Date.now(), title, amount: parseFloat(amount), category, type, date: new Date().toISOString() },
      ...prev,
    ])
  }

  function updateTransaction(id, patch) {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t))
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return { transactions, addTransaction, updateTransaction, deleteTransaction }
}
