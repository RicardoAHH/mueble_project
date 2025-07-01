import React, { useState } from 'react'; // Importa useState
import { deleteProduct } from '../../libs/axios/delete';
import EditProductModal from './EditProductModal';

const currencyFormatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
});

export default function ProductTable({ products, onProductDeleted }) {
    // Estado para controlar el modal de edición
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    // ... (Tu función handleDelete se mantiene igual)
    const handleDelete = async (productId, productName) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar el producto "${productName}" (ID: ${productId})? Esta acción es irreversible.`)) {
            try {
                const { status } = await deleteProduct(productId);

                if (status === 200 || status === 204) {
                    alert(`Producto "${productName}" (ID: ${productId}) eliminado con éxito.`);
                    if (onProductDeleted) {
                        onProductDeleted();
                    }
                    window.location.reload();
                } else {
                    alert(`Hubo un problema al eliminar el producto "${productName}". Código: ${status}`);
                }
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                if (error.response && error.response.data && error.response.data.message) {
                    alert(`Error: ${error.response.data.message}`);
                } else {
                    alert("No se pudo eliminar el producto. Inténtalo de nuevo más tarde.");
                }
            }
        }
    };

    // Nueva función para manejar el clic en "Editar"
    const handleEditClick = (product) => {
        setProductToEdit(product); // Guarda el producto a editar en el estado
        setIsEditModalOpen(true); // Abre el modal
    };

    // Función para cerrar el modal
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setProductToEdit(null); // Limpia el producto en edición
    };

    // Función que se llama cuando el modal de edición guarda exitosamente
    const handleEditSuccess = () => {
        // Después de guardar con éxito en el modal,
        // llamamos a onProductDeleted para que el padre recargue los datos
        if (onProductDeleted) {
            onProductDeleted();
        }
        // Y luego recargamos la página (si quieres mantener este comportamiento)
        window.location.reload();
    };


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
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Precio
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descripción
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Imágenes
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Categoría ID
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Creado
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.id}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                                {product.name}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                                {currencyFormatter.format(parseFloat(product.price))}
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-800 max-w-xs truncate" title={product.description}>
                                {product.description}
                            </td>
                            <td className=" whitespace-nowrap text-sm text-gray-800">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="h-[100px] object-cover"
                                        title={product.images.length > 1 ? `${product.images.length} imágenes` : '1 imagen'}
                                    />
                                ) : (
                                    <span className="text-gray-400">N/A</span>
                                )}
                            </td>
                            <td className=" py-4 whitespace-nowrap text-sm text-center text-gray-800">
                                {product.category_id}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                                {new Date(product.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                                {new Date(product.updated_at).toLocaleDateString()}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {/* Botón Editar: ahora es un <button> y llama a handleEditClick */}
                                <button
                                    onClick={() => handleEditClick(product)}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id, product.name)}
                                    className="text-red-600 hover:text-red-900 ml-2"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Renderiza el modal si isEditModalOpen es true */}
            {isEditModalOpen && (
                <EditProductModal
                    product={productToEdit}
                    onClose={handleCloseEditModal}
                    onSaveSuccess={handleEditSuccess}
                />
            )}
        </div>
    );
}