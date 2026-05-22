import { useState, useCallback, useRef } from 'react'

export function useToast() {
  const [toast, setToast] = useState({ msg: '', type: 'success', visible: false })
  const timer = useRef(null)

  const showToast = useCallback((msg, type = 'success') => {
    clearTimeout(timer.current)
    setToast({ msg, type, visible: true })
    timer.current = setTimeout(() => setToast(p => ({ ...p, visible: false })), 2800)
  }, [])

  return { toast, showToast }
}
