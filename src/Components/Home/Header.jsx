"use client"
import { Link } from "react-router"; // Asegúrate de que estás usando react-router-dom
import { useState, useEffect, useRef } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Estado para controlar si el usuario está autenticado (basado en localStorage)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Nuevo estado para controlar la visibilidad del menú desplegable del usuario
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const menuRef = useRef(null); // Ref para el menú principal de navegación
  const menuButtonRef = useRef(null); // Ref para el botón que abre el menú principal

  const userMenuRef = useRef(null); // Ref para el menú desplegable del usuario
  const userMenuButtonRef = useRef(null); // Ref para el botón que abre el menú del usuario

  // Función para cerrar el menú principal
  const closeMainMenu = () => {
    setIsMenuOpen(false);
  };

  // Función para cerrar el menú desplegable del usuario
  const closeUserDropdown = () => {
    setIsUserDropdownOpen(false);
  };

  // Efecto para verificar el token de autenticación al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  // Efecto para manejar clics fuera de los menús
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Lógica para cerrar el menú principal
      if (menuRef.current && !menuRef.current.contains(event.target) &&
        menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
        closeMainMenu();
      }

      // Lógica para cerrar el menú de usuario
      // Solo si el menú de usuario está abierto y el clic fue fuera de él o de su botón
      if (isUserDropdownOpen && userMenuRef.current && !userMenuRef.current.contains(event.target) &&
        userMenuButtonRef.current && !userMenuButtonRef.current.contains(event.target)) {
        closeUserDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isUserDropdownOpen]); // Agrega isUserDropdownOpen a las dependencias

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Elimina el token del localStorage
    setIsAuthenticated(false); // Actualiza el estado de autenticación
    closeUserDropdown(); // Cierra el menú desplegable del usuario al cerrar sesión
    // Opcional: Redirigir al usuario a la página de inicio de sesión o a la página principal
    // navigate('/login'); // Si usas `useNavigate`
    window.location.reload(); // Recarga la página para asegurar que el Header se actualice
  };

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
                  <button className="hover:border-1 w-full font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                    Inicio
                  </button>
                </Link>
                <Link to="/about" className="flex items-center justify-center">
                  <button className="hover:border-1 w-full font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                    Nosotros
                  </button>
                </Link>
                <Link to='/contacts' className="flex items-center justify-center">
                  <button className="w-full hover:border-1 font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                    Contacto
                  </button>
                </Link>
                <Link to="/products" className="flex items-center justify-center">
                  <button className="w-full hover:border-1 font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                    Catálogo
                  </button>
                </Link>
                <Link to='/quotes' className="flex items-center justify-center">
                  <button className="w-full hover:border-1 font-semibold p-2 border-blue-800 rounded-md hover:text-white hover:bg-[#431f0a]">
                    Cotizaciones
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Login y Carrito */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // Menú desplegable para usuario logeado
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} // Ahora se togglea el nuevo estado
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
                  <span className="ml-1 hidden sm:block">Mi Cuenta</span>
                </button>
                {/* El menú del usuario se muestra si isUserDropdownOpen es true */}
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
                      onClick={handleLogout}
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

            <button className="flex items-center text-gray-700 hover:text-blue-600 relative mx-5">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v4a2 2 0 002 2h4a2 2 0 002-2v-1"
                />
              </svg>
              <span className="ml-1 hidden sm:block">Carrito</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
