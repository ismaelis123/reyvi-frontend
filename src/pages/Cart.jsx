import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Cart() {
  const { cart, removeFromCart, contactWhatsApp } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-rey-dark mb-6">Tu carrito está vacío</h2>
          <a href="/productos" className="text-rey-blue hover:underline text-xl">
            Ver productos →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-rey-dark text-center mb-12">
          Tu Carrito ({totalItems} productos)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item._id} className="bg-white rounded-xl shadow p-6 flex gap-6 items-start">
                <img
                  src={item.imageUrls?.[0] || 'https://via.placeholder.com/128?text=Sin+Imagen'}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-rey-dark">{item.name}</h3>
                  <p className="text-gray-600 mt-2 line-clamp-3">{item.description || 'Sin descripción'}</p>
                  <p className="text-rey-blue font-medium mt-2">
                    Cantidad: {item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-4 text-red-600 hover:text-red-800 font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen y botón WhatsApp */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-rey-dark mb-6">Resumen</h3>
              <p className="text-xl mb-8">
                Total productos: <span className="font-bold">{totalItems}</span>
              </p>
              <button
                onClick={contactWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 px-8 rounded-full text-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.35 14.65l-2.35-2.35-2.35 2.35-1.41-1.41 2.35-2.35-2.35-2.35 1.41-1.41 2.35 2.35 2.35-2.35 1.41 1.41-2.35 2.35 2.35 2.35-1.41 1.41z"/>
                </svg>
                Pedir por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}