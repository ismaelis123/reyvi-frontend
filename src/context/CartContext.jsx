import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito (si ya existe, aumenta cantidad)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item._id === product._id);
      if (exists) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Limpiar todo el carrito (opcional, si querés un botón de vaciar)
  const clearCart = () => {
    setCart([]);
  };

  // Enviar mensaje por WhatsApp con lista + imágenes
  const contactWhatsApp = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    let message = '¡Hola Reyvi Variedades Los Managuas! 👑\n\nQuiero pedir estos productos:\n\n';

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (x${item.quantity})\n`;
      if (item.imageUrls && item.imageUrls.length > 0) {
        message += `Imagen: ${item.imageUrls[0]}\n`; // primera imagen (Cloudinary)
      }
      message += '------------------------\n';
    });

    message += `\nTotal de productos: ${cart.reduce((sum, item) => sum + item.quantity, 0)}\n`;
    message += 'Gracias por tu atención, quedo atento! 😊';

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/50584099851?text=${encodedMessage}`, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        contactWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};