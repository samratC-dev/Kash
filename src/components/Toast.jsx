const CONFIG = {
  success: { icon: '✓', bg: '#b8f000', color: '#0d0d0d' },
  deleted: { icon: '✕', bg: '#ff4433', color: '#f5f0e8' },
  updated: { icon: '✎', bg: '#ff9900', color: '#0d0d0d' },
}

export default function Toast({ toast }) {
  const { msg, type, visible } = toast
  const cfg = CONFIG[type] || CONFIG.success

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 border-2 border-ink font-body text-sm pointer-events-none transition-all duration-300"
      style={{
        background:  cfg.bg,
        color:       cfg.color,
        borderColor: cfg.color === '#0d0d0d' ? '#0d0d0d' : cfg.bg,
        opacity:     visible ? 1 : 0,
        transform:   `translateX(-50%) translateY(${visible ? '0' : '12px'})`,
        animation:   visible ? 'toastSlide 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
      }}
    >
      <span className="font-mono font-bold text-base">{cfg.icon}</span>
      <span className="font-medium tracking-wide">{msg}</span>
    </div>
  )
}
