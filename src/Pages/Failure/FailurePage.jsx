import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router';

// Este componente muestra la página de confirmación para pagos fallidos.
// Lee los parámetros de la URL para obtener los detalles de la transacción.
const FailurePage = () => {
    const location = useLocation();
    const [paymentDetails, setPaymentDetails] = useState(null);

    useEffect(() => {
        // La función que lee los parámetros de la URL
        const params = new URLSearchParams(location.search);
        const status = params.get('status');
        const paymentId = params.get('payment_id');
        const transactionId = params.get('collection_id'); // Mercado Pago usa 'collection_id' para la ID de transacción

        // Guardar los detalles en el estado del componente
        setPaymentDetails({
            status: status,
            paymentId: paymentId,
            transactionId: transactionId,
        });
    }, [location.search]); // Dependencia del efecto: se ejecuta cuando cambian los parámetros de la URL

    // Asegurar que paymentDetails no sea nulo antes de renderizar
    if (!paymentDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <p>Cargando información del pago...</p>
            </div>
        );
    }

    // Renderizar la interfaz de usuario con la información de pago
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105">
                <div className="text-center">
                    {/* Icono de error */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600">
                        <svg
                            className="h-10 w-10"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <h1 className="mt-6 text-3xl font-extrabold text-red-700">¡Pago Fallido!</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Hubo un problema procesando tu pago. Por favor, revisa tus datos o intenta con otro método de pago.
                    </p>
                </div>

                {/* Detalles de la transacción */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm font-medium">
                        <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg">
                            <dt className="text-gray-700">Estado:</dt>
                            <dd className="text-red-700 font-bold uppercase">{paymentDetails.status}</dd>
                        </div>
                        {paymentDetails.paymentId && (
                            <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg">
                                <dt className="text-gray-700">ID de Pago:</dt>
                                <dd className="text-gray-900 font-mono text-xs">{paymentDetails.paymentId}</dd>
                            </div>
                        )}
                        {paymentDetails.transactionId && (
                            <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg">
                                <dt className="text-gray-700">ID de Transacción:</dt>
                                <dd className="text-gray-900 font-mono text-xs">{paymentDetails.transactionId}</dd>
                            </div>
                        )}
                    </dl>
                </div>

                {/* Botón para volver a la página de inicio */}
                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="inline-block px-8 py-3 font-bold text-white bg-red-600 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FailurePage;
