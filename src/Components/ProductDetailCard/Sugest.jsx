// src/Components/ProductDetailCard/Sugest.jsx
import { useEffect, useState } from 'react';
import axios from 'axios'; // Usamos axios directamente para simplificar. Si tienes una instancia global sin interceptores problemáticos, úsala.
import { Link } from 'react-router'; // Para navegar a los productos sugeridos

const Sugest = ({ currentProductCategoryId, currentProductId }) => {
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuggestedProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                // Obtener TODOS los productos (asumiendo que /api/v1/products devuelve todos y está desprotegida)
                const response = await axios.get('http://localhost:3000/api/v1/products');
                const allProducts = response.data;

                // Filtrar por categoría y excluir el producto actual
                const filtered = allProducts.filter(
                    (product) =>
                        product.category_id === currentProductCategoryId &&
                        product.id !== currentProductId
                );

                // Mezclar los productos filtrados y tomar los primeros 4
                const shuffled = filtered.sort(() => 0.5 - Math.random());
                const suggestions = shuffled.slice(0, 4); // Tomar solo los primeros 4

                setSuggestedProducts(suggestions);
            } catch (err) {
                console.error("Error fetching suggested products:", err);
                setError("No se pudieron cargar sugerencias de productos.");
            } finally {
                setLoading(false);
            }
        };

        // Solo ejecutar si tenemos una category_id válida
        if (currentProductCategoryId) {
            fetchSuggestedProducts();
        } else {
            setLoading(false); // Si no hay categoría, no hay sugerencias
        }
    }, [currentProductCategoryId, currentProductId]); // Re-ejecutar si cambian

    if (loading) {
        return (
            <div className="p-8 text-center bg-white rounded-lg shadow-md m-6">
                <p className="text-gray-600">Cargando sugerencias...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center bg-red-100 border border-red-300 text-red-700 rounded-lg shadow-md m-6">
                <p>{error}</p>
            </div>
        );
    }

    if (suggestedProducts.length === 0) {
        return (
            <div className="p-8 text-center bg-white rounded-lg shadow-md m-6">
                <p className="text-gray-600">No hay más productos relacionados en esta categoría.</p>
            </div>
        );
    }

    // Formateador de moneda (puedes reutilizar el de tu ProductTable si es un util)
    const currencyFormatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
    });

    return (
        <div className="p-8 bg-white rounded-lg shadow-md m-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Muebles que pueden interesarte</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {suggestedProducts.map((product) => (
                    <Link to={`/products/${product.id}`} key={product.id} className="block group">
                        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                            <div className="flex-shrink-0">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                    {product.description}
                                </p>
                                <div className="mt-auto"> {/* Empuja el precio hacia abajo */}
                                    <p className="text-xl font-bold text-green-700">
                                        {currencyFormatter.format(parseFloat(product.price))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sugest;