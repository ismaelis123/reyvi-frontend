import { useState, useEffect } from 'react';

export default function Carousel({ images, autoPlay = true, interval = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || isPaused || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, images.length, interval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // pausa autoplay 10s después de clic
  };

  return (
    <div 
      className="relative w-full h-64 md:h-96 overflow-hidden rounded-2xl shadow-xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Imagen principal */}
      <img
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 bg-black bg-opacity-40 py-2 px-4 rounded-full">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-4 h-4 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-rey-gold scale-125 shadow-lg'
                  : 'bg-white bg-opacity-70 hover:bg-opacity-90 hover:scale-110'
              }`}
            />
          ))}
        </div>
      )}

      {/* Flechas */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => goToSlide(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition opacity-0 group-hover:opacity-100"
          >
            ←
          </button>
          <button
            onClick={() => goToSlide(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition opacity-0 group-hover:opacity-100"
          >
            →
          </button>
        </>
      )}
    </div>
  );
}