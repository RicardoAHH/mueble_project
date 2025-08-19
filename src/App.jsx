import React, { useState, useEffect, createContext, useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Componentes de tu aplicación
// Se asume que las rutas de los archivos son relativas al archivo App.jsx.
// NOTA: Estas importaciones pueden fallar si la estructura de tu proyecto no las contiene
// en estas rutas exactas.
import Home from './Pages/Home/Home';
import Header from './Components/Home/Header';
import Products from './Pages/Products/Products';
import ScrollToTop from './Hooks/ScrollToTop';
import ProductDetailCard from './Pages/ProductDetailCard/ProductDetailCard';
import Footer from './Components/Home/Footer';
import QuoteForm from './Pages/Cotizaciones/QuoteForm';
import About from './Pages/About/About';
import LoginAdmin from './Pages/LoginAdmin/LoginAdmin';
import ControlAdmin from './Pages/ControlAdmin/ControlAdmin';
import PrivateRoute from './Components/LoginAdmin/PrivateRoute';
import WPbutton from './Components/Home/WPbutton';
import Contacts from './Pages/Contact/Contacts';
import Login from './Pages/LoginClient/Login';
import UserProfile from './Pages/UserProfile/UserProfile';
import { CartProvider } from '../src/Components/General/CartContext';
import CartPage from './Pages/CartPage/CartPage';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage';

// Inicialización de Firebase
let firebaseApp;
if (!getApps().length) {
  const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Creación del contexto de autenticación
export const AuthContext = createContext({
  currentUser: null,
  userProfile: null,
  loading: true,
  handleLogout: () => { },
});

// Hook personalizado para usar el AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente principal de la aplicación con el proveedor de autenticación
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isInitialCheckComplete = false;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
          const userProfileRef = doc(db, `/artifacts/${appId}/users/${user.uid}/profile`, user.uid);
          const userProfileSnap = await getDoc(userProfileRef);

          if (userProfileSnap.exists()) {
            setUserProfile(userProfileSnap.data());
          } else {
            setUserProfile(null);
            console.warn("Perfil de usuario no encontrado en Firestore.");
          }
        } catch (error) {
          console.error("Error al obtener el perfil de usuario:", error);
          setUserProfile(null);
        }
      } else {
        if (!isInitialCheckComplete) {
          try {
            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
            if (initialAuthToken) {
              await signInWithCustomToken(auth, initialAuthToken);
            }
          } catch (error) {
            console.error("Error al iniciar sesión:", error);
          }
        } else {
          setCurrentUser(null);
          setUserProfile(null);
        }
      }
      setLoading(false);
      isInitialCheckComplete = true;
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente.");
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F5EE]">
        <p className="text-gray-700 text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <CartProvider>
      <AuthContext.Provider value={{ currentUser, userProfile, loading, handleLogout }}>
        <ScrollToTop />
        {/* Header */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetailCard />} />
          <Route path="/quotes" element={<QuoteForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/26062025" element={<LoginAdmin />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/26062025/admin"
            element={
              <PrivateRoute>
                <ControlAdmin />
              </PrivateRoute>
            }
          />
        </Routes>
        <div className="fixed right-10 bottom-10">
          <WPbutton />
        </div>
        {/* Footer */}
        <Footer />
      </AuthContext.Provider>
    </CartProvider>
  );
}

export default App;