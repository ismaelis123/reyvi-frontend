export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/50584099851?text=¡Hola!%20Vi%20tu%20catálogo%20Reyvi%20Variedades"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 animate-pulse"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.35 14.65l-2.35-2.35-2.35 2.35-1.41-1.41 2.35-2.35-2.35-2.35 1.41-1.41 2.35 2.35 2.35-2.35 1.41 1.41-2.35 2.35 2.35 2.35-1.41 1.41z"/>
      </svg>
    </a>
  );
}