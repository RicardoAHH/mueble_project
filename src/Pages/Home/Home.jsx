import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

import Carousel from "../../Components/Home/Carousel";
import CategorySidebar from "../../Components/Home/CategorySidebar";
import ProductGrid from "../../Components/Home/ProductGrid";

function App() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Obtener las categorías de Firestore
                const categoriesCollection = collection(db, 'categories');
                const categoriesSnapshot = await getDocs(categoriesCollection);
                const categoryList = categoriesSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: Number(data.id), // Aseguramos que el ID de la categoría sea un NÚMERO
                        ...data,
                    };
                });

                const categoryMap = categoryList.reduce((acc, cat) => {
                    acc[cat.id] = cat.name;
                    return acc;
                }, {});

                // Obtener los productos de Firestore
                const productsCollection = collection(db, 'products');
                const productsSnapshot = await getDocs(productsCollection);
                const productList = productsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        category_id: Number(data.category_id), // Aseguramos que el ID del producto sea un NÚMERO
                        category_name: categoryMap[data.category_id] || 'Sin categoría',
                    };
                });

                setProductsData(productList);
                // <-- CAMBIO CLAVE AQUÍ: Usamos un ID de cadena único para "Todas las categorías"
                setCategories([{ id: 'all', name: "Todas las categorías", icon: "🏠" }, ...categoryList]);

            } catch (err) {
                console.error("Error al cargar los datos:", err);
                setError("No se pudieron cargar los datos. Inténtalo de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = useMemo(() => {
        if (!productsData) return [];
        // <-- CAMBIO CLAVE AQUÍ: El filtro ahora también maneja el ID 'all'
        if (selectedCategory === null || selectedCategory === 'all') {
            return productsData;
        }
        // La comparación es segura, ya que ambos valores son números
        return productsData.filter(product => product.category_id === Number(selectedCategory));
    }, [productsData, selectedCategory]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
                <p className="text-gray-700 text-lg">Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
                <p className="text-red-600 text-lg text-center p-4 rounded-md bg-red-100 border border-red-300 mx-auto max-w-sm">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="pt-15 min-h-screen bg-[#F8F5EE]">
            <Carousel />
            <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <CategorySidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <ProductGrid products={filteredProducts} categories={categories} selectedCategory={selectedCategory} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default App;