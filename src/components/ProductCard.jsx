import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Carousel from '../components/Carousel'; // asegúrate de tener este componente

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  // Si no hay imágenes, usa un placeholder
  const images = product.imageUrls?.length > 0 ? product.imageUrls : ['https://via.placeholder.com/400x300?text=Sin+Imagen'];

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/producto/${product._id}`}>
        <Carousel images={images} interval={3000} />
      </Link>
      <div className="p-6">
        <Link to={`/producto/${product._id}`}>
          <h3 className="text-xl font-bold text-rey-dark mb-2 hover:text-rey-blue transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {product.description || 'Sin descripción'}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-rey-blue font-medium">
            {product.category?.name || 'Sin categoría'}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-rey-gold hover:bg-yellow-500 text-rey-dark font-bold py-2 px-6 rounded-lg transition"
          >
            + Carrito
          </button>
        </div>
      </div>
    </div>
  );
}