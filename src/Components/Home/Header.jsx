import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from '../../App'; // La importación ahora es un nivel superior
import { useCart } from '../../Components/General/CartContext'; // Importa el hook para el carrito

export default function Header() {
  const { currentUser, userProfile, handleLogout } = useAuth();
  const { cartItems, cartItemCount, cartTotalPrice, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Refs para los menús y el carrito
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const userMenuRef = useRef(null);
  const userMenuButtonRef = useRef(null);
  const cartRef = useRef(null);
  const cartButtonRef = useRef(null);

  const closeMainMenu = () => {
    setIsMenuOpen(false);
  };

  const closeUserDropdown = () => {
    setIsUserDropdownOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Efecto para manejar clics fuera de los menús y el carrito
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Lógica para cerrar el menú principal
      if (menuRef.current && !menuRef.current.contains(event.target) &&
        menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
        closeMainMenu();
      }

      // Lógica para cerrar el menú de usuario
      if (isUserDropdownOpen && userMenuRef.current && !userMenuRef.current.contains(event.target) &&
        userMenuButtonRef.current && !userMenuButtonRef.current.contains(event.target)) {
        closeUserDropdown();
      }

      // Lógica para cerrar el carrito flotante
      if (isCartOpen && cartRef.current && !cartRef.current.contains(event.target) &&
        cartButtonRef.current && !cartButtonRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isUserDropdownOpen, isCartOpen]);

  return (
    <header className="bg-[#aca5a2] shadow-md fixed w-full top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to='/'>
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-[#431f0a] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">MuebleHogar</span>
              </div>
            </div>
          </Link>

          {/* Barra de búsqueda */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar muebles..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Menú desplegable principal */}
          <div className="md:block relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              ref={menuButtonRef}
              className="flex items-center gap-5 text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-md font-bold "
            >Menú
              <img src="https://placehold.co/20x20/000000/FFFFFF?text=Menu" alt="menu" className="w-[20px]" />
            </button>

            {isMenuOpen && (
              <div ref={menuRef} className="absolute right-0 mt-3 w-40 bg-white rounded-md shadow-lg z-50 flex flex-col">
                <Link to="/" className="flex items-center justify-center">
                  <button onClick={closeMainMenu} className="hover:border-1 w-full font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                    Inicio
                  </button>
                </Link>
                <Link to="/about" className="flex items-center justify-center">
                  <button onClick={closeMainMenu} className="hover:border-1 w-full font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                    Nosotros
                  </button>
                </Link>
                <Link to='/contacts' className="flex items-center justify-center">
                  <button onClick={closeMainMenu} className="w-full hover:border-1 font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                    Contacto
                  </button>
                </Link>
                <Link to="/products" className="flex items-center justify-center">
                  <button onClick={closeMainMenu} className="w-full hover:border-1 font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                    Catálogo
                  </button>
                </Link>
                <Link to='/quotes' className="flex items-center justify-center">
                  <button onClick={closeMainMenu} className="w-full hover:border-1 font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                    Cotizaciones
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Lógica para mostrar "Mi cuenta" o "Iniciar sesión" */}
          <div className="flex items-center space-x-4">
            {currentUser && userProfile ? (
              // Menú desplegable para usuario logeado
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  ref={userMenuButtonRef}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="ml-1 hidden sm:block font-bold">Hola, {userProfile.name}</span>
                </button>
                {isUserDropdownOpen && (
                  <div ref={userMenuRef} className="absolute right-0 mt-3 w-40 bg-white rounded-md shadow-lg z-50 flex flex-col">
                    <Link to="/profile" className="flex items-center justify-center">
                      <button onClick={closeUserDropdown} className="hover:border-1 w-full font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                        Mi cuenta
                      </button>
                    </Link>
                    <Link to="/sales" className="flex items-center justify-center">
                      <button onClick={closeUserDropdown} className="hover:border-1 w-full font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                        Mis compras
                      </button>
                    </Link>
                    <button
                      onClick={() => { handleLogout(); closeUserDropdown(); }}
                      className="w-full hover:border-1 font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]"
                    >
                      Salir
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Botón "Iniciar sesión" si no está logeado
              <Link to='/login'>
                <button
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="ml-1 hidden sm:block">Iniciar sesión</span>
                </button>
              </Link>
            )}

            {/* Botón para abrir el carrito flotante */}
            <button
              onClick={toggleCart}
              ref={cartButtonRef}
              className="flex items-center text-gray-700 hover:text-blue-600 relative mx-5"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v4a2 2 0 002 2h4a2 2 0 002-2v-1"
                />
              </svg>
              <span className="ml-1 hidden sm:block">Carrito</span>
              {/* Contador de artículos del carrito */}
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Componente flotante del carrito */}
      {isCartOpen && (
        <div
          ref={cartRef}
          className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-xl z-50 transform transition-transform ease-in-out duration-300"
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold">Tu carrito</h2>
              <button onClick={toggleCart} className="text-gray-500 hover:text-gray-800">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Tu carrito está vacío.</p>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Botones para modificar la cantidad */}
                        <button onClick={() => decrementQuantity(item.id)} className="text-gray-500 hover:text-gray-800">-</button>
                        <p className="font-semibold">${item.price * item.quantity}.00</p>
                        <button onClick={() => incrementQuantity(item.id)} className="text-gray-500 hover:text-gray-800">+</button>
                        {/* Botón para eliminar */}
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-800">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center font-bold text-lg mb-4">
                <span>Total:</span>
                <span>${cartTotalPrice}.00</span>
              </div>
              <Link to="/cart">
                <button
                  onClick={toggleCart}
                  className="w-full bg-[#431f0a] text-white p-3 rounded-md font-bold hover:bg-[#2e1507] transition-colors"
                >
                  Ver Carrito y Pagar
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}