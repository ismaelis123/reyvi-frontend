import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import WhatsAppButton from '../components/WhatsAppButton';
import Carousel from '../components/Carousel';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/stores')
      .then(res => {
        setStores(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-2xl text-gray-600">Cargando tiendas...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-rey-dark text-center mb-16">
          Nuestras Tiendas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {stores.map(store => (
            <Link 
              key={store._id} 
              to={`/tienda/${store._id}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 block"
            >
              <Carousel images={store.imageUrls || []} interval={3000} />

              <div className="p-8">
                <h3 className="text-2xl font-bold text-rey-dark mb-4 hover:text-rey-blue transition">
                  {store.name}
                </h3>
                <p className="text-gray-600 text-lg"><strong>Dirección:</strong> {store.address}</p>
              </div>
            </Link>
          ))}
        </div>

        {stores.length === 0 && (
          <p className="text-center text-xl text-gray-600 py-20">No hay tiendas registradas aún</p>
        )}
      </div>

      <WhatsAppButton />
    </div>
  );
}