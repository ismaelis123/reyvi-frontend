import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Carousel from '../components/Carousel';
import WhatsAppButton from '../components/WhatsAppButton';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Buscando producto con ID:', id);
        const res = await api.get(`/products/${id}`);
        console.log('Producto recibido:', res.data);
        setProduct(res.data);
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError(err.response?.data?.msg || 'Producto no encontrado');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-2xl text-gray-600">Cargando producto...</div>;

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-2xl text-red-600">
        <p>{error || 'Producto no encontrado'}</p>
        <button
          onClick={() => navigate('/productos')}
          className="mt-6 bg-rey-blue text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate('/productos')}
          className="mb-8 text-rey-blue hover:text-blue-700 flex items-center gap-2"
        >
          ← Volver al catálogo
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Carrusel rápido */}
            <Carousel images={product.imageUrls || []} interval={3000} />

            {/* Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-rey-dark mb-6">
                {product.name}
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {product.description || 'Sin descripción disponible'}
              </p>
              <p className="text-2xl font-medium text-rey-blue mb-10">
                Categoría: {product.category?.name || 'Sin categoría'}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-rey-gold hover:bg-yellow-500 text-rey-dark font-bold py-5 px-10 rounded-xl text-xl transition-all hover:scale-105"
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