import WhatsAppButton from '../components/WhatsAppButton';

export default function Contactanos() {
  const handleWhatsApp = () => {
    const text = `¡Hola Reyvi Variedades! Quiero contactarme con ustedes...`;
    window.open(`https://wa.me/50584099851?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-rey-dark text-center mb-12">
          Contáctanos
        </h1>

        <div className="bg-white rounded-2xl shadow-2xl p-10 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-rey-blue mb-6">¿Cómo contactarnos?</h2>
              <p className="text-lg text-gray-700 mb-8">
                Estamos para ayudarte en lo que necesites. Puedes escribirnos directamente por WhatsApp o dejarnos tu mensaje.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <svg className="w-10 h-10 text-rey-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.35 14.65l-2.35-2.35-2.35 2.35-1.41-1.41 2.35-2.35-2.35-2.35 1.41-1.41 2.35 2.35 2.35-2.35 1.41 1.41-2.35 2.35 2.35 2.35-1.41 1.41z"/>
                  </svg>
                  <div>
                    <p className="font-bold">WhatsApp</p>
                    <a href="https://wa.me/50584099851" className="text-rey-blue hover:underline">+505 8409-9851</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-rey-blue mb-6">Envíanos un mensaje</h2>
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 px-8 rounded-full text-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.35 14.65l-2.35-2.35-2.35 2.35-1.41-1.41 2.35-2.35-2.35-2.35 1.41-1.41 2.35 2.35 2.35-2.35 1.41 1.41-2.35 2.35 2.35 2.35-1.41 1.41z"/>
                </svg>
                Abrir WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}