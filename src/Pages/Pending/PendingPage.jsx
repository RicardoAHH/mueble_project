import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router';

// Este componente maneja la página de pagos pendientes.
// Es crucial para informar al usuario que su pago está siendo procesado
// y que la confirmación final llegará más tarde.
const PendingPage = () => {
    const location = useLocation();
    const [paymentDetails, setPaymentDetails] = useState(null);

    useEffect(() => {
        // Lee los parámetros de la URL para obtener la información de la transacción
        const params = new URLSearchParams(location.search);
        const status = params.get('status');
        const paymentId = params.get('payment_id');
        const transactionId = params.get('collection_id');

        // Guarda los detalles en el estado del componente
        setPaymentDetails({
            status: status,
            paymentId: paymentId,
            transactionId: transactionId,
        });
    }, [location.search]);

    // Si los detalles no se han cargado aún, muestra un mensaje de carga.
    if (!paymentDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <p>Cargando información del pago...</p>
            </div>
        );
    }

    // Renderiza la interfaz de usuario para el estado "pendiente"
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105">
                <div className="text-center">
                    {/* Icono de reloj de arena o pendiente */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-600 animate-pulse">
                        <svg
                            className="h-10 w-10"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h1 className="mt-6 text-3xl font-extrabold text-yellow-700">¡Pago Pendiente!</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Tu pago está siendo procesado. Recibirás una confirmación por correo electrónico en breve.
                    </p>
                </div>

                {/* Detalles de la transacción */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm font-medium">
                        <div className="flex justify-between items-center bg-yellow-50 p-3 rounded-lg">
                            <dt className="text-gray-700">Estado:</dt>
                            <dd className="text-yellow-700 font-bold uppercase">{paymentDetails.status}</dd>
                        </div>
                        {paymentDetails.paymentId && (
                            <div className="flex justify-between items-center bg-yellow-50 p-3 rounded-lg">
                                <dt className="text-gray-700">ID de Pago:</dt>
                                <dd className="text-gray-900 font-mono text-xs">{paymentDetails.paymentId}</dd>
                            </div>
                        )}
                        {paymentDetails.transactionId && (
                            <div className="flex justify-between items-center bg-yellow-50 p-3 rounded-lg">
                                <dt className="text-gray-700">ID de Transacción:</dt>
                                <dd className="text-gray-900 font-mono text-xs">{paymentDetails.transactionId}</dd>
                            </div>
                        )}
                    </dl>
                </div>

                {/* Botón para volver al inicio */}
                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="inline-block px-8 py-3 font-bold text-white bg-yellow-600 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PendingPage;
