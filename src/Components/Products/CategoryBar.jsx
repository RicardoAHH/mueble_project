import React, { useState } from "react";

export default function CategoryBar({ categories, selectedCategory, setSelectedCategory }) {
    const [isMobileAccordionOpen, setIsMobileAccordionOpen] = useState(false);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        if (isMobileAccordionOpen) {
            setIsMobileAccordionOpen(false); // Cierra el acordeón móvil al seleccionar una categoría
        }
    };

    // Filtramos las categorías para asegurarnos de que solo pasamos las que tienen un ID (no 'null')
    // Esto es más bien una medida de seguridad, ya que el componente Products.jsx debería filtrar la opción 'Todos'
    // antes de pasarla si no quieres que sea seleccionable.
    const displayCategories = categories.filter(cat => cat.id !== null);

    return (
        <>
            {/* Contenedor visible solo en pantallas pequeñas (lg:hidden) */}
            <div className="bg-white w-[70%] lg:w-full rounded-lg shadow-md p-1 lg:hidden">
                {/* Encabezado del acordeón móvil: título y botón para abrir/cerrar */}
                <button
                    onClick={() => setIsMobileAccordionOpen(!isMobileAccordionOpen)}
                    className="w-full flex justify-between items-center px-4 py-1 text-left rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <h3 className="text-xl font-bold">Categorías</h3>
                    {/* Icono de flecha para indicar estado (abierto/cerrado) */}
                    <svg
                        className={`h-6 w-6 transform transition-transform duration-300 ${isMobileAccordionOpen ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>

                {/* Contenido del acordeón móvil: la lista de botones de categoría */}
                {isMobileAccordionOpen && (
                    <div className="mt-2 space-y-2">
                        {/* Mapea las categorías dinámicas, SIN la opción "Todos los Productos" */}
                        {displayCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                    }`}
                            >
                                {/* Asegúrate de que `category.icon` exista o proporciona un fallback */}
                                <span className="mr-3 text-lg">{category.icon || '📦'}</span>
                                <span className="font-medium">{category.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Contenedor visible solo en pantallas grandes (no hidden en lg) */}
            {/* Aquí asumimos que la barra principal está diseñada para escritorio */}
            <div className="bg-white w-full rounded-lg shadow-md py-4 hidden lg:block">
                <div className="flex flex-col">
                    <h3 className="text-xl text-center font-bold text-gray-900 mx-6 mb-4">Categorías</h3>
                    <div className="space-y-0 flex flex-wrap justify-around">
                        {/* Mapea las categorías dinámicas, SIN la opción "Todos los Productos" */}
                        {displayCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={`flex items-center px-6 xl:px-10 py-3 rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id
                                    ? "bg-[#4a0505] text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                    }`}
                            >
                                <span className="mr-3 text-lg">{category.icon || '📦'}</span>
                                <span className="font-medium">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}