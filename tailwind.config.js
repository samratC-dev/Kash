export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body:    ['"Libre Franklin"', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        ink:    '#0d0d0d',
        paper:  '#f5f0e8',
        cream:  '#ede8df',
        warm:   '#d9d2c5',
        faint:  '#c4bdb0',
        ghost:  '#9a9080',
        lime:   '#b8f000',
        coral:  '#ff4433',
        sky:    '#0055ff',
        amber:  '#ff9900',
        panel:  '#1a1714',
        panelB: '#252119',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        nudgeRight: {
          from: { opacity: '0', transform: 'translateX(-10px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        slideUp:    'slideUp 0.3s ease forwards',
        popIn:      'popIn 0.2s ease forwards',
        nudgeRight: 'nudgeRight 0.25s ease forwards',
      },
    },
  },
  plugins: [],
}
