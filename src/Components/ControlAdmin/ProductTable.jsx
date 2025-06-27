const currencyFormatter = new Intl.NumberFormat('es-MX', { // 'es-MX' para México
    style: 'currency',
    currency: 'MXN', // MXN para Pesos Mexicanos
    minimumFractionDigits: 2,
});
export default function ProductTable({ products }) {
    if (!products || products.length === 0) {
        return (
            <div className="text-center p-6 bg-white rounded-lg shadow-md mt-6">
                <p className="text-gray-600 text-lg">No hay productos para mostrar.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4 mt-6">
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
                            Precio
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descripción
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Imágenes
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Categoría ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Creado
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actualizado
                        </th>

                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Acciones</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {product.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {currencyFormatter.format(parseFloat(product.price))}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate" title={product.description}>
                                {product.description}
                            </td>
                            <td className=" whitespace-nowrap text-sm text-gray-800">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]} // Muestra la primera imagen
                                        alt={product.name}
                                        className=" rounded-full object-cover"
                                        title={product.images.length > 1 ? `${product.images.length} imágenes` : '1 imagen'}
                                    />
                                ) : (
                                    <span className="text-gray-400">N/A</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {product.category_id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {new Date(product.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {new Date(product.updated_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {/* Botones de acción, e.g., Editar y Eliminar */}
                                <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">
                                    Editar
                                </a>
                                <a href="#" className="text-red-600 hover:text-red-900">
                                    Eliminar
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}