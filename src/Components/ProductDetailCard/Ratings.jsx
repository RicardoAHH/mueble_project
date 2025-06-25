import React, { useState } from 'react';

// Datos de ejemplo para los testimonios
const testimonials = [
    {
        id: 1,
        quote: "¡Absolutamente encantado con mi compra! El sofá es de una calidad excepcional y el servicio al cliente fue de primera. ¡Recomendado!",
        author: "Ana G.",
        rating: 5, // Puedes usar esto para mostrar estrellas, etc.
    },
    {
        id: 2,
        quote: "La mesa de centro superó mis expectativas. Llegó a tiempo y el montaje fue muy sencillo. Mi sala ahora luce mucho mejor.",
        author: "Carlos M.",
        rating: 4,
    },
    {
        id: 3,
        quote: "Buscaba algo único y lo encontré aquí. El sillón es comodísimo y el diseño es perfecto para mi espacio. ¡Volveré a comprar!",
        author: "Sofía R.",
        rating: 5,
    },
    {
        id: 4,
        quote: "Hubo un pequeño retraso en el envío, pero el equipo de soporte lo resolvió rápidamente. El producto final vale la pena.",
        author: "Javier P.",
        rating: 4,
    },
];

export default function CustomerOpinions() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Función para ir al siguiente testimonio
    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Función para ir al testimonio anterior
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className="bg-gray-300 py-3 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                    Lo que opinan nuestros clientes
                </h2>

                {/* Contenedor del carrusel */}
                <div className="relative overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="w-full flex-shrink-0">
                                <div className="bg-[#ebebf1] rounded-lg shadow-md p- md:p-4">
                                    <p className="text-lg text-gray-700 italic ">"{testimonial.quote}"</p>
                                    <p className="font-semibold text-blue-600">- {testimonial.author}</p>
                                    {/* Puedes añadir estrellas aquí según testimonial.rating */}
                                    <div className="flex justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controles de navegación del carrusel */}
                {testimonials.length > 1 && (
                    <div className="flex justify-center mt-3 space-x-4">
                        <button
                            onClick={goToPrevious}
                            className="p-3 rounded-full bg-[#431f0a] text-white hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                            aria-label="Testimonio anterior"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={goToNext}
                            className="p-3 rounded-full bg-[#431f0a] text-white hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                            aria-label="Siguiente testimonio"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}