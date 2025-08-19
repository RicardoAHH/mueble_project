import React from 'react';
import { useCart } from '../../Components/General/CartContext';

export default function CheckoutPage() {
    const { cartItems, cartTotalPrice } = useCart();

    // Esta función manejará la lógica del envío del formulario de pago
    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí iría la lógica para procesar el pago.
        // Podrías integrar una pasarela de pago como Stripe o PayPal.
        alert('¡Gracias por tu compra! Tu pedido ha sido procesado.');
    };

    return (
        <div className="container mx-auto px-4 py-28">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Proceder al Pago</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna de Detalles de Envío y Pago */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de Envío</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Nombre Completo</label>
                                <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#431f0a]" type="text" id="name" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Correo Electrónico</label>
                                <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#431f0a]" type="email" id="email" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">Dirección</label>
                                <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#431f0a]" type="text" id="address" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="city">Ciudad</label>
                                <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#431f0a]" type="text" id="city" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="zip">Código Postal</label>
                                <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#431f0a]" type="text" id="zip" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">Número de Teléfono</label>
                                <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#431f0a]" type="tel" id="phone" required />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8">Método de Pago</h2>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="card-number">Número de Tarjeta</label>
                            <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#431f0a]" type="text" id="card-number" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="expiry-date">Fecha de Vencimiento (MM/AA)</label>
                                <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#431f0a]" type="text" id="expiry-date" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="cvc">CVC</label>
                                <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#431f0a]" type="text" id="cvc" required />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-[#a40202] text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-red-800 transition-colors">
                            Pagar ${cartTotalPrice.toFixed(2)}
                        </button>
                    </form>
                </div>

                {/* Columna de Resumen del Pedido */}
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