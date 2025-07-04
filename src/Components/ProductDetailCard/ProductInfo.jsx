import React, { useState } from 'react'; // Necesitarás useState para la selección de acabado y cantidad, si los haces interactivos

export default function ProductInfo() {
    // Puedes usar estados para manejar la selección de acabado y la cantidad si estos son interactivos
    const [selectedFinish, setSelectedFinish] = useState('Acabado Predeterminado');
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="product-info-container  w-[100%] bg-white p-6 md:p-8 rounded-lg shadow-xl  mx-auto">
            {/* Sección de Categoría y Nombre del Producto */}
            <div className="mb-6">
                <h1 className="text-sm font-semibold text-[#a40202] uppercase tracking-wide mb-1">
                    Categoría
                </h1>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                    Nombre del Producto
                </h2>
            </div>

            {/* Descripción del Producto */}
            <div className="mb-6">
                <p className="text-gray-700 leading-relaxed text-base">
                    Descripcion del producto, tipo de mueble, de que materiales esta hecho y si es de alguna tendencia, que caracteristicas tiene, etc.
                </p>
            </div>

            {/* Medidas, Peso y Materiales */}
            <div className="mb-6 border-t border-b border-gray-200 py-4">
                <p className="text-gray-600 text-sm mb-2">
                    <strong className="font-semibold text-gray-800">Dimensiones:</strong> 150cm (L) x 80cm (An) x 75cm (Al)
                </p>
                <p className="text-gray-600 text-sm mb-2">
                    <strong className="font-semibold text-gray-800">Peso:</strong> 25 kg
                </p>
                <p className="text-gray-600 text-sm">
                    <strong className="font-semibold text-gray-800">Materiales:</strong> Madera de roble macizo, tapizado de lino.
                </p>
            </div>
            <div className='flex max-lg:flex-col justify-around'>
                {/* Precio */}
                <div className="flex items-baseline justify-center mb-6">
                    <span className="text-4xl font-extrabold text-[#a40202]">
                        $1,299.00
                    </span>
                    {/* Aquí puedes añadir, por ejemplo, un precio anterior tachado o un descuento */}
                    {/* <span className="text-lg text-gray-500 line-through ml-4">$1,500.00</span> */}
                </div>

                {/* Selección de Acabado */}
                <div className="mb-6 flex flex-col justify-center items-center">
                    <p className="text-lg font-medium text-gray-800 mb-2">Selección de Acabado:</p>
                    <div className="flex gap-3">
                        {/* Aquí podrías mapear las opciones de acabado */}
                        <button
                            onClick={() => setSelectedFinish('Natural')}
                            className={`px-4 py-2 rounded-lg border-2 ${selectedFinish === 'Natural' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'} text-gray-700 text-sm font-medium transition duration-200`}
                        >
                            Acabado 1
                        </button>
                        <button
                            onClick={() => setSelectedFinish('Oscuro')}
                            className={`px-4 py-2 rounded-lg border-2 ${selectedFinish === 'Oscuro' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'} text-gray-700 text-sm font-medium transition duration-200`}
                        >
                            Acabado 2
                        </button>
                        <button
                            onClick={() => setSelectedFinish('Oscuro')}
                            className={`px-4 py-2 rounded-lg border-2 ${selectedFinish === 'Oscuro' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'} text-gray-700 text-sm font-medium transition duration-200`}
                        >
                            Acabado 3
                        </button>
                        {/* ... más opciones */}
                    </div >
                </div >
            </div >


            {/* Cantidad y Botón de Añadir al Carrito */}
            < div className="flex flex-col sm:flex-row items-center gap-4 mb-6" >
                <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <label htmlFor="quantity" className="sr-only">Cantidad</label>
                    <button
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md"
                        aria-label="Disminuir cantidad"
                    >
                        -
                    </button>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center border-x border-gray-300 text-lg font-semibold text-gray-800 focus:outline-none"
                        min="1"
                        readOnly
                    />
                    <button
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md"
                        aria-label="Aumentar cantidad"
                    >
                        +
                    </button>
                </div>

                <button className="flex-1 bg-[#431f0a] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto">
                    Agregar al Carrito
                </button>
            </div >

            {/* Información de Envío */}
            < div className="border-t border-gray-200 pt-6 mt-6" >
                <p className="text-lg font-medium text-gray-800 mb-2">Información de Envío:</p>

            </div >
        </div >
    );
}