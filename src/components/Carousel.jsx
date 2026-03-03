import { useState, useEffect } from 'react';

export default function Carousel({ images, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, interval); // 3000ms = 3 segundos (rápido pero no mareante)

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-2xl shadow-glow group">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Imagen ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      ))}

      {/* Thumbnails abajo */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex ? 'bg-rey-gold scale-125 shadow-glow' : 'bg-white/60 hover:bg-white/90 hover:scale-110'
              }`}
            />
          ))}
        </div>
      )}

      {/* Flechas al hover */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
          >
            →
          </button>
        </>
      )}
    </div>
  );
}