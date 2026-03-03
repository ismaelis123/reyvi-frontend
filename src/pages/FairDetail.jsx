import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Carousel from '../components/Carousel';
import WhatsAppButton from '../components/WhatsAppButton';

export default function FairDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fair, setFair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFair = async () => {
      try {
        const res = await api.get(`/fairs/${id}`);
        setFair(res.data);
      } catch (err) {
        setError('Feria no encontrada o error al cargar');
      } finally {
        setLoading(false);
      }
    };
    fetchFair();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-2xl">Cargando feria...</div>;
  if (error || !fair) return <div className="min-h-screen flex flex-col items-center justify-center text-2xl text-red-600">{error || 'Feria no encontrada'}</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate('/ferias')}
          className="mb-8 text-rey-blue hover:text-blue-700 flex items-center gap-2 text-lg"
        >
          ← Volver a Ferias
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Carrusel grande y automático */}
            <Carousel images={fair.imageUrls || []} interval={3000} />

            {/* Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-rey-dark mb-6">
                {fair.name}
              </h1>
              <div className="space-y-4 text-lg text-gray-700">
                <p><strong>Lugar:</strong> {fair.location}</p>
                <p><strong>Fecha:</strong> {new Date(fair.date).toLocaleDateString('es-NI', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="mt-6">{fair.description || 'Sin descripción disponible'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}