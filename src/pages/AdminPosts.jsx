import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    api.get('/posts').then(res => setPosts(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    formData.images.forEach(file => data.append('images', file));

    try {
      await api.post('/posts', data);
      toast.success('Publicación creada');
      const res = await api.get('/posts');
      setPosts(res.data);
      setFormData({ title: '', content: '', images: [] });
      setPreviewImages([]);
    } catch (err) {
      toast.error('Error al crear publicación');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-rey-dark text-center mb-12">
          Gestionar Publicaciones
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-rey-blue mb-8">Nueva Publicación</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Título</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rey-blue"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Contenido</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rey-blue h-40"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Imágenes (opcional)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-4 border rounded-lg"
              />
              {previewImages.length > 0 && (
                <div className="mt-6 grid grid-cols-3 md:grid-cols-5 gap-4">
                  {previewImages.map((src, idx) => (
                    <img key={idx} src={src} alt="Preview" className="w-full h-24 object-cover rounded-lg shadow" />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-rey-blue hover:bg-blue-700 text-white font-bold py-4 rounded-full transition-all"
            >
              Crear Publicación
            </button>
          </form>
        </div>

        <h2 className="text-3xl font-bold text-rey-dark mb-8">Publicaciones existentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post._id} className="bg-white rounded-xl shadow p-6">
              {post.imageUrls[0] && (
                <img src={post.imageUrls[0]} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              )}
              <h3 className="text-xl font-bold text-rey-dark">{post.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}