import React, { useState } from 'react';
import { useNavigate } from 'react-router'; // Cambiado a react-router-dom
import { login } from '../../libs/axios/auth';

function LoginAdmin() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(''); // Para mensajes de error/éxito
    const [loading, setLoading] = useState(false); // Para el estado de carga

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(''); // Limpiar mensajes anteriores
        setLoading(true); // Activar estado de carga

        try {
            const formData = new FormData(e.target);
            const body = Object.fromEntries(formData.entries());
            const { data, status } = await login(body);
            console.table({ data, status });

            if (status === 200) {
                localStorage.setItem('authToken', data.token);
                // Almacenamos el role_id del usuario en localStorage
                if (data.user && data.user.role_id) { // Asumiendo que 'data' tiene un objeto 'user'
                    localStorage.setItem('userRole', data.user.role_id.toString()); // Guarda como string
                } else if (data.role_id) { // En caso de que 'role_id' esté directamente en 'data'
                    localStorage.setItem('userRole', data.role_id.toString());
                }

                navigate('/26062025/admin');
            }

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            if (error.response) {
                setMessage(error.response.data.message || 'Error al iniciar sesión. Verifica tus credenciales.');
            } else if (error.request) {
                setMessage('No se pudo conectar con el servidor. Intenta de nuevo.');
            } else {
                setMessage('Error desconocido al iniciar sesión.');
            }
        } finally {
            setLoading(false); // Desactivar estado de carga
        }
    }

    return (
        <div className="max-w-md mx-auto mt-30 p-8 border border-gray-300 rounded-lg shadow-xl bg-white">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión</h2>
            {message && (
                <div className={`p-3 mb-4 rounded-md text-center ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleLogin} className="flex flex-col space-y-5">
                <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                        Email:
                    </label>
                    <input
                        placeholder='correo@ejemplo.com'
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                        Contraseña:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        placeholder='••••••••'
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    );
}

export default LoginAdmin;
