import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../../firebase"; // La ruta que ya corregiste

function LoginAdmin() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        // Obtener el email y la contraseña del formulario
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            // Lógica de autenticación con Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("¡Login exitoso!", user);

            // Redirigir al dashboard de administración
            // En este caso, no hay 'role_id' en Firebase Auth por defecto.
            // Si necesitas gestionar roles, necesitarías usar Firestore.
            // Por ahora, simplemente redirigimos si el login es exitoso.
            navigate('/26062025/admin');

        } catch (error) {
            console.error("Error al iniciar sesión con Firebase:", error);

            // Manejo de errores específicos de Firebase
            switch (error.code) {
                case 'auth/user-not-found':
                    setMessage('No se encontró un usuario con este correo electrónico.');
                    break;
                case 'auth/wrong-password':
                    setMessage('Contraseña incorrecta. Intenta de nuevo.');
                    break;
                case 'auth/invalid-email':
                    setMessage('El formato del correo electrónico no es válido.');
                    break;
                case 'auth/network-request-failed':
                    setMessage('Error de red. Intenta de nuevo.');
                    break;
                default:
                    setMessage('Error al iniciar sesión. Verifica tus credenciales.');
                    break;
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-md mx-auto mt-30 p-8 border border-gray-300 rounded-lg shadow-xl bg-white">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión</h2>
            {message && (
                <div className={`p-3 mb-4 rounded-md text-center ${message.includes('Error') || message.includes('incorrecta') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
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