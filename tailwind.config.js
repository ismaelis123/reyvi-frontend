/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'rey-blue': '#4169E1',     // azul rey del logo
        'rey-dark': '#002366',     // fondo oscuro elegante
        'rey-gold': '#D4AF37',     // dorado brillante
        'rey-red': '#C8102E',      // rojo capa
        'rey-gray': '#e5e7eb',     // texto claro
      },
      boxShadow: {
        'soft': '0 4px 15px rgba(65, 105, 225, 0.25)',
        'glow': '0 0 15px rgba(212, 175, 55, 0.4)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}