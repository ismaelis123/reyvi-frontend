import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// Opción 1: usa public/assets/logorv.png
// Opción 2: importa si está en src/assets
// import logo from '../assets/logorv.png'; // descomenta si usas src/assets

export default function Header() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'text-rey-gold font-semibold' : 'hover:text-rey-gold transition-colors';

  const handleAdminClick = () => {
    toast('Login únicamente para administrador', {
      icon: '🔒',
      style: {
        borderRadius: '10px',
        background: '#002366',
        color: '#D4AF37',
        border: '1px solid #4169E1',
        fontSize: '1rem',
      },
    });
    navigate('/login');
  };

  return (
    <header className="bg-rey-dark/95 text-white shadow-md fixed w-full top-0 z-50 border-b border-rey-blue/20">
      <nav className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Logo + Nombre */}
        <Link to="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 md:h-12 md:w-12">
            <img 
              src="/assets/logorv.png" // o src={logo} si importaste
              alt="Reyvi Variedades Los Managuas" 
              className="h-full w-full object-contain rounded-full" 
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/48/D4AF37/002366?text=Reyvi';
              }}
            />
          </div>
          <span className="text-xl md:text-2xl font-semibold text-rey-gold">
            Reyvi Variedades Los Managuas
          </span>
        </Link>

        {/* Menú desktop */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center text-base">
          <Link to="/" className={isActive('/')}>Inicio</Link>
          <Link to="/productos" className={isActive('/productos')}>Productos</Link>
          <Link to="/ferias" className={isActive('/ferias')}>Ferias</Link>
          <Link to="/tiendas" className={isActive('/tiendas')}>Tiendas</Link>
          <Link to="/carrito" className={`relative ${isActive('/carrito')}`}>
            Carrito
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-rey-red text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {cart.length}
              </span>
            )}
          </Link>
          <Link to="/contactanos" className={isActive('/contactanos')}>Contáctanos</Link>
          <button 
            onClick={handleAdminClick}
            className="bg-rey-blue hover:bg-blue-700 px-5 py-2 rounded-lg transition text-base font-medium"
          >
            Logeo
          </button>
        </div>

        {/* Menú móvil */}
        <div className="md:hidden">
          <Menu as="div" className="relative">
            <Menu.Button className="text-white focus:outline-none p-1.5 rounded-lg hover:bg-rey-blue/20 transition">
              <Bars3Icon className="h-7 w-7" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-in"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right bg-rey-dark/95 backdrop-blur-lg divide-y divide-rey-blue/30 rounded-xl shadow-xl ring-1 ring-rey-blue/20 text-white text-base">
                <div className="px-2 py-2 space-y-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/" className={`${active ? 'bg-rey-blue/40' : ''} group flex w-full items-center rounded-lg px-5 py-3 text-left`}>
                        Inicio
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/productos" className={`${active ? 'bg-rey-blue/40' : ''} group flex w-full items-center rounded-lg px-5 py-3 text-left`}>
                        Productos
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/ferias" className={`${active ? 'bg-rey-blue/40' : ''} group flex w-full items-center rounded-lg px-5 py-3 text-left`}>
                        Ferias
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/tiendas" className={`${active ? 'bg-rey-blue/40' : ''} group flex w-full items-center rounded-lg px-5 py-3 text-left`}>
                        Tiendas
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-2 py-2 space-y-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/carrito" className={`${active ? 'bg-rey-blue/40' : ''} group flex w-full items-center rounded-lg px-5 py-3 text-left relative`}>
                        Carrito
                        {cart.length > 0 && (
                          <span className="ml-3 bg-rey-red text-white text-xs rounded-full px-2.5 py-0.5">
                            {cart.length}
                          </span>
                        )}
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/contactanos" className={`${active ? 'bg-rey-blue/40' : ''} group flex w-full items-center rounded-lg px-5 py-3 text-left`}>
                        Contáctanos
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleAdminClick}
                        className={`${active ? 'bg-rey-blue/40' : ''} group flex w-full items-center rounded-lg px-5 py-3 text-left `}
                      >
                        Logeo
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    </header>
  );
}