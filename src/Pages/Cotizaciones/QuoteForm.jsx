import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Importaciones de Firebase
import { db } from '../../../firebase'; // Asegúrate de que la ruta a tu configuración de Firebase sea correcta

export default function QuoteForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ submitted: true, success: false, message: 'Enviando cotización...' });

        try {
            // Extrae los datos del formulario
            const { name, email, phone, message } = formData;

            // Crea un objeto con los datos a guardar en Firestore
            const quoteData = {
                name,
                email,
                phone,
                message,
                status: 'pendiente', // Asignamos un estado inicial
                createdAt: serverTimestamp(), // Firestore maneja el timestamp automáticamente
            };

            // Referencia a la colección 'quotes'
            const quotesCollectionRef = collection(db, 'quotes');

            // Agrega el nuevo documento a la colección
            await addDoc(quotesCollectionRef, quoteData);

            setFormStatus({
                submitted: true,
                success: true,
                message: '¡Cotización enviada con éxito! Nos pondremos en contacto pronto.',
            });
            setFormData({ // Limpia el formulario después del éxito
                name: '',
                phone: '',
                email: '',
                message: '',
            });

        } catch (error) {
            console.error('Error al enviar la cotización:', error);
            const errorMessage = 'Hubo un error al enviar tu cotización. Por favor, inténtalo de nuevo.';
            setFormStatus({
                submitted: true,
                success: false,
                message: errorMessage,
            });
        }
    };

    return (
        <section className=" py-12 px-4 sm:px-6 lg:px-8 pt-20 bg-black">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
                    Solicita tu Cotización
                </h2>
                <p className="text-gray-600 text-center mb-8">
                    Envíanos tus requerimientos y te contactaremos para ofrecerte la mejor solución.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Ej: Juan Pérez"
                        />
                    </div>

                    {/* Campo Teléfono */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Ej: +52 55 1234 5678"
                        />
                    </div>

                    {/* Campo Correo Electrónico */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Ej: tu.correo@ejemplo.com"
                        />
                    </div>

                    {/* Campo Mensaje */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Mensaje / Descripción de la Cotización
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y"
                            placeholder="Describe detalladamente lo que necesitas cotizar..."
                        ></textarea>
                    </div>

                    {/* Botón de Enviar */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#431f0a] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                            disabled={formStatus.submitted && !formStatus.success}
                        >
                            {formStatus.submitted && !formStatus.success ? 'Enviando...' : 'Solicitar Cotización'}
                        </button>
                    </div>

                    {/* Mensaje de estado del formulario */}
                    {formStatus.submitted && (
                        <div
                            className={`mt-4 p-3 rounded-md text-center ${formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}
                        >
                            {formStatus.message}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}