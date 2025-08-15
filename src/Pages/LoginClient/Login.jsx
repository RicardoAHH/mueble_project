import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Inicializamos Firebase fuera del componente, pero solo si no existe ya
let app;
if (!getApps().length) {
  const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
  app = initializeApp(firebaseConfig);
}
const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const navigate = useNavigate();

  // Usamos onAuthStateChanged para escuchar el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // El usuario está autenticado o no. Esto es mucho más seguro que intentar un signIn.
      setAuthReady(true);
    });

    // Limpiamos el observador cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Inicio de sesión exitoso!');
      console.log('Objeto de usuario de Firebase:', userCredential.user);

      // Aquí puedes ver los datos del usuario recién autenticado
      const user = auth.currentUser;
      if (user) {
        console.log('Datos del usuario actual (currentUser):', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName, // El nombre y apellido que se guardó al registrarse
          emailVerified: user.emailVerified
        });
      }

      navigate('/');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      let errorMessage = "Error al iniciar sesión. Por favor, verifica tus credenciales.";
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = "Credenciales incorrectas. Verifica tu email y contraseña.";
          break;
        case 'auth/user-not-found':
          errorMessage = "No se encontró un usuario con ese email.";
          break;
        case 'auth/wrong-password':
          errorMessage = "La contraseña es incorrecta.";
          break;
        case 'auth/invalid-email':
          errorMessage = "El formato del email no es válido.";
          break;
        default:
          errorMessage = "Ha ocurrido un error inesperado. Inténtalo de nuevo.";
          break;
      }
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${formData.name} ${formData.lastName}`
      });

      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const userId = user.uid; // Usamos el ID del usuario recién creado

      // Datos que se guardarán en Firestore
      const userDataToSave = {
        uid: user.uid,
        name: formData.name,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        role: 'user',
        createdAt: new Date()
      };

      console.log('Datos del usuario que se enviarán a Firestore:', userDataToSave);

      await setDoc(doc(db, `/artifacts/${appId}/users/${userId}/profile`, user.uid), userDataToSave);

      setMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
      setIsLogin(true);
      setFormData({ ...formData, password: '', name: '', lastName: '', phone: '' });
    } catch (error) {
      console.error('Error durante el registro:', error);
      let errorMessage = "Error al registrar. Por favor, revisa tus datos.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "El email proporcionado ya está en uso por otra cuenta.";
          break;
        case 'auth/invalid-email':
          errorMessage = "El formato del email no es válido.";
          break;
        case 'auth/weak-password':
          errorMessage = "La contraseña debe tener al menos 6 caracteres.";
          break;
        default:
          errorMessage = "Ha ocurrido un error inesperado. Inténtalo de nuevo.";
          break;
      }
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!authReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Cargando autenticación...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>

        {message && (
          <div className={`p-3 mb-4 rounded-md text-center ${message.includes('Error') || message.includes('incorrecta') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellido:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required={!isLogin}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono (opcional):</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (isLogin ? 'Iniciando sesión...' : 'Registrando...') : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
              setFormData({
                email: '',
                password: '',
                name: '',
                lastName: '',
                phone: ''
              });
            }}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate aquí.' : '¿Ya tienes cuenta? Inicia sesión aquí.'}
          </button>
        </div>
      </div>
    </div>
  );
}
