import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p._id === product._id);
      if (exists) {
        return prev.map(p =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p._id !== id));
  };

  const clearCart = () => setCart([]);

  const contactWhatsApp = () => {
    if (cart.length === 0) return alert('Carrito vacío');
    const items = cart.map(p => `- ${p.name} (x${p.quantity})`).join('\n');
    const text = `¡Hola Reyvi Variedades!\nQuiero estos productos:\n${items}`;
    window.open(`https://wa.me/50584099851?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, contactWhatsApp }}>
      {children}
    </CartContext.Provider>
  );
};