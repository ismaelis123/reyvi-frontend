import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';
import { CartContext } from '../context/CartContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || p.category?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-rey-dark text-center mb-12">
          Nuestro Catálogo
        </h1>

        {/* Búsqueda y filtro */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rey-blue text-lg shadow-sm"
          />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rey-blue bg-white text-lg shadow-sm"
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Grid de productos */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-xl text-gray-600 py-20">
            No se encontraron productos
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} addToCart={addToCart} />
            ))}
          </div>
        )}
      </div>

      <WhatsAppButton />
    </div>
  );
}