// src/components/Admin/EditProductModal.jsx
import React, { useState, useEffect } from 'react';

// Importa tu función de actualización
import { updateProduct } from '../../libs/axios/updateProduct';
// Asegúrate de tener tu instancia de axios configurada con interceptores para el token
// import instance from '../../libs/axios'; 

const EditProductModal = ({ product, onClose, onSaveSuccess }) => {
    // Estado local para los datos del formulario de edición
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        images: [], // Puede ser un array de strings (URLs) o File objects
        category_id: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Llenar el formulario con los datos del producto cuando se abre el modal
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                price: product.price ? parseFloat(product.price).toFixed(2) : '', // Asegúrate de que el precio sea numérico
                description: product.description || '',
                images: product.images || [], // Asume que images es un array de URLs
                category_id: product.category_id || '',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        // Aquí podrías manejar la subida de nuevas imágenes.
        // Por ahora, solo es un campo de texto si las imágenes son URLs.
        // Si necesitas subir archivos, la lógica será más compleja (FormData, etc.)
        const value = e.target.value;
        setFormData(prev => ({ ...prev, images: value.split(',').map(img => img.trim()) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Asegúrate de enviar los datos en el formato correcto que espera tu backend
            const payload = {
                name: formData.name,
                price: parseFloat(formData.price), // Convertir a número antes de enviar
                description: formData.description,
                images: formData.images,
                category_id: parseInt(formData.category_id), // Convertir a número entero
            };

            const { status } = await updateProduct(product.id, payload);

            if (status === 200) {
                alert('Producto actualizado con éxito!');
                onSaveSuccess(); // Llama al callback para que el padre recargue la lista
                onClose(); // Cierra el modal
            } else {
                setError(`Error al actualizar el producto. Código: ${status}`);
            }
        } catch (err) {
            console.error('Error al actualizar:', err);
            setError(err.response?.data?.message || 'Error al actualizar el producto.');
        } finally {
            setLoading(false);
        }
    };

    if (!product) return null; // No renderizar si no hay producto

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg mx-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Editar Producto: {product.name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            step="0.01" // Permite decimales para el precio
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-2">Imágenes (URLs separadas por comas):</label>
                        <input
                            type="text"
                            id="images"
                            name="images"
                            value={formData.images.join(', ')} // Muestra las URLs separadas por coma
                            onChange={handleImageChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="url1, url2, url3"
                        />
                        {/* Si tienes imágenes existentes, podrías mostrarlas aquí y permitir eliminarlas */}
                        {formData.images && formData.images.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {formData.images.map((img, index) => (
                                    <img key={index} src={img} alt={`Imagen ${index}`} className="h-20 w-20 object-cover rounded" />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category_id" className="block text-gray-700 text-sm font-bold mb-2">ID de Categoría:</label>
                        <input
                            type="number"
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;