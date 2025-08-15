import React from 'react'

export default function Contacts() {
    const contactInfo = {
        phone: '+52 55 3205 9945',
        email: 'tesla.asesorias.hxq@gmail.com',
        address: 'Av. México #87, Dos Rios, Huixquilucan, México',
        googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470.4904231650919!2d-99.3428100551266!3d19.372469799054933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d207b182c27c2b%3A0xca56e46de85e1295!2sTesla%20Asesor%C3%ADas!5e0!3m2!1ses!2smx!4v1752695247652!5m2!1ses!2smx' // ¡REEMPLAZA ESTA URL CON LA DE TU UBICACIÓN REAL!
    };
    return (
        <>
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-[#1d3660] mb-12">Contáctanos</h2>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                        {/* Columna de Información de Contacto */}
                        <div className="bg-white rounded-lg shadow-lg p-8 text-left h-full flex flex-col justify-center">
                            <h3 className="text-2xl font-semibold text-[#1d3660] mb-6">Ponte en Contacto con nosotros</h3>

                            <div className="mb-4">
                                <p className="text-gray-700 font-medium mb-1">Teléfono:</p>
                                <a
                                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                                    className="text-lg text-blue-600 hover:underline"
                                >
                                    {contactInfo.phone}
                                </a>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-700 font-medium mb-1">Correo Electrónico:</p>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="text-lg text-blue-600 hover:underline"
                                >
                                    {contactInfo.email}
                                </a>
                            </div>

                            <div>
                                <p className="text-gray-700 font-medium mb-1">Dirección:</p>
                                <p className="text-lg text-gray-800">{contactInfo.address}</p>
                                {/* Opcional: Botón para abrir en Google Maps */}
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center text-[#1d3660] hover:text-blue-700 font-semibold transition-colors duration-200"
                                >
                                    Ver en Google Maps
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                </a>
                            </div>
                        </div>

                        {/* Columna del Mapa de Google Maps */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[400px] w-full">
                            <iframe
                                src={contactInfo.googleMapsEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación de Asesorías Académicas"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
