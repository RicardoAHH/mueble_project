import React, { useState } from 'react';
import { collection, serverTimestamp, setDoc, doc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../firebase';

export default function AddProductForm() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category_id: '',
    });
    const [imageUrls, setImageUrls] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleImageUrlChange = (index, value) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const addImageUrlInput = () => {
        setImageUrls([...imageUrls, '']);
    };

    const removeImageUrlInput = (index) => {
        const newImageUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newImageUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError(null);

        try {
            // --- Lógica para obtener el siguiente ID numérico ---
            const productsCollectionRef = collection(db, 'products');

            // 1. Consulta para obtener el último documento por el campo 'productId'
            //    Necesitarás crear un índice en Firebase para esta consulta.
            const q = query(productsCollectionRef, orderBy('productId', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);

            let nextProductId = 1;
            if (!querySnapshot.empty) {
                const lastProduct = querySnapshot.docs[0].data();
                if (lastProduct.productId) {
                    nextProductId = lastProduct.productId + 1;
                }
            }
            // ----------------------------------------------------

            const validImageUrls = imageUrls.filter(url => url.trim() !== '');

            const dataToSend = {
                productId: nextProductId, // ¡Nuevo campo numérico para el ID!
                name: product.name,
                price: parseFloat(product.price),
                description: product.description,
                images: validImageUrls,
                category_id: product.category_id,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            };

            // 2. Usamos setDoc para crear un documento con un ID de documento único y aleatorio
            //    pero con un campo 'productId' secuencial.
            const newDocRef = doc(productsCollectionRef);
            await setDoc(newDocRef, dataToSend);

            setMessage(`Producto "${product.name}" agregado con éxito con ID numérico: ${nextProductId}`);
            // ... (el resto de tu código de limpieza del formulario se mantiene igual)

        } catch (err) {
            console.error("Error al agregar el producto:", err);
            setError(`Error al agregar el producto: ${err.message}`);
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
                                type="url"
                                value={url}
                                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                placeholder={`URL de Imagen ${index + 1}`}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {imageUrls.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeImageUrlInput(index)}
                                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            )}
                        </div>
                    ))}
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