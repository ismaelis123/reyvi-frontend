import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import WhatsAppButton from '../components/WhatsAppButton';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-2xl">Cargando...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-2xl text-red-600">Producto no encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Carrusel de imágenes */}
            <div className="relative">
              <img
                src={product.imageUrls[currentImage]}
                alt={product.name}
                className="w-full h-96 md:h-[600px] object-cover"
              />
              {product.imageUrls.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage(prev => (prev === 0 ? product.imageUrls.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentImage(prev => (prev === product.imageUrls.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
                  >
                    →
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                    {product.imageUrls.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-3 h-3 rounded-full ${idx === currentImage ? 'bg-rey-gold' : 'bg-white bg-opacity-70'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Info */}
            <div className="p-10 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-rey-dark mb-6">{product.name}</h1>
              <p className="text-xl text-gray-700 mb-8">{product.description}</p>
              <p className="text-2xl font-medium text-rey-blue mb-10">
                Categoría: {product.category?.name || 'Sin categoría'}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-rey-gold hover:bg-yellow-500 text-rey-dark font-bold py-5 px-10 rounded-full text-xl shadow-lg transition-all hover:scale-105"
              >
                + Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}