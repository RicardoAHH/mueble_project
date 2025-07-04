// src/Components/ControlAdmin/QuoteTable.jsx
import React from 'react';

// Recibimos una nueva prop: onMarkAsReviewed
export default function QuoteTable({ quotes, onMarkAsReviewed }) {
    if (!quotes || quotes.length === 0) {
        return (
            <div className="text-center p-4 text-gray-600">
                No hay cotizaciones para mostrar.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Teléfono
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mensaje
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {quotes.map((quote) => (
                        <tr key={quote.id || Math.random()}>
                            {/* Asegúrate de que no haya espacios o saltos de línea aquí.
                                Solo la etiqueta <td> inmediatamente después de <tr> */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {quote.id || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {quote.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {quote.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {quote.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 max-w-xs">
                                {quote.message}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {quote.created_at ? new Date(quote.created_at).toLocaleDateString() : 'Fecha no disponible'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${quote.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                                        quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {quote.status === 'pending' && (
                                    <button
                                        onClick={() => onMarkAsReviewed(quote.id)}
                                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 py-1 px-3 rounded-md transition duration-150 ease-in-out"
                                    >
                                        Marcar como Revisado
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}