// products.jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import CategoryBar from '../../Components/Products/CategoryBar';
import ProductGridComplete from '../../Components/Products/ProductGridComplete';

export default function Products() {
    const [allProductsData, setAllProductsData] = useState([]);
    const [dynamicCategories, setDynamicCategories] = useState([]);
    // Asegúrate de que el valor inicial sea 1 (o el ID de tu categoría por defecto)
    const [selectedCategory, setSelectedCategory] = useState(1); // <-- Aquí debe estar '1'

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error("No se encontró un token de autenticación. Por favor, inicia sesión.");
                }
                const headers = {
                    'Authorization': `${token}`
                };

                const response = await axios.get('http://localhost:3000/api/v1/products', { headers });

                // Asegúrate de guardar TODOS los productos aquí
                setAllProductsData(response.data);

                const uniqueCategoryIds = [...new Set(response.data.map(product => product.category_id))];

                const derivedCategories = [
                    { id: null, name: "Todos los Productos", icon: "🏠" },
                    ...uniqueCategoryIds.map(id => ({
                        id: id,
                        name: `Categoría ${id}`,
                        icon: "✨"
                    }))
                ];
                setDynamicCategories(derivedCategories);

            } catch (err) {
                console.error("Error al cargar los productos:", err);
                if (err.message === "No se encontró un token de autenticación. Por favor, inicia sesión.") {
                    setError(err.message);
                } else if (err.response && err.response.status === 401) {
                    setError("Acceso no autorizado. Tu sesión puede haber expirado. Por favor, vuelve a iniciar sesión.");
                } else if (err.response && err.response.data && err.response.data.message) {
                    setError(`Error del servidor: ${err.response.data.message}`);
                } else {
                    setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // El array de dependencias vacío asegura que se ejecute solo una vez al montar

    // Esta es la parte CRÍTICA para el filtrado
    const filteredProducts = useMemo(() => {
        if (!allProductsData) return [];

        // Si selectedCategory es null, retornamos todos los productos.
        // Si no es null, filtramos por category_id.
        if (selectedCategory === null) {
            return allProductsData;
        }
        return allProductsData.filter(product => product.category_id === selectedCategory);
    }, [allProductsData, selectedCategory]); // Se recalcula cuando allProductsData o selectedCategory cambian

    // ... (resto del código de loading, error y JSX)

    return (
        <>
            <div className='flex flex-col justify-center items-center bg-[#F8F5EE]'>
                <div className='w-[80%]'>
                    <CategoryBar
                        categories={dynamicCategories}
                        selectedCategory={selectedCategory} // Se pasa el 1 (o el que sea por defecto)
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>

                <div className='w-[80%] mt-4'>
                    <ProductGridComplete
                        products={filteredProducts} // <--- ¡Asegúrate de pasar 'filteredProducts' aquí!
                        categories={dynamicCategories}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </>
    );
}