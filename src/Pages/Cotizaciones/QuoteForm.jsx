import React, { useState } from 'react';
import { sendQuote } from '../../libs/axios/quotes';
export default function QuoteForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        // file: null, // Si tu API de quotes NO maneja archivos directamente en el body, es mejor quitarlo o manejarlo por separado
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

    // Si tu API no soporta subir archivos con la misma ruta de quotes,
    // puedes eliminar handleFileChange y el input de tipo file.
    // Si sí lo soporta, necesitarás ajustar handleSubmit para usar FormData.
    /*
    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            file: e.target.files[0], // Solo tomamos el primer archivo
        }));
    };
    */

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ submitted: true, success: false, message: 'Enviando cotización...' });

        // Extrae los datos que coinciden con tu definición de QuoteCreate en Swagger
        // Tu Swagger QuoteCreate solo tiene 'name', 'email', 'phone', 'message'.
        const { name, email, phone, message } = formData;
        const dataToSend = { name, email, phone, message };

        try {
            const { data, status } = await sendQuote(dataToSend);

            if (status === 201) { // 201 Created es el código esperado para una creación exitosa
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
                    // file: null, // Si mantuviste el campo file, límpialo también aquí
                });
                // Para limpiar visualmente el input de archivo (si lo mantuviste)
                // if (document.getElementById('file-upload')) {
                //     document.getElementById('file-upload').value = '';
                // }
            } else {
                // Manejar otros códigos de estado exitosos pero no 201 si fuera el caso
                setFormStatus({
                    submitted: true,
                    success: false,
                    message: `Error inesperado (${status}). Por favor, inténtalo de nuevo.`,
                });
            }

        } catch (error) {
            console.error('Error al enviar la cotización:', error);

            let errorMessage = 'Hubo un error al enviar tu cotización. Por favor, inténtalo de nuevo.';

            // Si es un error de Axios y viene con una respuesta del servidor
            if (error.response) {
                // Accede al mensaje de error del backend si existe
                errorMessage = error.response.data.message || error.response.data.error || errorMessage;
                console.error('Detalles del error del servidor:', error.response.data);
                console.error('Código de estado del error:', error.response.status);
            } else if (error.request) {
                // La solicitud fue hecha pero no hubo respuesta
                errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión.';
            } else {
                // Algo más causó el error
                errorMessage = error.message || errorMessage;
            }

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

                    {/* Si necesitas un campo de archivo y tu API lo soporta así, descomenta y ajusta: */}
                    {/*
                    <div>
                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                            Adjuntar archivo (opcional)
                        </label>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        />
                        <p className="mt-1 text-xs text-gray-500">PDF, JPG, PNG, DOC (max. 5MB)</p>
                    </div>
                    */}

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