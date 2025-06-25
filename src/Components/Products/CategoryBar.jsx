import { useState } from "react";

export default function CategoryBar({ categories, selectedCategory, setSelectedCategory }) {
    const [isMobileAccordionOpen, setIsMobileAccordionOpen] = useState(false);
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        if (isMobileAccordionOpen) {
            setIsMobileAccordionOpen(false);
        }

    };
    return (
        <>
            <div className="bg-white w-[70%] lg:w-full rounded-lg shadow-md p-1  lg:hidden">
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
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)} // Usa el nuevo handler
                                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                    }`}
                            >
                                <span className="mr-3 text-lg">{category.icon}</span>
                                <span className="font-medium">{category.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="bg-white w-full rounded-lg shadow-md pt-18 ">
                <div className=" flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 m-6">Categorías</h3>
                    <div className="space-y-0 flex flex-wrap justify-around">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)} // Usa el mismo handler para consistencia
                                className={` flex items-center px-6 xl:px-10 py-3 rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                    }`}
                            >
                                <span className="mr-3 text-lg">{category.icon}</span>
                                <span className="font-medium">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
