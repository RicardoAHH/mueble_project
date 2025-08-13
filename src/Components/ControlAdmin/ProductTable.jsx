import React, { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import EditProductModal from './EditProductModal';

// Formateador de moneda para un formato consistente
const currencyFormatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
});

export default function ProductTable({ products, onProductDeleted }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    // Función para eliminar un producto
    const handleDelete = async (docId, productName, productId) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar el producto "${productName}" (ID: ${productId})? Esta acción es irreversible.`)) {
            try {
                const docRef = doc(db, 'products', docId);
                await deleteDoc(docRef);

                alert(`Producto "${productName}" (ID: ${productId}) eliminado con éxito.`);

                if (onProductDeleted) {
                    onProductDeleted();
                }
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                alert("No se pudo eliminar el producto. Inténtalo de nuevo más tarde.");
            }
        }
    };

    // Función para manejar la apertura del modal de edición
    const handleEditClick = (product) => {
        setProductToEdit(product);
        setIsEditModalOpen(true);
    };

    // Función para cerrar el modal de edición
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setProductToEdit(null);
    };

    // Si no hay productos, muestra un mensaje
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
                                {product.productId}
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
                                {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                                {product.updated_at ? new Date(product.updated_at).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => handleEditClick(product)}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id, product.name, product.productId)}
                                    className="text-red-600 hover:text-red-900 ml-2"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditModalOpen && (
                <EditProductModal
                    product={productToEdit}
                    onClose={handleCloseEditModal}
                    onSaveSuccess={onProductDeleted} // <-- CAMBIO CLAVE AQUÍ
                />
            )}
        </div>
    );
}