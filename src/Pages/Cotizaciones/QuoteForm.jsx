import React, { useState } from 'react';

export default function QuoteForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        file: null, // Para almacenar el archivo subido
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

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            file: e.target.files[0], // Solo tomamos el primer archivo
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ submitted: true, success: false, message: 'Enviando cotización...' });

        console.log('Datos del formulario:', formData);

        // Simular una llamada a la API
        try {
            // const response = await fetch('/api/send-quote', {
            //   method: 'POST',
            //   body: JSON.stringify(formData), // Si no envías archivo, puedes usar JSON.stringify
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            // });

            // Si necesitas enviar archivos, usarías FormData:
            // const dataToSend = new FormData();
            // for (const key in formData) {
            //   dataToSend.append(key, formData[key]);
            // }
            // const response = await fetch('/api/send-quote', {
            //   method: 'POST',
            //   body: dataToSend,
            // });


            // Simulación de respuesta exitosa
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula un retraso de red
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
                file: null,
            });
            // Para limpiar visualmente el input de archivo
            if (document.getElementById('file-upload')) {
                document.getElementById('file-upload').value = '';
            }

        } catch (error) {
            console.error('Error al enviar la cotización:', error);
            setFormStatus({
                submitted: true,
                success: false,
                message: 'Hubo un error al enviar tu cotización. Por favor, inténtalo de nuevo.',
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

                    {/* Opción para subir archivo */}
                    <div>
                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                            Adjuntar Archivo (Opcional)
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4v-4m0 4h4m-4-4L28 28m4-4l-3.172-3.172a4 4 0 00-5.656 0L12 28m0 0l-4 4m4-4h4"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                    >
                                        <span>Sube un archivo</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                    </label>
                                    <p className="pl-1">o arrástralo y suéltalo aquí</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {formData.file ? formData.file.name : 'PNG, JPG, GIF hasta 10MB'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Botón de Enviar */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#431f0a] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                            disabled={formStatus.submitted && !formStatus.success} // Deshabilita si está enviando y aún no es exitoso
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