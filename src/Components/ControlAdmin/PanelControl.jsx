import React from 'react';

// Define las props que esperará este componente
export default function PanelControl({ onShowProducts, onAddProduct, onShowSales, onShowQuotes }) {
    return (
        <>
            <div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">Panel de Control</h1>
                </div>
                <div className="flex flex-col flex-wrap justify-center gap-4 p-4">
                    <button
                        className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition ease-in-out duration-150"
                        onClick={onShowProducts}
                    >
                        Mostrar Productos
                    </button>
                    <button
                        className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition ease-in-out duration-150"
                        onClick={onAddProduct}
                    >
                        Adicionar Producto
                    </button>
                    <button
                        className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition ease-in-out duration-150"
                        onClick={onShowSales}
                    >
                        Mostrar Ventas
                    </button>
                    <button
                        className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 transition ease-in-out duration-150"
                        onClick={onShowQuotes}
                    >
                        Mostrar Cotizaciones
                    </button>
                </div>
            </div>
        </>
    );
}