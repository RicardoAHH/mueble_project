// src/Pages/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// Importa las funciones de tu API
import { login, register } from '../../libs/axios/auth'; // <--- ¡Importamos aquí!


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // true para login, false para registro
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ya no necesitas la instancia de axios aquí, las funciones importadas la usan
  // const api = axios.create({ ... });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      // Usamos la función 'login' importada
      const { data, status } = await login({
        email: formData.email,
        password: formData.password
      });

      // Asumiendo que tu backend devuelve un token JWT y un mensaje
      const { token, message: successMessage } = data; // 'data' viene de la respuesta
      localStorage.setItem('authToken', token);
      setMessage(successMessage || '¡Inicio de sesión exitoso!');

      navigate('/');
      window.location.reload();

    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      // El error ya fue re-lanzado por la función 'login', así que lo manejamos aquí
      if (error.response) {
        setMessage(error.response.data.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      } else if (error.request) {
        setMessage('No se pudo conectar con el servidor. Intenta de nuevo.');
      } else {
        setMessage('Error desconocido al iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      // Usamos la función 'register' importada
      const { data, status } = await register({
        name: formData.name,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });

      setMessage(data.message || '¡Registro exitoso! Ya puedes iniciar sesión.'); // 'data' viene de la respuesta
      setIsLogin(true); // Cambia a la vista de login después del registro
      setFormData({ ...formData, password: '', name: '', lastName: '', phone: '' }); // Limpia los campos

    } catch (error) {
      console.error('Error durante el registro:', error);
      // El error ya fue re-lanzado por la función 'register', así que lo manejamos aquí
      if (error.response) {
        setMessage(error.response.data.message || 'Error al registrar. Intenta con otro correo o revisa los datos.');
      } else if (error.request) {
        setMessage('No se pudo conectar con el servidor. Intenta de nuevo.');
      } else {
        setMessage('Error desconocido al registrar.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>

        {message && (
          <div className={`p-3 mb-4 rounded-md text-center ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
            {message}
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
          {/* Campos de Nombre, Apellido y Teléfono: SOLO VISIBLES EN MODO REGISTRO */}
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
                  required
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
                  required
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

          {/* Campos de Email y Contraseña: VISIBLES EN AMBOS MODOS */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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