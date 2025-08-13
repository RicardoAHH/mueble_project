import React, { useState, useEffect } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';

const EditProductModal = ({ product, onClose, onSaveSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        images: '',
        category_id: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                price: product.price ? parseFloat(product.price).toFixed(2) : '',
                description: product.description || '',
                images: product.images ? product.images.join(', ') : '',
                category_id: product.category_id || '',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, images: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                name: formData.name,
                price: parseFloat(formData.price),
                description: formData.description,
                images: formData.images.split(',').map(img => img.trim()).filter(url => url !== ''),
                category_id: parseInt(formData.category_id),
                updated_at: serverTimestamp(),
            };

            const productDocRef = doc(db, 'products', product.id);
            await updateDoc(productDocRef, payload);

            alert('Producto actualizado con éxito!');

            // <-- CAMBIO CLAVE AQUÍ: Llama a la función solo si es válida
            if (typeof onSaveSuccess === 'function') {
                onSaveSuccess();
            }

            onClose();

        } catch (err) {
            console.error('Error al actualizar:', err);
            setError('Error al actualizar el producto. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (!product) return null;

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
                            step="0.01"
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
                            value={formData.images}
                            onChange={handleImageChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="url1, url2, url3"
                        />
                        {formData.images && formData.images.split(',').filter(url => url.trim() !== '').length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {formData.images.split(',').map((img, index) => (
                                    <img key={index} src={img.trim()} alt={`Imagen ${index}`} className="h-20 w-20 object-cover rounded" />
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