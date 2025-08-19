import React from 'react';
import { Link } from 'react-router';
import { useCart } from '../../Components/General/CartContext';

export default function CartPage() {
    const {
        cartItems,
        cartTotalPrice,
        removeFromCart,
        incrementQuantity,
        decrementQuantity
    } = useCart();

    return (
        <div className="container mx-auto px-4 py-28">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Tu Carrito de Compras</h1>

            {cartItems.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 rounded-lg shadow-inner">
                    <p className="text-xl text-gray-600 mb-4">Tu carrito está vacío.</p>
                    <Link to="/products">
                        <button className="bg-[#431f0a] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#2e1507] transition-colors">
                            Ver Catálogo
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-16 w-16">
                                                    <img className="h-16 w-16 rounded-lg object-cover" src={item.images[0] || "/placeholder.svg"} alt={item.name} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => decrementQuantity(item.id)}
                                                    className="px-2 py-1 border rounded-md text-gray-600 hover:bg-gray-100"
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => incrementQuantity(item.id)}
                                                    className="px-2 py-1 border rounded-md text-gray-600 hover:bg-gray-100"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 border-t pt-8 flex justify-between items-center">
                        <div className="text-2xl font-bold text-gray-900">
                            Total: <span className="text-[#a40202]">${cartTotalPrice.toFixed(2)}</span>
                        </div>
                        <Link to="/checkout">
                            <button className="bg-[#a40202] text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-red-800 transition-colors">
                                Proceder al Pago
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}