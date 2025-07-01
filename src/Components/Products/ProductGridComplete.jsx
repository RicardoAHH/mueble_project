import React from 'react';
import ProductCard from "../Home/ProductCard"; // Asegúrate de que la ruta sea correcta

export default function ProductGridComplete({ products, categories, selectedCategory }) {
  // Encuentra el nombre de la categoría seleccionada para mostrar en el título.
  // selectedCategory puede ser 'null' para 'Todos los Productos'.
  const selectedCategoryObject = categories.find((cat) => cat.id === selectedCategory);
  // Si no se encuentra (ej. selectedCategory es null), muestra "Todos los Productos"
  const selectedCategoryName = selectedCategoryObject ? selectedCategoryObject.name : "Categoria 1";

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 capitalize">{selectedCategoryName}</h2>
        <p className="text-gray-600 mt-2">Descubre nuestra selección de productos</p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="text-sm text-gray-600">Filtrar por:</span>
          </div>
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>Precio: Menor a Mayor</option>
            <option>Precio: Mayor a Menor</option>
            <option>Más Popular</option>
            <option>Más Reciente</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? ( // Verifica si hay productos antes de mapear
          products.map((product) => ( // <--- ¡AQUÍ ESTÁ LA CLAVE! Iteramos directamente sobre el array 'products'
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg py-10">
            No hay productos en esta categoría.
          </p>
        )}
      </div>

    </div>
  );
}