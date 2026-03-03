import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/products'); // ruta protegida para verificar token
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-rey-dark text-center mb-16">
          Panel de Administración
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <h2 className="text-3xl font-bold text-rey-blue mb-4">Productos</h2>
            <p className="text-gray-600 mb-6">Sube, edita y elimina productos</p>
            <button
              onClick={() => navigate('/admin/products')}
              className="w-full bg-rey-blue text-white py-4 rounded-full hover:bg-blue-700 transition"
            >
              Gestionar Productos
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <h2 className="text-3xl font-bold text-rey-blue mb-4">Ferias</h2>
            <p className="text-gray-600 mb-6">Administra ferias y eventos</p>
            <button
              onClick={() => navigate('/admin/fairs')}
              className="w-full bg-rey-blue text-white py-4 rounded-full hover:bg-blue-700 transition"
            >
              Gestionar Ferias
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <h2 className="text-3xl font-bold text-rey-blue mb-4">Tiendas</h2>
            <p className="text-gray-600 mb-6">Administra tus tiendas físicas</p>
            <button
              onClick={() => navigate('/admin/stores')}
              className="w-full bg-rey-blue text-white py-4 rounded-full hover:bg-blue-700 transition"
            >
              Gestionar Tiendas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}