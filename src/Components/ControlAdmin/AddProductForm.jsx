import React, { useState } from 'react';
import axios from 'axios';

export default function AddProductForm() {
    // Definir los estados iniciales del formulario
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category_id: '',
    });
    // Cambiamos 'images' de un string a un array de strings, inicializándolo con un campo vacío
    const [imageUrls, setImageUrls] = useState(['']); // Array para manejar múltiples URLs

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:3000/api/v1/products';

    // Manejador de cambios para los inputs generales del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    // Manejador de cambios para los inputs de URL de imagen
    const handleImageUrlChange = (index, value) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    // Función para agregar un nuevo campo de URL de imagen
    const addImageUrlInput = () => {
        setImageUrls([...imageUrls, '']); // Agrega un nuevo campo vacío al final
    };

    // Función para eliminar un campo de URL de imagen
    const removeImageUrlInput = (index) => {
        const newImageUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newImageUrls);
    };

    // Manejador de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage('');
        setError(null);

        try {
            // Filtrar URLs vacías antes de enviar
            const validImageUrls = imageUrls.filter(url => url.trim() !== '');

            const dataToSend = {
                name: product.name,
                price: parseFloat(product.price),
                description: product.description,
                images: validImageUrls, // Ya es un array de URLs limpias
                category_id: parseInt(product.category_id, 10),
            };

            const token = localStorage.getItem('authToken');

            if (!token) {
                throw new Error("No se encontró un token de autenticación. Por favor, inicia sesión.");
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            };

            const response = await axios.post(API_URL, dataToSend, { headers });

            setMessage(`Producto "${product.name}" agregado con éxito! ID: ${product.id}`);
            // Limpiar el formulario
            setProduct({
                name: '',
                price: '',
                description: '',
                category_id: '',
            });
            setImageUrls(['']); // Reiniciar las URLs a un solo campo vacío

        } catch (err) {
            console.error("Error al agregar el producto:", err);
            if (err.response) {
                setError(`Error del servidor: ${err.response.status} - ${err.response.data.message || 'Error desconocido'}`);
            } else if (err.request) {
                setError("No se pudo conectar con el servidor. Verifica tu conexión o la URL de la API.");
            } else {
                setError(`Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Adicionar Nuevo Producto</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre del Producto */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Producto:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                {/* Precio */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows="3"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    ></textarea>
                </div>

                {/* Sección de URLs de Imágenes Dinámicas */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URLs de Imágenes:</label>
                    {imageUrls.map((url, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="url" // Tipo 'url' para validación básica del navegador
                                value={url}
                                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                placeholder={`URL de Imagen ${index + 1}`}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {/* Mostrar botón de eliminar si hay más de un campo */}
                            {imageUrls.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeImageUrlInput(index)}
                                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    {/* Icono de X */}
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            )}
                        </div>
                    ))}
                    {/* Botón para agregar más campos de URL */}
                    <button
                        type="button"
                        onClick={addImageUrlInput}
                        className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Agregar otra URL
                    </button>
                </div>

                {/* ID de Categoría */}
                <div>
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">ID de Categoría:</label>
                    <input
                        type="number"
                        id="category_id"
                        name="category_id"
                        value={product.category_id}
                        onChange={handleChange}
                        required
                        min="1"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                {/* Botón de Enviar */}
                <button
                    type="submit"
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        }`}
                    disabled={loading}
                >
                    {loading ? 'Agregando Producto...' : 'Agregar Producto'}
                </button>
            </form>

            {/* Mensajes de feedback */}
            {message && (
                <div className="mt-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-300 text-center">
                    {message}
                </div>
            )}
            {error && (
                <div className="mt-4 p-3 rounded-md bg-red-100 text-red-700 border border-red-300 text-center">
                    {error}
                </div>
            )}
        </div>
    );
}