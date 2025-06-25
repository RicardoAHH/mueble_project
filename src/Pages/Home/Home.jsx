"use client"

import { useState } from "react"
import Carousel from "../../Components/Home/Carousel"
import CategorySidebar from "../../Components/Home/CategorySidebar"
import ProductGrid from "../../Components/Home/ProductGrid"
import Footer from "../../Components/Home/Footer"
import { categories, products } from "../../data/products"

function App() {
    const [selectedCategory, setSelectedCategory] = useState("Categoria1")

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
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>

                    {/* Productos (derecha) */}
                    <div className="lg:col-span-3">
                        <ProductGrid products={products} categories={categories} selectedCategory={selectedCategory} />
                    </div>
                </div>
            </section>


        </div>
    )
}

export default App
