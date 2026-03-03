import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';
import Carousel from '../components/Carousel';
import api from '../services/api';

// Imágenes principales del carrusel de inicio
const reyviImages = [
  '/assets/reyvi-muneco.png',
  '/assets/logorv.png',
  '/assets/tienda.png',
  // agrega más si tenés
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState([]);

  // Carrusel principal (rápido: 2.5 segundos)
  useEffect(() => {
    if (reyviImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % reyviImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Cargar publicaciones
  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Error cargando posts:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rey-dark via-rey-dark to-rey-blue text-white pt-28 pb-20">
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Carrusel principal grande */}
          <div className="relative w-full max-w-4xl mx-auto h-80 md:h-[650px] lg:h-[750px] overflow-hidden rounded-3xl shadow-neon group">
            {reyviImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Reyvi ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                  idx === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}

            {reyviImages.length > 1 && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                {reyviImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-rey-gold scale-125 shadow-glow' : 'bg-white/60 hover:bg-white/90 hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            )}

            {reyviImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentIndex(prev => prev === 0 ? reyviImages.length - 1 : prev - 1)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentIndex(prev => prev === reyviImages.length - 1 ? 0 : prev + 1)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
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
          <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
            <a
              href="/productos"
              className="bg-rey-gold hover:bg-yellow-400 text-rey-dark font-extrabold py-5 px-10 rounded-full text-xl shadow-neon transition-all hover:scale-105"
            >
              Ver Productos
            </a>
            <a
              href="https://wa.me/50584099851?text=¡Hola!%20Vi%20tu%20catálogo%20Reyvi%20Variedades%20Los%20Managuas"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-extrabold py-5 px-10 rounded-full text-xl shadow-neon transition-all hover:scale-105 flex items-center justify-center gap-3"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.35 14.65l-2.35-2.35-2.35 2.35-1.41-1.41 2.35-2.35-2.35-2.35 1.41-1.41 2.35 2.35 2.35-2.35 1.41 1.41-2.35 2.35 2.35 2.35-1.41 1.41z"/>
              </svg>
              Chatea ahora
            </a>
          </div>
        </div>
      </section>

      {/* Publicaciones justo debajo de los botones */}
      <section className="mt-16 pb-20 bg-rey-dark/40">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-rey-gold text-center mb-12">
            Novedades y Publicaciones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map(post => (
              <Link 
                key={post._id} 
                to={`/post/${post._id}`}
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-soft overflow-hidden hover:shadow-glow transition-all duration-300 block cursor-pointer"
              >
                {/* Carrusel más grande y rápido */}
                {post.imageUrls.length > 0 && (
                  <div className="relative h-72 md:h-96 lg:h-[420px] overflow-hidden">
                    <Carousel images={post.imageUrls} interval={2500} /> {/* 2.5 segundos */}
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 hover:text-rey-gold transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-lg mb-4 line-clamp-5">{post.content}</p>
                  <p className="text-sm text-gray-400 italic">
                    {new Date(post.createdAt).toLocaleDateString('es-NI', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-center text-xl text-gray-400 py-12">
              No hay publicaciones nuevas aún
            </p>
          )}
        </div>
      </section>

      {/* Versículo al final */}
      <p className="mt-16 text-2xl italic opacity-90 glow-text text-center pb-10">
        "Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces."<br />
        <span className="text-rey-gold font-bold">Jeremías 33:3</span>
      </p>

      <WhatsAppButton />
    </div>
  );
}