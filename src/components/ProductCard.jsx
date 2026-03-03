import { Link } from 'react-router-dom';

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      <Link to={`/producto/${product._id}`} className="block">
        <div className="relative">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.imageUrls.length > 1 && (
            <span className="absolute top-3 right-3 bg-rey-gold text-rey-dark text-xs font-bold px-3 py-1 rounded-full">
              +{product.imageUrls.length - 1}
            </span>
          )}
        </div>
      </Link>
      <div className="p-6">
        <Link to={`/producto/${product._id}`}>
          <h3 className="text-xl font-bold text-rey-dark mb-2 hover:text-rey-blue transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-rey-blue font-medium">
            {product.category?.name || 'Sin categoría'}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-rey-gold hover:bg-yellow-500 text-rey-dark font-bold py-2 px-6 rounded-full transition-transform hover:scale-105"
          >
            + Carrito
          </button>
        </div>
      </div>
    </div>
  );
}