import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

// Importa los íconos necesarios de lucide-react
import {
    Package,
    MapPin,
    Calendar,
    CheckCircle,
    ShoppingCart,
    CreditCard, // Se añade CreditCard
    ArrowRight // Se añade ArrowRight para el botón
} from 'lucide-react';


const SuccessPage = () => {
    // Estado para guardar la información de la URL
    const [paymentInfo, setPaymentInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Captura los parámetros de la URL enviados por Mercado Pago
        const urlParams = new URLSearchParams(window.location.search);

        // Crea un objeto con la información relevante
        const info = {
            payment_id: urlParams.get('payment_id'),
            status: urlParams.get('status'),
            collection_id: urlParams.get('collection_id'),
            preference_id: urlParams.get('preference_id')
        };

        setPaymentInfo(info);
        setLoading(false);

    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-xl text-gray-700">Cargando...</div>
            </div>
        );
    }

    // Aquí puedes agregar lógica para buscar la orden en tu base de datos
    // usando paymentInfo.payment_id para mostrar más detalles de la compra.
    // Esto es solo un ejemplo estático.

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
                <div className="p-8 sm:p-12">
                    <div className="flex flex-col items-center text-center">
                        <CheckCircle className="h-20 w-20 text-green-500 mb-6 animate-bounce" />
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
                            ¡Gracias por tu compra!
                        </h1>
                        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
                            Tu pedido ha sido procesado con éxito y está en camino. Hemos enviado una confirmación a tu correo electrónico.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-4">
                                <CreditCard className="text-3xl text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">ID de Transacción</p>
                                    <p className="text-lg font-semibold text-gray-900 break-words">{paymentInfo.payment_id || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Calendar className="text-3xl text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Fecha de Compra</p>
                                    <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Package className="text-3xl text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Estado</p>
                                    <p className="text-lg font-semibold text-green-600">{paymentInfo.status || 'Aprobado'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <ShoppingCart className="text-3xl text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total</p>
                                    {/* Aquí puedes mostrar el total real si lo capturas del backend o del localStorage */}
                                    <p className="text-lg font-semibold text-gray-900">$150.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#431f0a] hover:bg-[#a40202] transition-colors duration-300"
                        >
                            Volver al inicio <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
