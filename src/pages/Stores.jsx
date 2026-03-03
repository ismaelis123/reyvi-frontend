import { useState, useEffect } from 'react';
import api from '../services/api';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get('/stores').then(res => setStores(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-rey-dark text-center mb-16">
          Nuestras Tiendas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {stores.map(store => (
            <div key={store._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative">
                <img
                  src={store.imageUrls[0]}
                  alt={store.name}
                  className="w-full h-64 object-cover"
                />
                {store.imageUrls.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {store.imageUrls.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-rey-gold' : 'bg-white bg-opacity-70'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-rey-dark mb-4">{store.name}</h3>
                <p className="text-gray-600 text-lg"><strong>Dirección:</strong> {store.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}