import React, { useState } from 'react';
import { useCart } from '../../Components/General/CartContext';

// Íconos de PayPal y Mercado Pago
const PaypalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" className="h-6 w-auto mr-2"><path fill="#003087" d="M10.824 23.957a.382.382 0 0 1-.295-.164l-2.905-5.023a.473.473 0 0 1-.035-.121c-.046-.226.06-.475.295-.58l1.411-.531a.486.486 0 0 1 .58.295l2.766 5.013a.465.465 0 0 1-.031.479c-.218.232-.44.225-.916.035zM35.61 16.591a.916.916 0 0 0-.825-.662h-4.664c-1.396 0-2.422.846-3.166 1.905-1.285 1.815-2.029 3.829-2.029 5.833 0 .428.164.717.652.717.375 0 .58-.291.874-.485 1.096-.697 2.112-1.266 3.193-1.891a.576.576 0 0 0 .232-.676c-.035-.121-.295-.536-.714-.734-.236-.111-.531-.226-.846-.309-1.332-.34-2.812-.647-4.238-.802-.977-.119-1.954-.251-2.914-.401-.84-.131-1.687-.27-2.527-.424a.525.525 0 0 1-.366-.546c.105-.41.34-.842.697-1.189.921-1.077 2.174-1.916 3.754-2.316.517-.13.916-.145 1.25-.138 2.086 0 3.29.625 4.381 1.636 1.157 1.076 1.722 2.652 1.94 4.507.031.333.15.697.15.931 0 .226-.113.34-.337.34-.65 0-1.328-.518-2.029-1.036-.316-.217-.677-.42-1.058-.618a.332.332 0 0 0-.464.062c-.105.155-.309.431-.482.721-.351.583-.69.967-1.036 1.487z" />
    </svg>
);

const MercadoPagoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#009EE3" className="h-6 w-auto mr-2"><path d="M11.968 12.016L1.877 2.012A11.968 111.968 0 0 0 12.032 24c4.654 0 8.84-2.184 11.534-5.632l-1.428-1.543A9.976 9.976 0 0 1 12.022 22C6.54 22 1.886 17.514 1.886 12.012a9.976 9.976 0 0 1 11.66-9.155l-1.564 1.348zM12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0z" /></svg>
);

export default function CheckoutPage() {
    const { cartItems, cartTotalPrice } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    const handlePayment = async (paymentMethod) => {
        setError('');
        setLoading(true);

        // Validar campos obligatorios
        const requiredFields = ['name', 'email', 'address', 'city', 'zip', 'phone'];
        const isFormValid = requiredFields.every(field => formData[field].trim() !== '');

        if (!isFormValid) {
            setError('Por favor, completa todos los campos de envío.');
            setLoading(false);
            return;
        }

        try {
            // Llamada a la función serverless que creamos en Vercel
            const response = await fetch('/api/create-preference', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paymentMethod: paymentMethod, // ¡Asegúrate de enviar el método de pago!
                    cartItems: cartItems.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    })),
                    shippingInfo: formData
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al crear la orden de pago.');
            }

            const data = await response.json();

            // Redirigir al usuario a la pasarela de pago
            window.location.href = data.redirectUrl;

        } catch (err) {
            console.error('Error al procesar el pago:', err);
            setError('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-28">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Proceder al Pago</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de Envío</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {['name', 'email', 'address', 'city', 'zip', 'phone'].map(field => (
                                <div key={field}>
                                    <label className="block text-gray-700 font-semibold mb-2" htmlFor={field}>
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#431f0a]"
                                        type={field === 'email' ? 'email' : 'text'}
                                        id={field}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            ))}
                        </div>

                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm" role="alert">{error}</div>}

                        <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8">Elige tu Método de Pago</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <button
                                onClick={() => handlePayment('mercadopago')}
                                disabled={loading}
                                className="w-full flex items-center justify-center bg-[#009EE3] text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <MercadoPagoIcon />
                                {loading ? 'Cargando...' : 'Pagar con Mercado Pago'}
                            </button>
                            <button
                                onClick={() => handlePayment('paypal')}
                                disabled={loading}
                                className="w-full flex items-center justify-center bg-[#FFC439] text-gray-800 font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <PaypalIcon />
                                {loading ? 'Cargando...' : 'Pagar con PayPal'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen del Pedido</h2>
                        <div className="space-y-4 mb-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <img className="w-12 h-12 object-cover rounded-lg" src={item.images[0]} alt={item.name} />
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>Total:</span>
                                <span className="text-[#a40202]">${cartTotalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}