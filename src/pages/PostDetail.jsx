import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Carousel from '../components/Carousel';
import WhatsAppButton from '../components/WhatsAppButton';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError('Publicación no encontrada o error al cargar');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-2xl text-gray-600">Cargando publicación...</div>;

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-2xl text-rey-red">
        <p>{error || 'Publicación no encontrada'}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-8 bg-rey-blue text-white px-10 py-4 rounded-xl hover:bg-blue-700 transition text-lg"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate('/')}
          className="mb-8 text-rey-blue hover:text-blue-700 flex items-center gap-2 text-lg font-medium"
        >
          ← Volver al inicio
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Carrusel grande y automático (más rápido) */}
            {post.imageUrls.length > 0 && (
              <Carousel images={post.imageUrls} interval={2500} />
            )}

            {/* Contenido del post - más de cerca */}
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-rey-dark mb-8 leading-tight">
                {post.title}
              </h1>

              <div className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-6">
                <p className="whitespace-pre-wrap">{post.content}</p>
              </div>

              <p className="mt-10 text-sm text-gray-500 italic">
                Publicado el {new Date(post.createdAt).toLocaleDateString('es-NI', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}