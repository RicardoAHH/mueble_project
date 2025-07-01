import { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import Carousel from "../../Components/Home/Carousel";
import CategorySidebar from "../../Components/Home/CategorySidebar";
import ProductGrid from "../../Components/Home/ProductGrid";

function App() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [dynamicCategories, setDynamicCategories] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get('http://localhost:3000/api/v1/products');

                setProductsData(response.data);
                const uniqueCategoryIds = [...new Set(response.data.map(product => product.category_id))];
                const derivedCategories = [

                    ...uniqueCategoryIds.map(id => ({
                        id: id,
                        name: `Categoría ${id}`
                    }))
                ];
                setDynamicCategories(derivedCategories);

                if (selectedCategory === null) {
                    setSelectedCategory(null);
                }
            } catch (err) {
                console.error("Error al cargar los productos:", err);
                if (err.response && err.response.data && err.response.data.message) {
                    setError(`Error del servidor: ${err.response.data.message}`);
                } else {
                    setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Dependencias: no necesitas `selectedCategory` si solo lo seteas a null

    const filteredProducts = useMemo(() => {
        if (!productsData) return [];
        if (selectedCategory === null) {
            return productsData;
        }
        return productsData.filter(product => product.category_id === selectedCategory);
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

    console.log(productsData);
    return (
        <div className="pt-15 min-h-screen bg-[#F8F5EE]">


            {/* Carrusel */}
            <Carousel />

            {/* Sección principal con categorías y productos */}
            <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Categorías (izquierda) */}
                    <div className="lg:col-span-1">
                        <CategorySidebar
                            categories={dynamicCategories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>

                    {/* Productos (derecha) */}
                    <div className="lg:col-span-3">
                        <ProductGrid products={filteredProducts} categories={dynamicCategories} selectedCategory={selectedCategory} />
                    </div>

                </div>
            </section>


        </div>
    )
}

export default App
