import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '', // ID de categoría existente
    newCategoryName: '', // Nombre de nueva categoría (opcional)
    images: []
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

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
        toast.error('Error cargando datos');
      }
    };
    fetchData();
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
    setLoading(true);

    let categoryId = formData.category;

    // Si escribieron un nombre de nueva categoría, créala primero
    if (formData.newCategoryName.trim()) {
      try {
        const newCatRes = await api.post('/categories', {
          name: formData.newCategoryName.trim()
        });
        categoryId = newCatRes.data._id;
        // Actualiza la lista de categorías
        setCategories([...categories, newCatRes.data]);
        toast.success('Nueva categoría creada');
      } catch (err) {
        toast.error('Error creando categoría nueva');
        setLoading(false);
        return;
      }
    }

    // Si no hay categoría ni nueva ni seleccionada, error
    if (!categoryId) {
      toast.error('Selecciona o crea una categoría');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', categoryId);
    formData.images.forEach(file => data.append('images', file));

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, data);
        toast.success('Producto actualizado');
      } else {
        await api.post('/products', data);
        toast.success('Producto creado');
      }

      // Recargar productos
      const res = await api.get('/products');
      setProducts(res.data);
      resetForm();
    } catch (err) {
      toast.error('Error al guardar producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category._id,
      newCategoryName: '', // para edición no mostramos nueva
      images: []
    });
    setPreviewImages(product.imageUrls);
    setEditingId(product._id);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      newCategoryName: '',
      images: []
    });
    setPreviewImages([]);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success('Producto eliminado');
    } catch (err) {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-rey-dark text-center mb-12">
          Gestionar Productos
        </h1>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-rey-blue mb-8">
            {editingId ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nombre</label>
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
              <label className="block text-gray-700 font-medium mb-2">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rey-blue h-32"
              />
            </div>

            {/* Seleccionar categoría existente */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Categoría existente</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rey-blue"
                disabled={formData.newCategoryName.trim() !== ''} // desactiva si escriben nueva
              >
                <option value="">Selecciona una categoría</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* O crear nueva categoría */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                O crea una nueva categoría (opcional)
              </label>
              <input
                type="text"
                name="newCategoryName"
                value={formData.newCategoryName}
                onChange={handleChange}
                placeholder="Escribe el nombre de la nueva categoría"
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rey-blue"
              />
              {formData.newCategoryName.trim() && (
                <p className="mt-2 text-sm text-rey-blue">
                  Se creará automáticamente una nueva categoría llamada: <strong>{formData.newCategoryName.trim()}</strong>
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Imágenes (puedes subir varias)</label>
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
                    <div key={idx} className="relative">
                      <img
                        src={src}
                        alt={`Preview ${idx}`}
                        className="w-full h-24 object-cover rounded-lg shadow"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 bg-rey-blue hover:bg-blue-700 text-white font-bold py-4 rounded-full transition-all hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Guardando...' : (editingId ? 'Actualizar Producto' : 'Crear Producto')}
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

        {/* Lista de productos */}
        <h2 className="text-3xl font-bold text-rey-dark mb-8">Productos existentes</h2>
        {products.length === 0 ? (
          <p className="text-center text-xl text-gray-600">No hay productos aún</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => (
              <div key={p._id} className="bg-white rounded-xl shadow p-6">
                <img src={p.imageUrls[0]} alt={p.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-rey-dark">{p.name}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{p.description}</p>
                <p className="text-rey-blue mt-2">Categoría: {p.category?.name || 'Sin categoría'}</p>
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 bg-rey-gold hover:bg-yellow-500 text-rey-dark font-bold py-3 rounded-full transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}