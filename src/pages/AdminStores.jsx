import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    images: []
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    api.get('/stores').then(res => setStores(res.data));
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
    data.append('name', formData.name);
    data.append('address', formData.address);
    formData.images.forEach(file => data.append('images', file));

    try {
      if (editingId) {
        await api.put(`/stores/${editingId}`, data);
        toast.success('Tienda actualizada');
      } else {
        await api.post('/stores', data);
        toast.success('Tienda creada');
      }
      const res = await api.get('/stores');
      setStores(res.data);
      resetForm();
    } catch (err) {
      toast.error('Error al guardar tienda');
    }
  };

  const handleEdit = (store) => {
    setFormData({
      name: store.name,
      address: store.address,
      images: []
    });
    setPreviewImages(store.imageUrls);
    setEditingId(store._id);
  };

  const resetForm = () => {
    setFormData({ name: '', address: '', images: [] });
    setPreviewImages([]);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar esta tienda?')) return;
    try {
      await api.delete(`/stores/${id}`);
      setStores(prev => prev.filter(s => s._id !== id));
      toast.success('Tienda eliminada');
    } catch (err) {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-rey-dark text-center mb-12">
          Gestionar Tiendas
        </h1>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-rey-blue mb-8">
            {editingId ? 'Editar Tienda' : 'Nueva Tienda'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nombre de la tienda</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rey-blue"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Dirección</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rey-blue"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Imágenes (múltiples)</label>
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
                    <img
                      key={idx}
                      src={src}
                      alt={`Preview ${idx}`}
                      className="w-full h-24 object-cover rounded-lg shadow"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-rey-blue hover:bg-blue-700 text-white font-bold py-4 rounded-full transition-all hover:scale-105"
              >
                {editingId ? 'Actualizar Tienda' : 'Crear Tienda'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 rounded-full transition-all"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista */}
        <h2 className="text-3xl font-bold text-rey-dark mb-8">Tiendas existentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map(s => (
            <div key={s._id} className="bg-white rounded-xl shadow p-6">
              <img src={s.imageUrls[0]} alt={s.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold text-rey-dark">{s.name}</h3>
              <p className="text-gray-600 mt-2">{s.address}</p>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => handleEdit(s)}
                  className="flex-1 bg-rey-gold hover:bg-yellow-500 text-rey-dark font-bold py-3 rounded-full transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}