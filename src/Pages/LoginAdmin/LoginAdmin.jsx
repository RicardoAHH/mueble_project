
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../../libs/axios/auth';

function LoginAdmin() {
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target);
            const body = Object.fromEntries(formData.entries())
            const { data, status } = await login(body)
            console.table({ data, status })

            if (status === 200) {
                localStorage.setItem('authToken', data.token);
                navigate('/26062025/admin')
            }

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-30 p-8 border border-gray-300 rounded-lg shadow-xl bg-white">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión</h2>
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
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}

export default LoginAdmin;