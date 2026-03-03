import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Intentando cargar productos y categorías...');
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);

        console.log('Productos recibidos:', prodRes.data);
        console.log('Categorías recibidas:', catRes.data);

        setProducts(prodRes.data || []);
        setCategories(catRes.data || []);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError(err.response?.data?.msg || 'No se pudieron cargar los productos. Intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
                          (p.description || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || (p.category?._id === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-rey-gray">
        Cargando productos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-rey-red">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
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
            className="flex-1 p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rey-blue text-lg shadow-sm bg-white text-gray-900"
          />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rey-blue bg-white text-lg shadow-sm text-gray-900"
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Mensaje si no hay productos */}
        {products.length === 0 ? (
          <p className="text-center text-xl text-gray-600 py-20">
            No hay productos disponibles aún. ¡Vuelve pronto!
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-xl text-gray-600 py-20">
            No se encontraron productos con "{search}"
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <WhatsAppButton />
    </div>
  );
}