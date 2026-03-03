import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Fairs from './pages/Fairs';
import Stores from './pages/Stores';
import Contactanos from './pages/Contactanos';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminFairs from './pages/AdminFairs';
import AdminStores from './pages/AdminStores';
import FairDetail from './pages/FairDetail';
import StoreDetail from './pages/StoreDetail';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/ferias" element={<Fairs />} />
          <Route path="/tiendas" element={<Stores />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/fairs" element={<AdminFairs />} />
          <Route path="/admin/stores" element={<AdminStores />} />
          <Route path="/feria/:id" element={<FairDetail />} />
          <Route path="/tienda/:id" element={<StoreDetail />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;