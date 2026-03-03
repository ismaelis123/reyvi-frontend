import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('¡Bienvenido al panel admin!');
      navigate('/admin');
    } catch (err) {
      toast.error('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-24">
      <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-rey-dark text-center mb-10">
          Panel Admin
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rey-blue"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rey-blue"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rey-blue hover:bg-blue-700 text-white font-bold py-4 rounded-full transition-all hover:scale-105"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}