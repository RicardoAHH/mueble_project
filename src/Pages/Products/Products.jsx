import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Importaciones de Firebase
import { db } from '../../../firebase'; // Asegúrate de que la ruta a tu configuración de Firebase sea correcta
import CategoryBar from '../../Components/Products/CategoryBar';
import ProductGridComplete from '../../Components/Products/ProductGridComplete';

export default function Products() {
    const [allProductsData, setAllProductsData] = useState([]);
    const [dynamicCategories, setDynamicCategories] = useState([]);
    // Usamos `null` como valor inicial para "Todos los Productos"
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                // --- NUEVA LÓGICA CON FIREBASE ---
                // 1. Obtener todos los productos de la colección 'products'
                const productsCollection = collection(db, 'products');
                const productsSnapshot = await getDocs(productsCollection);

                const productList = productsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    // Aseguramos que category_id sea un número para el filtrado
                    return { ...data, id: doc.id, category_id: Number(data.category_id) };
                });

                // 2. Obtener las categorías de la colección 'categories'
                const categoriesCollection = collection(db, 'categories');
                const categoriesSnapshot = await getDocs(categoriesCollection);

                const categoryMap = {};
                categoriesSnapshot.docs.forEach(doc => {
                    categoryMap[doc.id] = doc.data().name;
                });

                const categoryList = categoriesSnapshot.docs.map(doc => ({
                    id: Number(doc.id), // Aseguramos que sea un número
                    name: doc.data().name,
                    icon: doc.data().icon,
                }));
                // --- FIN DE LA NUEVA LÓGICA CON FIREBASE ---


                // Asegúrate de guardar TODOS los productos aquí
                setAllProductsData(productList);

                // Las categorías se obtienen ahora directamente de Firestore
                setDynamicCategories([
                    { id: null, name: "Todos los Productos", icon: "🏠" },
                    ...categoryList
                ]);

            } catch (err) {
                console.error("Error al cargar los productos:", err);
                setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
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
        if (selectedCategory === null) {
            return allProductsData;
        }
        // Si no es null, filtramos por category_id.
        return allProductsData.filter(product => product.category_id === selectedCategory);
    }, [allProductsData, selectedCategory]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#F8F5EE] pt-20">
                <p>Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-100 pt-20">
                <p className="text-red-700">{error}</p>
            </div>
        );
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center bg-[#F8F5EE]'>
                <div className='w-[80%] pt-20'>
                    <CategoryBar
                        categories={dynamicCategories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>

                <div className='w-[80%] mt-4'>
                    <ProductGridComplete
                        products={filteredProducts}
                        categories={dynamicCategories}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </>
    );
}
