/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'rey-blue': '#3b82f6',      // azul más vivo y gaming
        'rey-dark': '#0f172a',      // fondo oscuro profundo
        'rey-gold': '#fbbf24',      // dorado brillante
        'rey-red': '#ef4444',       // rojo intenso
        'rey-gray': '#e2e8f0',      // gris claro para textos
      },
      boxShadow: {
        'glow': '0 0 15px rgba(59, 130, 246, 0.5)',
      },
      animation: {
        'fade-slide': 'fadeSlide 3s infinite',
      },
      keyframes: {
        fadeSlide: {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
}