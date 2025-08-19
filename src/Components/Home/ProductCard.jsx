import { Link } from "react-router"
import { useCart } from '../../Components/General/CartContext'; // Importa el hook

export default function ProductCard({ product }) {
  // Obtiene la función addToCart del contexto
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="relative min-h-48 overflow-hidden">
        <Link to={`/products/${product.id}`} className="cursor:pointer">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-110"
          />
        </Link>
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between">
          {/* Asume que el precio viene en el objeto product */}
          <span className="text-2xl font-bold text-[#a40202]">${product.price}.00</span>
          {/* Conecta la función addToCart al evento onClick */}
          <button
            onClick={() => addToCart(product)}
            className="bg-[#431f0a] hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-1"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  )
}