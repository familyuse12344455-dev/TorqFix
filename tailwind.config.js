/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        torq: {
          bg: '#071426',
          dark: '#050B14',
          navy: '#0B1B3A',
          card: '#102445',
          border: '#263B5C',
          gold: '#FFD700',
          amber: '#D4AF37',
          goldlight: '#FFE247',
          text: '#F8FAFC',
          muted: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(255, 215, 0, 0.25)',
        'gold-sm': '0 0 10px rgba(255, 215, 0, 0.3)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    }
  },
  plugins: []
};
