import { useState, useEffect } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';

// Lista de imágenes (usa rutas desde public/assets/ o importa si están en src/assets/)
const reyviImages = [
  'src/assets/reyvi-muneco.png',   // imagen principal
  'src/assets/logorv.png',         // logo o segunda
  'src/assets/tienda.png',         // imagen de tienda
  // Agrega aquí más rutas si tenés, ej: '/assets/reyvi-extra.png'
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (reyviImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reyviImages.length);
    }, 3000); // 3 segundos = más rápido

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rey-dark via-rey-dark to-rey-blue text-white pt-28 pb-20">
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Carrusel del reyvi - automático y responsivo */}
          <div className="relative w-full max-w-4xl mx-auto h-72 md:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl shadow-neon group">
            {reyviImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Reyvi Variedades ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                  idx === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
                onError={(e) => {
                  console.log('Error cargando imagen:', src);
                  e.target.src = 'https://via.placeholder.com/600x400?text=Imagen+no+encontrada';
                }}
              />
            ))}

            {/* Thumbnails sutiles abajo (sin cuadro negro) */}
            {reyviImages.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                {reyviImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-rey-gold scale-125 shadow-glow' : 'bg-white/70 hover:bg-white/90 hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Flechas solo al hover */}
            {reyviImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev === 0 ? reyviImages.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev === reyviImages.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Título y saludo */}
          <h1 className="mt-12 text-5xl md:text-7xl font-extrabold text-rey-gold glow-text">
            ¡Mi nombre es Reyvi Variedades Los Managuas!
          </h1>

          <p className="mt-8 text-2xl md:text-4xl max-w-4xl mx-auto leading-relaxed">
            Un placer saludarte 👑<br />
            Cualquier duda no dudes en contactarnos
          </p>

          {/* Botones principales */}
          <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center">
            <a
              href="/productos"
              className="bg-rey-gold hover:bg-yellow-400 text-rey-dark font-extrabold py-6 px-12 rounded-full text-2xl shadow-neon transition-all hover:scale-105"
            >
              Ver Productos
            </a>
            <a
              href="https://wa.me/50584099851?text=¡Hola!%20Vi%20tu%20catálogo%20Reyvi%20Variedades%20Los%20Managuas"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-extrabold py-6 px-12 rounded-full text-2xl shadow-neon transition-all hover:scale-105 flex items-center justify-center gap-4"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.35 14.65l-2.35-2.35-2.35 2.35-1.41-1.41 2.35-2.35-2.35-2.35 1.41-1.41 2.35 2.35 2.35-2.35 1.41 1.41-2.35 2.35 2.35 2.35-1.41 1.41z"/>
              </svg>
              Chatea ahora
            </a>
          </div>

          {/* Versículo */}
          <p className="mt-20 text-2xl italic opacity-90 glow-text">
            "Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces."<br />
            <span className="text-rey-gold font-bold">Jeremías 33:3</span>
          </p>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
}