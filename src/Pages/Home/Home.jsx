import { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import Carousel from "../../Components/Home/Carousel";
import CategorySidebar from "../../Components/Home/CategorySidebar";
import ProductGrid from "../../Components/Home/ProductGrid";

function App() {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [dynamicCategories, setDynamicCategories] = useState([]);
    const [productsData, setProductsData] = useState([]);
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
                setProductsData(response.data);
                const uniqueCategoryIds = [...new Set(response.data.map(product => product.category_id))];
                const derivedCategories = [

                    ...uniqueCategoryIds.map(id => ({
                        id: id,
                        name: `Categoría ${id}` // Puedes mejorar este nombre si tienes un mapeo de IDs a nombres
                    }))
                ];
                setDynamicCategories(derivedCategories);
                // Si aún no hay una categoría seleccionada, establece "Todos los Productos" como predeterminada
                if (selectedCategory === null) {
                    setSelectedCategory(null);
                }
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
    }, []);

    const filteredProducts = useMemo(() => {
        if (!productsData) return [];

        if (selectedCategory === null) { // Si selectedCategory es null, muestra todos
            return productsData;
        }
        // Filtra los productos por category_id
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

    console.log(productsData)


    return (
        <div className="min-h-screen bg-[#F8F5EE]">


            {/* Carrusel */}
            <Carousel />

            {/* Sección principal con categorías y productos */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
