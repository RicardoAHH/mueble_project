import ProductCard from "./ProductCard"
import { Link } from "react-router"

export default function ProductGrid({ products, categories, selectedCategory }) {
  const selectedCategoryName = categories.find((cat) => cat.id === selectedCategory)?.name

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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products[selectedCategory]?.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link to='/products' className="flex items-center justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 mt-5">
          Ver Catálogo completo
        </button>
      </Link>
    </div>
  )
}
